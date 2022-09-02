import { Middleware } from "koa";
import { colorfulStdout, FontColorEnums, formatDate } from "../misc";

/**
 * @description 响应请求后打印日志
 */
const logger: Middleware = async (ctx, next) => {
    await next()
    const isOK = ctx.status.toString().startsWith('2')
    colorfulStdout([
        { message: `[${ formatDate() }] `, fontColor: FontColorEnums.yellow },
        { message: `${ ctx.method } `, fontColor: FontColorEnums.lightBlue },
        { message: `${ ctx.status } `, fontColor: isOK ? FontColorEnums.green : FontColorEnums.red },
        { message: ctx.originalUrl, fontColor: FontColorEnums.blue },
    ])
}

export {
    logger
}