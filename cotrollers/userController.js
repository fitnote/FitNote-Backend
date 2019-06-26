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
