import Router from "@koa/router";

// region `/api` 接口
const apiRouter = new Router({
    prefix: '/api',
    strict: true
})

apiRouter.get('/api-1', ctx => {
    ctx.response.body = '/123'
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