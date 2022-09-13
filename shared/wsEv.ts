export const enum WSChannel {
    WSId = 'wsId',
    Chat = 'chat',
}

// region 客户端 消息
// 模板
export type MSG_WS_template<CMD extends WSChannel, DATA = any> = {
    // 标识符 - 字符串
    cmd: CMD
    payload: {
        // 来源 wsId
        wsId: string
        // 所处 roomId
        roomId: string
        // 消息体
        data: DATA
    }
}
export type MSG_WS_wsId = MSG_WS_template<WSChannel.WSId, undefined>
export type MSG_WS_chat = MSG_WS_template<WSChannel.Chat, string>
export type MSG_WS = MSG_WS_wsId | MSG_WS_chat
// endregion

// region 服务端 消息
// 模板
export type MSG_ROOM_template<CMD extends WSChannel, DATA = any> = {
    // 来源 wsId
    sourceId: string
    // 消息体
    data: DATA
}
export type MSG_ROOM = MSG_ROOM_template<WSChannel.Chat, string>
