const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }]
});

module.exports = mongoose.model("Group", GroupSchema);
