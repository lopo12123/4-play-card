// env
import { HOST, PORT } from "./setting";

// dependencies
import Koa from "koa";
import cors from "@koa/cors";
import { logger } from "./middlewares/logger";
import { getApiMiddlewares, getIndexMiddlewares } from "./api";
import { WSServerController } from "./api/wsServer";
import { BackgroundColorEnums, colorfulStdout, FontColorEnums, formatDate } from "./misc";

// instance
const app = new Koa();

const koaServer = app
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
            { message: `\n[koa] server running at http://${ HOST }:${ PORT }`, fontColor: FontColorEnums.green },
        ])

        // 在已有的服务上附加 ws server, 共用端口
        WSServerController.attachWSServer(koaServer)
    })