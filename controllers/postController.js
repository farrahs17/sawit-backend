const Post = require("../models/post");
const User = require("../models/user");

exports.getPopularPage = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.json({
        posts: posts
      });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "failed" });
    });
};

exports.getPostById = (req, res, next) => {
  console.log(req.params.id);
  const postId = req.params.id;
  Post.findOne({ _id: postId })
    .then(post => {
      console.log(post);
      res.status(200).json({
        post: post
      });
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({ msg: "failed" });
    });
};

exports.addPost = (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const imageUrl = req.body.imageUrl;
  let username = req.username;
  const userId = req.userId;
  console.log(req);
  Post.create({
    title: title,
    text: text,
    imageUrl: imageUrl,
    username: username,
    userId: userId
  })
    .then(result => {
      res.json({ msg: "success" });
      console.log("Created Post");
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "failed" });
    });
};

exports.upvote = (req, res, next) => {
  const postId = req.body.postId;
  console.log(postId);
  Post.update(
    { _id: postId },
    {
      $inc: {
        //   for upvotes use $inc and the value 1 or -1
        upvotes: 1
      }
    }
  )
    .then(result => {
      res.status(200).json({ msg: "success" });

      console.log("Upvoted post");
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({ msg: "failed" });
    });
};

exports.downvote = (req, res, next) => {
  const postId = req.body.postId;
  console.log(postId);
  Post.update(
    { _id: postId },
    {
      $inc: {
        //   for upvotes use $inc and the value 1 or -1
        upvotes: -1
      }
    }
  )
    .then(result => {
      res.status(200).json({ msg: "success" });
      console.log("Upvoted post");
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({ msg: "failed" });
    });
};
