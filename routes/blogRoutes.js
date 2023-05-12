const express = require("express");
const router = express.Router();
const {createPostController,fetchPostController,deletePost} = require("../controllers/postController")
const {likeController,unlikeController} = require("../controllers/likeController")
const {createCommentController,deleteCommentController} = require("../controllers/commentController")

router.post("/post/create",createPostController);
router.get("/post/fetch",fetchPostController);
router.delete("/post/delete",deletePost);
router.post("/likes/like",likeController);
router.post("/likes/unlike",unlikeController);
router.post("/comment/create",createCommentController);
router.delete("/comment/delete",deleteCommentController);

module.exports = router;