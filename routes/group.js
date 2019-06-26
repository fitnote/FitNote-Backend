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


/**
 *  响应: POST 请求
 *  API: api.com/group
 *  作用: 创建新群组
 *  返回: 新的群组
 */
router.post("/", async (ctx, next) => {
  console.log("API: POST GROUP/");

  const groups_info = ctx.request.body;

  let new_group = await GroupDAO.newGroup(groups_info);

  ctx.body = new_group;
});

/**
 *  响应: POST 请求
 *  API: api.com/group/:id
 *  作用: 更新群组信息
 *  返回: 新的群组信息
 */
router.post("/:id", async (ctx, next) => {
  console.log("API: POST GROUP/:id");

  const id = ctx.params.id;
  const group_info = ctx.request.body;

  let new_group = await GroupDAO.updateGroup(id, group_info);

  ctx.body = new_group;
});

/**
 *  响应: POST 请求
 *  API: api.com/group/:id/user
 *  作用: 增加群组用户
 *  返回: 新的群组信息
 */
router.post("/:id/user", async (ctx, next) => {
  console.log("API: POST GROUP/:id/user");

  const id = ctx.params.id;
  const members = ctx.request.body.members;

  let new_group = await GroupDAO.addMember(id, members);

  ctx.body = new_group;
});
