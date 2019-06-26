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

module.exports = new TodoDAO();
