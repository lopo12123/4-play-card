import { Server as HttpServer } from "http";
import { Server as WSServer, WebSocketServer } from "ws";
import { colorfulStdout, FontColorEnums } from "../misc";

/**
 * @description websocket server controller
 */
abstract class WSServerController {
    /**
     * @description websocket server 实例
     * @private
     */
    private static wssInstance: WSServer | null = null

    /**
     * @description 在已有的服务上附加 ws server, 共用端口
     * @param server 已有的服务
     */
    public static attachWSServer(server: HttpServer) {
        const wss = new WebSocketServer({ server })
        this.wssInstance = wss
        colorfulStdout([
            { message: '[wss] websocket service is attached', fontColor: FontColorEnums.green }
        ])

        wss.on('connection', (ws) => {
            console.log('[wss] new connection')
            ws.on('close', () => {
                console.log('[wss] someone disconnected')
            })
        })
    }

    /**
     * @description 关闭 websocket 服务
     */
    public static dispose() {
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
    WSServerController
}