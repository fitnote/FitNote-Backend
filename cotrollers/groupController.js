const GroupModel = require("../models/group");
const UserDAO = require("./userController");

const GroupDAO = function() {};

/**
 * @returns {Object} 所有 Groups
 */
GroupDAO.prototype.findAll = async function(callback) {
  let groups = await GroupModel.find({}).exec();
  return groups;
};

/**
 * @param {String} id group对应的id
 *
 * @returns {Object} 返回查找的group
 */
GroupDAO.prototype.findGroup = async function(id, callback) {
  let group = await GroupModel.findById(id).exec();
  return group;
};