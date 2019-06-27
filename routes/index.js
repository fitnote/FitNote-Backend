// 用于注册路由，将所有的路由统一注册到 registerRouter中

const compose = require("koa-compose");
const glob = require("glob");
const { resolve } = require("path");

registerRouter = () => {
  let routers = [];
  glob
    .sync(resolve(__dirname, "./", "**/*.js"))
    .filter(value => value.indexOf("index.js") === -1)
    .map(router => {
      routers.push(require(router).routes());
      routers.push(require(router).allowedMethods());
    });
  return compose(routers);
};

module.exports = registerRouter;