import { Server as HttpServer } from "http";
import { Server as WSServer, WebSocket, WebSocketServer } from "ws";
import { v4 as UUID } from "uuid";
import { colorfulStdout, FontColorEnums, formatDate } from "./misc";

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
     * @description 初始化 wss 的 `连接/断开` 处理
     */
    private static initWSS() {
        const wss = this.wssInstance
        if(!wss) return

        wss.on('connection', (ws, req) => {
            // 如果连接带有 wsId 参数, 则说明是重连
            const _wsId = req.url?.match(/(?<=wsId=)[0-9a-z-]+/)?.[0] ?? UUID()
            WSController.addWS(_wsId, ws)
            colorfulStdout([
                { message: `[${ formatDate() }]`, fontColor: FontColorEnums.yellow },
                { message: ' [wss] ', fontColor: FontColorEnums.green },
                { message: _wsId, fontColor: FontColorEnums.blue },
                { message: ' connecting', fontColor: FontColorEnums.green }
            ])

            //
            // ws.on('open', () => {
            //
            // })

            // 断开
            ws.on('close', () => {
                WSController.closeWS(_wsId)
                colorfulStdout([
                    { message: `[${ formatDate() }]`, fontColor: FontColorEnums.yellow },
                    { message: ' [wss] ', fontColor: FontColorEnums.green },
                    { message: _wsId, fontColor: FontColorEnums.blue },
                    { message: ' disconnect', fontColor: FontColorEnums.red }
                ])
            })
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

/**
 * @description websocket 连接控制
 */
abstract class WSController {
    /**
     * @description 连接池
     */
    private static pool = new Map<string, WebSocket>()

    /**
     * @description 获取当前连接数
     */
    public static count() {
        return this.pool.size
    }

    /**
     * @description 获取全部 wsId 列表
     */
    public static list() {
        return [ ...this.pool.keys() ]
    }

    /**
     * @description 存储新连接(如果存在则自动断开旧连接)
     */
    public static addWS(wsId: string, ws: WebSocket) {
        this.pool.get(wsId)?.close()
        this.pool.set(wsId, ws)
    }

    /**
     * @description 获取特定连接
     */
    public static getWS(wsId: string) {
        return this.pool.get(wsId) ?? null
    }

    /**
     * @description 断开并移除连接
     */
    public static closeWS(wsId: string) {
        this.pool.get(wsId)?.close()
        this.pool.delete(wsId)
    }

    /**
     * @description 断开并移除所有连接
     */
    public static closeAll() {
        this.pool.forEach(ws => {
            ws.close()
        })
        this.pool.clear()
    }
}

/**
 * @description websocket 消息处理
 */
abstract class WSMsgController {
    public static solve() {

    }
}

export {
    WSSController,
    WSController,
}