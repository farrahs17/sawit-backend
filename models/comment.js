const mongoose = require("mongoose");

const Post = require("./post");
const User = require("./user");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    ref: "User"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  postId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Post"
  }
});

module.exports = mongoose.model("Comment", commentSchema);
