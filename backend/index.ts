// env
import { HOST, PORT } from "./setting";

// dependencies
import Koa from "koa";
import cors from "@koa/cors";
import { logger } from "./middlewares/logger";
import { BackgroundColorEnums, colorfulStdout, FontColorEnums, formatDate } from "./misc";
import { getApiMiddlewares, indexMiddlewares } from "./api";

// instance
const app = new Koa();

// middlewares
app
    // 跨域
    .use(cors())
    // 日志
    .use(logger)
    // 首页
    .use(indexMiddlewares)
    // 路由
    .use(getApiMiddlewares())
    // 启动
    .listen(PORT, HOST, () => {
        colorfulStdout([
            { message: ' Server ', fontColor: FontColorEnums.green, backgroundColor: BackgroundColorEnums.green },
            { message: ` [${ formatDate() }] `, fontColor: FontColorEnums.lightBlue },
            { message: `at http://${ HOST }:${ PORT }` },
        ])
    })