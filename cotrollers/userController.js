const UserModel = require("../models/user");

const UserDAO = function() {};

/**
 * @returns {Object} 所有 Users
 */
UserDAO.prototype.findAll = async function(callback) {
  let users = await UserModel.find({}).exec();
  return users;
};

/**
 * @param {String} id user对应的id
 *
 * @returns {Object} 返回查找的user
 */
UserDAO.prototype.findUser = async function(id, callback) {
  let user = await UserModel.findById(id).exec();
  return user;
};
/**
 * @param {String} open_id user的open_id
 *
 * @returns {Object} 返回新建的user信息
 */
UserDAO.prototype.newUser = async function(open_id, callback) {
  let user = await UserModel({ open_id: open_id }).save();
  return user;
};

/**
 * @param {String} id user对应的id
 * @param {String} open_id 新的open_id
 *
 * @returns {Object} 返回更新后的user信息
 */
UserDAO.prototype.updateUser = async function(id, open_id, callback) {
  let user = await UserModel.findByIdAndUpdate(
    id,
    { open_id: open_id },
    { new: true }
  ).exec();
  return user;
};

/**
 * @param {String} id user对应的id
 *
 * @returns {Object} 删除的user
 */
UserDAO.prototype.deleteUser = async function(id, callback) {
  let user = await UserModel.findByIdAndRemove(id).exec();
  return user;
};

/**
 * 增加用户所有的群组
 * @param {String} user_id user对应的id
 * @param {String} group_id 新的group_id
 *
 * @returns {Object} 返回更新后的user信息
 */
UserDAO.prototype.addGroup = async function(id, group_id, callback) {
  let user = await UserModel.findByIdAndUpdate(
    id,
    { $addToSet: { groups: group_id } },
    { new: true }
  ).exec();
  return user;
};

/**
 * 删除一个用户所在的群组
 * @param {String} user_id user对应的id
 * @param {String} group_id 新的group_id
 *
 * @returns {Object} 返回更新后的user信息
 */
UserDAO.prototype.deleteGroup = async function(id, group_id, callback) {
  let user = await UserModel.findByIdAndUpdate(
    id,
    { $pull: { groups: group_id } },
    { new: true }
  ).exec();
  return user;
};

/**
 * @param {String} user_id user对应的id
 * @param {String} todo_id 新的todo_id
 *
 * @returns {Object} 返回更新后的user信息
 */
UserDAO.prototype.addTodo = async function(id, todo_id, callback) {
  let user = await UserModel.findByIdAndUpdate(
    id,
    { $addToSet: { todos: todo_id } },
    { new: true }
  ).exec();
  return user;
};

module.exports = new UserDAO();

