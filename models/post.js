const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  upvotes: {
    type: Number,
    default: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  username: {
    type: Schema.Types.String,
    ref: "User"
  },
  comments: [
    {
      text: {
        type: String,
        ref: "Comment",
        required: true
      },
      commentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Comment"
      },
      username: {
        type: Schema.Types.String,
        required: true,
        ref: "User"
      }
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);
