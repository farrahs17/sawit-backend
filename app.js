const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://farrah:fireit@cluster0-ptixe.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(result => {
    // User.findOne().then(user => {
    //     if (!user) {
    //         const user = new User({
    //             name: 'Max',
    //             email: 'max@test.com',
    //             cart: {
    //                 items: []
    //             }
    //         });
    //         user.save();
    //     }
    // });
    console.log("Database connected!");
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
