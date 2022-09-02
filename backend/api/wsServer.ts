import { Server as HttpServer } from "http";
import { WebSocketServer } from "ws";
import { colorfulStdout, FontColorEnums } from "../misc";

/**
 * @description websocket server controller
 */
abstract class WSServerController {
    /**
     * @description 在已有的服务上附加 ws server, 共用端口
     * @param server 已有的服务
     */
    public static attachWSServer(server: HttpServer) {
        const wss = new WebSocketServer({ server })
        colorfulStdout([
            { message: '[wss] websocket server setup', fontColor: FontColorEnums.green }
        ])

        wss.on('connection', (ws) => {
            console.log('[wss] new connection')
            ws.on('message', (msg) => {
                console.log(msg.toString())
            })
        })
    }
}

export {
    WSServerController
}