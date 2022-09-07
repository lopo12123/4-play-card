import { Middleware } from "koa";
import { colorfulStdout, FontColorEnums, formatDate } from "../scripts/misc";

/**
 * @description 状态码对应日志的颜色
 */
const StatusCodeColor: { [k: string]: FontColorEnums } = {
    '1': FontColorEnums.brown,
    '2': FontColorEnums.green,
    '3': FontColorEnums.yellow,
    '4': FontColorEnums.red,
    '5': FontColorEnums.red,
}

/**
 * @description 响应请求后打印日志
 */
const logger: Middleware = async (ctx, next) => {
    await next()
    const statusType = ctx.status.toString()[0]
    colorfulStdout([
        { message: `[${ formatDate() }] `, fontColor: FontColorEnums.yellow },
        { message: `${ ctx.method } `, fontColor: FontColorEnums.lightBlue },
        { message: `${ ctx.status } `, fontColor: StatusCodeColor[statusType] },
        { message: ctx.originalUrl, fontColor: FontColorEnums.blue },
    ])
}

export {
    logger
}