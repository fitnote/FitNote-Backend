const Router = require("koa-router");

const router = new Router();

const TodoDAO = require("../controllers/todoController");

router.prefix("/todo");

/**
 *  响应: GET 请求
 *  API: api.com/todo
 *  作用: 查询todo信息
 *  返回: 用户拥有的所有的 todo 列表
 */
router.get("/", async (ctx, next) => {
  console.log("API: GET TODO/");

  let todos = await TodoDAO.findAll();

  ctx.body = todos;
});

/**
 *  响应: GET 请求
 *  API: api.com/todo/:id
 *  作用: 查询该todo信息
 *  返回: 返回该todo的信息
 */
router.get("/:id", async (ctx, next) => {
  console.log("API: GET TODO/:id");

  // 获取 id 使用 ctx.params.id
  const id = ctx.params.id;

  let todo = await TodoDAO.findTodo(id);

  ctx.body = todo;
});

/**
 *  响应: POST 请求
 *  API: api.com/todo
 *  作用: 创建一个新的todo
 *  返回: 新的todo列表
 */
router.post("/", async (ctx, next) => {
  console.log("API: POST TODO/");

  const todo_info = ctx.request.body;

  let new_todo = await TodoDAO.newTodo(todo_info);

  ctx.body = new_todo;
});

/**
 *  响应: POST 请求
 *  API: api.com/todo/:id
 *  作用: 更新一个todo
 *  返回: 更新后的todo列表
 */
router.post("/:id", async (ctx, next) => {
  console.log("API: POST TODO/:id");

  const id = ctx.params.id;
  const todo_title = ctx.request.body.title;

  let new_todo = await TodoDAO.updateTodo(id, todo_title);

  ctx.body = new_todo;
});

/**
 *  响应: POST 请求
 *  API: api.com/todo/:id/user
 *  作用: 增加一个todo下的user
 *  返回: 更新后的todo列表
 */
router.post("/:id/user", async (ctx, next) => {
  console.log("API: POST TODO/:id/user");

  const id = ctx.params.id;
  const receive_user = ctx.request.body.receive_user;

  let new_todo = await TodoDAO.addUser(id, receive_user);

  ctx.body = new_todo;
});

/**
 *  响应: DELETE 请求
 *  API: api.com/todo
 *  作用: 无
 *  返回: 无该操作
 */
router.delete("/", (ctx, next) => {
  ctx.body = "Do nothing...";
});

/**
 *  响应: DELETE 请求
 *  API: api.com/todo/:id
 *  作用: 删除该todo
 *  返回: 删除的todo
 */
router.delete("/:id", async (ctx, next) => {
  console.log("API: DELETE TODO/:id");

  const id = ctx.params.id;

  let delete_todo = await TodoDAO.deleteTodo(id);

  ctx.body = delete_todo;
});

module.exports = router;