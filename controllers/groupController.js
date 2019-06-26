const GroupModel = require("../models/group");
const UserDAO = require("./userController");

const GroupDAO = function() {};

GroupDAO.prototype.findAll = async function(callback) {
  let groups = await GroupModel.find({}).exec();
  return groups;
};