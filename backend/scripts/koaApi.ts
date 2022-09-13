import Router from "@koa/router";
import { WSController } from "./wsServer";

// `/api` 接口
const apiRouter = new Router({
    prefix: '/api',
    strict: true
})

apiRouter
    // ws 连接数量
    .get('/ws/wsCount', ctx => {
        ctx.response.body = WSController.wsCount()
    })
    // room 数量
    .get('/ws/roomCount', ctx => {
        ctx.response.body = WSController.roomCount()
    })
    // ws id列表
    .get('/ws/wsList', ctx => {
        ctx.response.body = WSController.wsList()
    })
    // room id列表
    .get('/ws/roomList', ctx => {
        ctx.response.body = WSController.roomList()
    })
    // room 信息列表 {roomId: string, count: number}[]
    .get('/ws/roomInfo', ctx => {
        const ids = ctx.request.query['ids'] as string[] | undefined
        ctx.response.body = WSController.roomInfo(ids)
    })

/**
 * @description 获取接口路由
 */
const getApiMiddlewares = () => {
    return apiRouter.routes()
}

export {
    getApiMiddlewares
}