import Router from "@koa/router";
import { WSController } from "./wsServer";

// region `/api` 接口
const apiRouter = new Router({
    prefix: '/api',
    strict: true
})

apiRouter
    .get('/ws/wsCount', ctx => {
        ctx.response.body = WSController.wsCount()
    })
    .get('/ws/roomCount', ctx => {
        ctx.response.body = WSController.roomCount()
    })
    .get('/ws/wsList', ctx => {
        ctx.response.body = WSController.wsList()
    })
    .get('/ws/roomList', ctx => {
        ctx.response.body = WSController.roomList()
    })
// endregion

/**
 * @description 获取接口路由
 */
const getApiMiddlewares = () => {
    return apiRouter.routes()
}

export {
    getApiMiddlewares
}