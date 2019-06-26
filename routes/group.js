const Router = require("koa-router");

const router = new Router();

const GroupDAO = require("../controllers/groupController");

router.prefix("/group");

/**
 *  响应: GET 请求
 *  API: api.com/group
 *  作用: 查询用户所有群组
 *  返回: 用户所有群组信息
 */
router.get("/", async (ctx, next) => {
  console.log("API: GET GROUP/");

  let groups = await GroupDAO.findAll();

  ctx.body = groups;
});

/**
 *  响应: GET 请求
 *  API: api.com/group/:id
 *  作用: 查询某一群组信息
 *  返回: 该群组信息
 */
router.get("/:id", async (ctx, next) => {
  console.log("API: GET GROUP/:id");

  const id = ctx.params.id;

  let group = await GroupDAO.findGroup(id);

  ctx.body = group;
});