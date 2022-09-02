// env
import { HOST, PORT } from "./setting";

// dependencies
import Koa from "koa";
import cors from "@koa/cors";
import { logger } from "./middlewares/logger";
import { BackgroundColorEnums, colorfulStdout, FontColorEnums } from "./misc";

// instance
const app = new Koa();

// middlewares
app
    // 跨域
    .use(cors())
    // 日志
    .use(logger)

// router
app.use(ctx => {
    ctx.response.status = 403
    ctx.response.body = 'hello koa'
})

// server
app.listen(PORT, HOST, () => {
    console.log(colorfulStdout([
        { message: ' Server ', fontColor: FontColorEnums.green, backgroundColor: BackgroundColorEnums.green },
        { message: ` http://${ HOST }:${ PORT }` },
    ]))
    // console.log('\033[42;32m Server \033[40;32m start at ' + 'http://' + HOST + ':' + PORT + '\033[0m')
})