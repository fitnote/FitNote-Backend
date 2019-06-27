const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String }, // 标题
  start_time: { type: Date }, // 任务开始时间
  end_time: { type: Date }, // 任务结束时间
  add_time: { type: Date, default: Date.now }, // 添加任务时间
  done_time: { type: Date }, // 完成任务时间
  tag: { type: String }, // 标签分类
  detail: { type: String }, // 详细信息
  record: { type: String }, // 录音文件链接
  images: [{ type: String }], // 图片文件链接
  receive_group: { type: Schema.Types.ObjectId, ref: "Group" }, // 接收该todo的群组
  receive_user: [{ type: Schema.Types.ObjectId, ref: "User" }], // 接收该todo的用户
  owner: { type: Schema.Types.ObjectId, ref: "User" }, // todo创建者
  isOwnerable: { type: Boolean }, // 是否只有管理员才可以更改
  isDone: { type: Boolean } // 是否完成
});

module.exports = mongoose.model("Todo", TodoSchema);