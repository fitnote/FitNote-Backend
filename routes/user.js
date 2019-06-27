const Router = require("koa-router");

const router = new Router();

const UserDAO = require("../controllers/userController");

router.prefix("/user");

/**
 *  响应: GET 请求
 *  API: api.com/user
 *  作用: 查询用户信息
 *  返回: user信息
 */
router.get("/", async (ctx, next) => {
  console.log("API: GET USER/");

  let users = await UserDAO.findAll();

  ctx.body = users;
});

/**
 *  响应: GET 请求
 *  API: api.com/user/:id
 *  作用: 查询某一用户信息
 *  返回: user信息
 */
router.get("/:id", async (ctx, next) => {
  console.log("API: GET USER/:id");

  const id = ctx.params.id;

  let user = await UserDAO.findUser(id);

  ctx.body = user;
});

/**
 *  响应: POST 请求
 *  API: api.com/user
 *  作用: 创建新用户
 *  返回: 新的user信息
 */
router.post("/", async (ctx, next) => {
  console.log("API: POST USER/");

  const open_id = ctx.request.body.open_id;

  let new_user = await UserDAO.newUser(open_id);

  ctx.body = new_user;
});

/**
 *  响应: POST 请求
 *  API: api.com/user/:id
 *  作用: 更新用户信息
 *  返回: 新的user信息
 */
router.post("/:id", async (ctx, next) => {
  console.log("API: POST USER/:id");

  const id = ctx.params.id;
  const open_id = ctx.request.body.open_id;

  let new_user = await UserDAO.updateUser(id, open_id);

  ctx.body = new_user;
});

/**
 *  响应: DELETE 请求
 *  API: api.com/user
 *  作用: 无
 *  返回: 无该操作
 */
router.delete("/", (ctx, next) => {
  ctx.body = "Do nothing...";
});

/**
 *  响应: DELETE 请求
 *  API: api.com/user/:id
 *  作用：删除用户
 *  返回: 删除的用户
 */
router.delete("/:id", async (ctx, next) => {
  console.log("API: DELETE USER/:id");

  const id = ctx.params.id;

  let delete_user = await UserDAO.deleteUser(id);

  ctx.body = delete_user;
});

module.exports = router;
