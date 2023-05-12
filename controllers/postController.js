const postModel = require("../models/postModel");
const likeModel = require("../models/likeModel")
const commentModel = require("../models/commentModel")

const createPostController = async (req, res) => {
  try {
    const { user, title, body } = req.body;

    if (!user || !title || !body) {
      return res.status(404).json({
        success: false,
        message: "Required fields are empty!",
      });
    }

    const post = new postModel({
      title,
      user,
      body,
    });

    await post.save();

    res.status(200).json({
      success: true,
      post: post,
      message: "Post created Successfully!",
    });
  } catch (error) {
    console.error(error.message),
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
  }
};

const fetchPostController = async (req, res) => {
  try {
    const allPosts = await postModel
      .find({})
      .populate("likes")
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      posts: allPosts,
      message: "posts fetch successfully",
    });
  } catch (error) {
    console.error(error.message),
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(404).json({
        success: false,
        message: "Post id not present",
      });
    }

    await postModel.findByIdAndDelete(postId);

    res.status(200).json({
      success: true,
      message: "post deleted Successfully!",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { createPostController, fetchPostController,deletePost };
