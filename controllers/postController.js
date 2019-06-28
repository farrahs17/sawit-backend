const Post = require("../models/post");

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

exports.addPost = (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  const username = req.body.username;
  const imageUrl = req.body.imageUrl;

  Post.create({
    username: username,
    title: title,
    body: body,
    imageUrl: imageUrl
    // userId: req.user._id
  })
    .then(result => {
      res.json({ msg: "success" });
      console.log("created post");
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "success" });
    });
};
