const TodoModel = require("../models/todo");
const UserDAO = require("./userController");
const GroupDAO = require("./groupController");

const TodoDAO = function() {};

/**
 * @returns {Object} 用户的所有 Todos
 */
TodoDAO.prototype.findAll = async function(callback) {
  let todos = await TodoModel.find({}).exec();
  return todos;
};


/**
 * @param {String} id todo对应的id
 *
 * @returns {Object} 返回查找的id
 */
TodoDAO.prototype.findTodo = async function(id, callback) {
  let todo = await TodoModel.findById(id).exec();
  return todo;
};

/**
 * @param {String} todo_info todo的信息(title, receive_group, receive_user, owner)
 *
 * @returns {Object} 返回新建的todo信息
 */
TodoDAO.prototype.newTodo = async function(todo_info, callback) {
  let todo = await TodoModel(todo_info).save();

  let todo_id = todo._id;
  let receive_users = todo.receive_user;
  let receive_group = todo.receive_group;

  // 更新 todo 的接收人员的 todo 列表
  if (receive_users) {
    for (let i = 0; i < receive_users.length; i++) {
      await UserDAO.addTodo(receive_users[i], todo_id);
    }
  }

  // 更新 todo 的接受群组的 todo 列表
  if (receive_group) {
    await GroupDAO.addTodo(receive_group, todo_id);
  }

  return todo;
};

/**
 * @param {String} id todo对应的id
 * @param {String} title 新的标题名
 *
 * @returns {Object} 返回更新后的todo信息
 */
TodoDAO.prototype.updateTodo = async function(id, title, callback) {
  let todo = await TodoModel.findByIdAndUpdate(
    id,
    { title: title },
    { new: true }
  ).exec();
  return todo;
};

/**
 * @param {String} id todo对应的id
 *
 * @returns {Object} 删除的todo
 */
TodoDAO.prototype.deleteTodo = async function(id, callback) {
  let todo = await TodoModel.findByIdAndRemove(id).exec();
  return todo;
};

/**
 * @param {String} id todo对应的id
 * @param {String} receive_user 新的todo接受者
 *
 * @returns {Object} 返回更新后的todo信息
 */
TodoDAO.prototype.addUser = async function(id, receive_user, callback) {
  let todo = await TodoModel.findByIdAndUpdate(
    id,
    { $addToSet: { receive_user: receive_user } },
    { new: true }
  );

  for (let i = 0; i < receive_user.length; i++) {
    await UserDAO.addTodo(receive_user[i], id);
  }

  return todo;
};

module.exports = new TodoDAO();
