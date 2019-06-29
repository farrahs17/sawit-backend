const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");

const isAuth = require("../middleware/is-auth");

router.get("/", postController.getPopularPage);
router.post("/new-post", isAuth, postController.addPost);

router.get("/post-details/:id", commentController.getComments);
router.post("/new-comment", isAuth, commentController.addComment);
router.get("/:id", postController.getPostById);

router.post("/upvote", postController.upvote);
router.post("/downvote", postController.downvote);

router.post("/sign-up", userController.addNewUser);
router.post("/log-in", userController.logIn);

module.exports = router;
