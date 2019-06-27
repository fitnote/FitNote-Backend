const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  open_id: { type: String },
  // union_id: {type: String},
  join_time: { type: Date, default: Date.now },
  groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }]
});

module.exports = mongoose.model("User", UserSchema);
