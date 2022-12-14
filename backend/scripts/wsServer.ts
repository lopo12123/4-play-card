import { Server as HttpServer } from "http";
import { Server as WSServer, WebSocket, WebSocketServer } from "ws";
import { v4 as UUID } from "uuid";
import { colorfulStdout, FontColorEnums, formatDate } from "./misc";
import { MSG_ROOM, MSG_WS, MSG_WS_wsId, WSChannel } from "@mj/shared/wsEv";

/**
 * @description websocket 消息处理
 */
abstract class WSMsgController {
    public static solve(msg: Exclude<MSG_WS, MSG_WS_wsId>) {
        const { wsId, roomId, data } = msg.payload

        switch(msg.cmd) {
            case WSChannel.Chat:
                WSController.broadcast(roomId, { sourceId: wsId, data: data ?? '' })
                break
            case WSChannel.Start:
                // todo 开始
                break
            default:
                // never
                break
        }
    }
}

/**
 * @description websocket 连接控制
 */
abstract class WSController {
    /**
     * @description 连接池 wsId => [roomId, ws]
     */
    private static wsPool = new Map<string, [ string, WebSocket ]>()
    /**
     * @description 房间池 todo 需要再设计
     */
    private static roomPool = new Map<string, [ string, WebSocket ][]>()

    // region koaApi 调用
    /**
     * @description 获取当前连接数
     */
    public static wsCount() {
        return this.wsPool.size
    }

    /**
     * @description 获取当前房间数
     */
    public static roomCount() {
        return this.roomPool.size
    }

    /**
     * @description 获取全部 wsId 列表
     */
    public static wsList() {
        return [ ...this.wsPool.keys() ]
    }

    /**
     * @description 获取全部 roomId 列表
     */
    public static roomList() {
        return [ ...this.roomPool.keys() ]
    }

    /**
     * @description 获取房间信息 无参则获取全部
     */
    public static roomInfo(ids?: string[]): { roomId: string, wsList: string[], count: number }[] {
        if(!ids) {
            const roomInfo: { roomId: string, wsList: string[], count: number }[] = []
            this.roomPool.forEach((room, roomId) => {
                roomInfo.push({
                    roomId,
                    wsList: room.map(_ => _[0]),
                    count: room.length
                })
            })
            return roomInfo
        }
        else {
            return ids.map(roomId => {
                const _room = this.roomPool.get(roomId)
                return {
                    roomId,
                    wsList: _room?.map(_ => _[0]) ?? [],
                    count: _room?.length ?? 0
                }
            })
        }
    }

    // endregion

    // region message
    /**
     * @description 发送消息给指定连接
     */
    public static send(wsId: string, body: any) {
        const ws = this.wsPool.get(wsId)
        if(!ws)
            return false
        else
            ws[1].send(JSON.stringify(body))
    }

    /**
     * @description 房间广播消息
     */
    public static broadcast(roomId?: string, body?: MSG_ROOM) {
        if(!roomId || !body) return false

        const room = this.roomPool.get(roomId)
        if(!room) return false
        else {
            room.forEach(([ _, ws ]) => {
                ws.send(JSON.stringify(body))
            })
        }
    }

    // endregion

    // region ws 增删查
    /**
     * @description 存储新连接(如果存在则自动断开旧连接)
     * @return 房间id
     */
    public static addWS(wsId: string, roomId: string, ws: WebSocket) {
        const room = this.roomPool.get(roomId)
        // 新建房间
        if(!room) {
            this.wsPool.set(wsId, [ roomId, ws ])
            this.roomPool.set(roomId, [ [ wsId, ws ] ])
            return true
        }
        // 正常加入
        else if(room.length < 4) {
            this.wsPool.set(wsId, [ roomId, ws ])
            room.push([ wsId, ws ])
            return true
        }
        // 已满员
        else return false
    }

    /**
     * @description 获取特定连接
     */
    public static getWS(wsId: string): WebSocket | null {
        return this.wsPool.get(wsId)?.[1] ?? null
    }

    /**
     * @description 断开并移除连接
     */
    public static closeWS(wsId: string) {
        const wsInPool = this.wsPool.get(wsId)
        if(wsInPool) {
            wsInPool[1].close()

            // 仅剩一个 => 删除房间
            if(this.roomPool.get(wsInPool[0])?.length === 1) {
                this.roomPool.delete(wsInPool[0])
            }
            // 不止一个 => 仅删除人员
            else {
                this.roomPool.get(wsInPool[0])?.filter(ws => {
                    return ws[0] !== wsInPool[0]
                })
            }

            this.wsPool.delete(wsId)
        }
    }

    /**
     * @description 断开并移除所有连接
     */
    public static closeAll() {
        this.wsPool.forEach(ws => {
            ws[1].close()
        })
        this.wsPool.clear()
    }

    // endregion
}

/**
 * @description websocket 服务控制
 */
abstract class WSSController {
    /**
     * @description websocket server 实例
     * @private
     */
    private static wssInstance: WSServer | null = null

    /**
     * @description 初始化 wss 的 连接、断开、消息处理
     */
    private static initWSS() {
        const wss = this.wssInstance
        if(!wss) return

        wss.on('connection', (ws, req) => {
            // 如果连接带有 wsId 参数, 则说明是重连
            const _wsId = req.url?.match(/(?<=wsId=)[0-9a-z-]+/)?.[0] ?? UUID()
            const _roomId = req.url?.match(/(?<=roomId=)[0-9a-z-]+/)?.[0] ?? UUID()

            colorfulStdout([
                { message: `[${ formatDate() }]`, fontColor: FontColorEnums.yellow },
                { message: ' [wss] ', fontColor: FontColorEnums.green },
                { message: _wsId, fontColor: FontColorEnums.blue },
                { message: ' connecting', fontColor: FontColorEnums.green }
            ])

            // 是否成功加入
            const ifEnter = WSController.addWS(_wsId, _roomId, ws)

            if(!ifEnter) {
                colorfulStdout([
                    { message: `[${ formatDate() }]`, fontColor: FontColorEnums.yellow },
                    { message: ' [wss] ', fontColor: FontColorEnums.red },
                    { message: _wsId, fontColor: FontColorEnums.blue },
                    { message: ' disconnected [REFUSE: room is full]', fontColor: FontColorEnums.red }
                ])
                ws.close()
            }
            else {
                // 消息处理
                ws.on('message', (msg) => {
                    try {
                        const msgObj = JSON.parse(msg.toString()) as MSG_WS

                        // 建立连接后返回 wsId、roomId
                        if(msgObj.cmd === WSChannel.WSId) {
                            ws.send(JSON.stringify({
                                cmd: WSChannel.WSId,
                                payload: {
                                    wsId: _wsId,
                                    roomId: _roomId
                                }
                            } as MSG_WS_wsId))
                        }
                        // 其他所有的消息处理
                        else {
                            WSMsgController.solve(msgObj)
                        }
                    }
                    catch (e) {
                        colorfulStdout([
                            { message: `[${ formatDate() }]`, fontColor: FontColorEnums.yellow },
                            { message: ' [wss] ', fontColor: FontColorEnums.red },
                            { message: _wsId, fontColor: FontColorEnums.blue },
                            { message: ' invalid data format', fontColor: FontColorEnums.red },
                        ])
                    }
                })

                // 错误处理
                ws.on('error', err => {
                    colorfulStdout([
                        { message: `[${ formatDate() }]`, fontColor: FontColorEnums.yellow },
                        { message: ' [wss] ', fontColor: FontColorEnums.red },
                        { message: _wsId, fontColor: FontColorEnums.blue },
                        { message: ` Error: ${ err.message }`, fontColor: FontColorEnums.red }
                    ])
                })

                // 断开连接
                ws.on('close', () => {
                    WSController.closeWS(_wsId)
                    colorfulStdout([
                        { message: `[${ formatDate() }]`, fontColor: FontColorEnums.yellow },
                        { message: ' [wss] ', fontColor: FontColorEnums.yellow },
                        { message: _wsId, fontColor: FontColorEnums.blue },
                        { message: ' disconnect', fontColor: FontColorEnums.yellow }
                    ])
                })
            }
        })
    }

    /**
     * @description 在已有的服务上附加 ws server, 共用端口
     * @param server 已有的服务
     */
    public static attachWSServer(server: HttpServer) {
        this.wssInstance = new WebSocketServer({ server })
        colorfulStdout([
            { message: '[wss] websocket service is attached', fontColor: FontColorEnums.green }
        ])
        this.initWSS()
    }

    /**
     * @description 关闭 websocket 服务
     */
    public static dispose() {
        WSController.closeAll()
        this.wssInstance?.close(err => {
            if(err) colorfulStdout([
                { message: err.message, fontColor: FontColorEnums.red }
            ])
            else colorfulStdout([
                { message: '[wss] websocket service is closed', fontColor: FontColorEnums.green }
            ])

            this.wssInstance = null
        })
    }
}

export {
    WSSController,
    WSController,
}