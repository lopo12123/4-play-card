// env
import { HOST, PORT } from "./setting";

// dependencies
import Koa from "koa";
import cors from "@koa/cors";
import { logger } from "./middlewares/logger";
import { BackgroundColorEnums, colorfulStdout, FontColorEnums, formatDate } from "./misc";
import { getApiMiddlewares, getIndexMiddlewares } from "./api";

// instance
const app = new Koa();

// middlewares
app
    // 跨域
    .use(cors())
    // 日志
    .use(logger)
    // 首页
    .use(getIndexMiddlewares())
    // 路由
    .use(getApiMiddlewares())
    // 启动
    .listen(PORT, HOST, () => {
        colorfulStdout([
            { message: ' ✌ ', fontColor: FontColorEnums.green, backgroundColor: BackgroundColorEnums.green },
            { message: ` [${ formatDate() }] `, fontColor: FontColorEnums.lightBlue },
            { message: `\n\n\tserver running at http://${ HOST }:${ PORT }\n`, fontColor: FontColorEnums.green },
        ])
    })