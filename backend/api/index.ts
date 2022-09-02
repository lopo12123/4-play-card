import { Middleware } from "koa";
import Router from "@koa/router";
import { readFileSync } from "fs";

// region 根页面
const indexRouter = new Router({ strict: true })
indexRouter
    .get('/', ctx => {
        try {
            ctx.body = readFileSync('./static/index.html', { encoding: 'binary' })
        }
        catch (e) {
            ctx.status = 404
        }
    })
    .get('/index.html', ctx => {
        try {
            ctx.body = readFileSync('./static/index.html', { encoding: 'binary' })
        }
        catch (e) {
            ctx.status = 404
        }
    })
// endregion

// region `/api` 接口
const apiRouter = new Router({
    prefix: '/api',
    strict: true
})

apiRouter.get('/123', ctx => {
    ctx.response.body = '/api'
})
// endregion

const getIndexMiddlewares = () => {
    return indexRouter.routes()
}
const getApiMiddlewares = () => {
    return apiRouter.routes()
}

export {
    getIndexMiddlewares,
    getApiMiddlewares
}