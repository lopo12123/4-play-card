// env
const {HOST, PORT} = require("./setting");

// dependencies
const Koa = require('koa');
const cors = require("@koa/cors")
const {logger} = require("./middlewares/logger");

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
    console.log('\033[42;32m Server \033[40;32m start at ' + 'http://' + HOST + ':' + PORT + '\033[0m')
})