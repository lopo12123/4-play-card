// region ws 消息
export type MSG_WS_wsId = {
    cmd: 'wsId'
    payload: {
        wsId: string
        roomId: string
        data: any
    }
}

/**
 * @description websocket 发送的信息格式
 */
export type MSG_WS = {
    cmd: any
    payload: {
        wsId: string
        roomId: string
        data: any
    }
} | MSG_WS_wsId
// endregion

/**
 * @description
 */
export type MSG_ROOM = {
    // 来源的 wsId
    sourceId: 'server' | string
    // 信息
    msg: any
}
