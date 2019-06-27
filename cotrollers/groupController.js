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

/**
 * @param {String} group_info gourp的信息
 *
 * @returns {Object} 返回新建的group信息
 */
GroupDAO.prototype.newGroup = async function(group_info, callback) {
  let group = await GroupModel(group_info).save();

  let group_id = group._id;
  let group_members = group.members;

  // 新建一个 group 后，更新 group 每一位成员添加 user 中的 group 列表
  for (let i = 0; i < group_members.length; i++) {
    // 此处 await 可以考虑去除，因为不要求完成该操作再下一步
    // 需要思考，其他的 await 也是。
    await UserDAO.addGroup(group_members[i], group_id);
  }
  return group;
};
