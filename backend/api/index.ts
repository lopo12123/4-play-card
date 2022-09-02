import Router from "@koa/router";
import { Middleware } from "koa";

const apiRouter = new Router({
    prefix: '/api',
    strict: true
})

// region `/api` 接口
apiRouter.get('/123', ctx => {
    ctx.response.body = '/api'
})
// endregion

const indexMiddlewares: Middleware = (ctx) => {
    
}
const getApiMiddlewares = () => {
    return apiRouter.routes()
}

export {
    indexMiddlewares,
    getApiMiddlewares
}