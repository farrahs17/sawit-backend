const Comment = require("../models/comment");
const Post = require("../models/post");

exports.getComments = (req, res, next) => {
  let username = req.username;

  const postId = req.params.id;
  Post.find({ _id: postId })
    .then(post => {
      res.json({
        comments: post,
        username: username
      });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "failed" });
    });
};

exports.addComment = (req, res, next) => {
  const text = req.body.text;
  const postId = req.body.postId;
  let username = req.username;
  const userId = req.userId;
  console.log(req);
  Comment.create({
    text: text,
    username: username,
    userId: userId,
    postId: postId
  })
    .then(comment => {
      Post.update(
        { _id: postId },
        {
          $push: {
            //   for upvotes use $inc and the value 1 or -1
            comments: comment
          }
        }
      )
        .then(result => {
          res.status(200).json({ msg: "success" });
          console.log("Created Comment");
        })
        .catch(err => {
          console.log(err);
          res.status(401).json({ msg: "failed" });
        });
    })
    .catch(err => console.log(err));
};
