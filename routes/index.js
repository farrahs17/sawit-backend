const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

router.get("/", postController.getPopularPage);
router.post("/new-post", postController.addPost);

router.post("/sign-up", userController.addNewUser);
router.post("/log-in", userController.logIn);

module.exports = router;
