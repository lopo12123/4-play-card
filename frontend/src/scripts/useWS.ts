import { IMSG_wsId } from "@mj/shared/wsEv";

abstract class UseWS {
    private static ws: WebSocket | null = null

    /**
     * @description 连接(自动重连)
     * @description 连接后保存 wsId
     */
    public static connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            const wsIdIfExist = sessionStorage.getItem('wsId')
            const roomIdIfExist = sessionStorage.getItem('roomId')
            const search = (!!wsIdIfExist && !!roomIdIfExist)
                ? `?wsId=${ wsIdIfExist }&roomId=${ roomIdIfExist }` : ''
            // const url = new URL(`ws://${ location.host }${ search }`)
            const url = new URL(`ws://${ '127.0.0.1:10087' }${ search }`)
            const _ws = new WebSocket(url)

            // 连接后请求获取 wsId 并本地存储
            _ws.onopen = () => {
                _ws.send(JSON.stringify({ cmd: 'wsId' }))
            }
            _ws.onmessage = (msg) => {
                const msgObj = JSON.parse(msg.data) as IMSG_wsId
                sessionStorage.setItem('wsId', msgObj.payload.wsId)
                sessionStorage.setItem('roomId', msgObj.payload.roomId)
                resolve()
            }
            _ws.onerror = reject
            this.ws = _ws
        })
    }

    /**
     * @description 断开连接
     */
    public static disconnect() {
        sessionStorage.removeItem('wsId')
        sessionStorage.removeItem('roomId')
        this.ws?.close()
    }
}

export {
    UseWS
}