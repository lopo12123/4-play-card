import { Middleware } from "koa";
import { colorfulStdout, FontColorEnums, formatDate } from "../misc";

/**
 * @description 响应请求后打印日志
 */
const logger: Middleware = async (ctx, next) => {
    await next()
    colorfulStdout([
        { message: `[${ formatDate() }]`, fontColor: FontColorEnums.yellow },
        { message: ` ${ ctx.method } `, fontColor: FontColorEnums.green },
        { message: ctx.originalUrl, fontColor: FontColorEnums.blue },
    ])
}

export {
    logger
}