const commentModel = require("../models/commentModel");
const postModel = require("../models/postModel");

const createCommentController = async (req, res) => {
  try {
    const { post, user, body } = req.body;

    if (!post || !user || !body) {
      return res.status(404).json({
        success: false,
        message: "Required fields are empty!",
      });
    }

    const comment = new commentModel({
      post,
      user,
      body,
    });

    const savedComment = await comment.save();

    // find the post ID and push the new comment inside its comment's array
    const updatedPost = await postModel
      .findByIdAndUpdate(
        post,
        { $push: { comments: savedComment._id } },
        { new: true }
      )
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      post: updatedPost,
      message: "Comment saved successfully!",
    });
  } catch (error) {
    console.error(error.message),
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const { commentId,post } = req.body;

    if (!commentId) {
      return res.status(404).json({
        success: false,
        message: "Comment Id missing",
      });
    }

    await commentModel.findByIdAndDelete(commentId);

    const updatedPost = await postModel
      .findByIdAndUpdate(
        post,
        { $pull: { comments: commentId } },
        { new: true }
      )
      .populate("likes")
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      post: updatedPost,
      message: "Comment deleted and post updated Successfully!",
    });
  } catch (error) {
    console.error(error.message),
      res.status(500).json({
        success: false,
        message: "Error while deleting comment",
      });
  }
};

module.exports = { createCommentController, deleteCommentController };
