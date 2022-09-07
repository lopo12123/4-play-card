import Router from "@koa/router";
import { WSController } from "./wsServer";

// region `/api` 接口
const apiRouter = new Router({
    prefix: '/api',
    strict: true
})

apiRouter
    .get('/ws/count', ctx => {
        ctx.response.body = WSController.count()
    })
    .get('/ws/ids', ctx => {
        ctx.response.body = WSController.list()
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