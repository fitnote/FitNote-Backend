
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

// 配置文件
const CONFIG = require("./config/config");

// 注册路由
const registerRouter = require("./routes");

// 链接 MongoDB
const mongoose = require("mongoose");
mongoose.connect(
  CONFIG.MONGO_DB, // 数据库地址
  { useNewUrlParser: true, useFindAndModify: false }, // 第一个为规定参数，第二个为解决提示DeprecationWarning
  err => {
    if (err) throw err;
    console.log("mongo connect success");
  }
);

const app = new Koa();

// body parser 处理 post 请求
app.use(bodyParser());

// 注册路由
app.use(registerRouter());

app.listen(3000);
console.log("Starting at port 3000");