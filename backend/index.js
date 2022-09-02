// dependencies
const Koa = require('koa');
const cors = require("@koa/cors")

// env
const {HOST, PORT} = require("./setting");

// instance
const app = new Koa();

// middleware
// 跨域
app.use(cors())
// 路由
app.use((ctx, next) => {
    ctx.body = 'hello'
})

// server
app.listen(PORT, HOST, () => {
    console.log(`server run at ${HOST}:${PORT}`)
})