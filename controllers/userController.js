const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.addNewUser = (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const emailQuery = User.findOne({ email });
  const userNameQuery = User.findOne({ username });

  Promise.all([emailQuery, userNameQuery])
    .then(results => {
      const userFromEmail = results[0];
      const userFromUsername = results[1];
      if (userFromEmail) {
        return res.json({ msg: "Email already in use" });
      }
      if (userFromUsername) {
        return res.json({ msg: "Username is taken" });
      }
      bcrypt
        .hash(password, 10)
        .then(hash => {
          return User.create({
            name: name,
            username: username,
            email: email,
            password: hash
          });
        })
        .then(result => {
          res.json({ msg: "success" });
          console.log("created user");
          console.log(result);
        });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "failed" });
    });
};

exports.logIn = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    username: username
  })
    .then(user => {
      if (!user) {
        return res.json({ msg: "User not found" });
      }
      bcrypt.compare(password, user.password).then(result => {
        res.json({ msg: "Login Successful" });
      });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "Login failed check credentials and try again" });
    });
};
