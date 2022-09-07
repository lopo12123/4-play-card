export type IMSG_wsId = {
    cmd: 'wsId'
    payload: {
        wsId: string
        roomId: string
    }
}

/**
 * @description websocket 发送的信息格式
 */
export type IMSG = IMSG_wsId | any
