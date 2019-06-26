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

  Post.create({
    username: username,
    title: title,
    body: body
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
