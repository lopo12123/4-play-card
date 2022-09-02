import { Middleware } from "koa";
import { formatDate } from "../misc";

/**
 * @description 响应请求后打印日志
 */
const logger: Middleware = async (ctx, next) => {
    await next()
    console.log(`[${ formatDate() }] [${ ctx.method }] from "${ ctx.originalUrl }"`)
}

export {
    logger
}