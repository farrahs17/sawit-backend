const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  upvotes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Comment", commentSchema);
