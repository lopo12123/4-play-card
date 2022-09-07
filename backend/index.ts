// env
import { HOST, PORT, STATIC_DIR } from "./setting";

// dependencies
import Koa from "koa";
import cors from "@koa/cors";
import staticServer from "koa-static";
import { logger } from "./middlewares/logger";
import { getApiMiddlewares } from "./scripts/koaApi";
import { WSSController } from "./scripts/wsServer";
import { BackgroundColorEnums, colorfulStdout, FontColorEnums, formatDate } from "./scripts/misc";

// instance
const app = new Koa();

const koaServer = app
    // 跨域
    .use(cors())
    // 日志
    .use(logger)
    // 首页 & 静态资源 (放置在 static 目录下)
    .use(staticServer(STATIC_DIR))
    // 路由
    .use(getApiMiddlewares())
    // 启动
    .listen(PORT, HOST, () => {
        colorfulStdout([
            { message: ' ✌ ', fontColor: FontColorEnums.green, backgroundColor: BackgroundColorEnums.green },
            { message: ` ${ formatDate() } `, fontColor: FontColorEnums.lightBlue },
            { message: `\n[koa] server running at http://${ HOST }:${ PORT }`, fontColor: FontColorEnums.green },
        ])

        // 在已有的服务上附加 ws server, 共用端口
        WSSController.attachWSServer(koaServer)
    })