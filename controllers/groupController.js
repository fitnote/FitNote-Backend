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