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

module.exports = new TodoDAO();
