import Router from "@koa/router";
import { readFileSync } from "fs";

// region 根页面
const indexRouter = new Router({ strict: true })
indexRouter
    .get('/index.html', ctx => {
        ctx.redirect('/')
    })
    .get('/', ctx => {
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

/**
 * @description 获取页面展示路由
 */
const getIndexMiddlewares = () => {
    return indexRouter.routes()
}
/**
 * @description 获取接口路由
 */
const getApiMiddlewares = () => {
    return apiRouter.routes()
}

export {
    getIndexMiddlewares,
    getApiMiddlewares
}