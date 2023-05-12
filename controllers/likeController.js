const likeModel = require("../models/likeModel");
const postModal = require("../models/postModel");

const likeController = async (req, res) => {
  try {
    const { post, user } = req.body;

    if (!post || !user) {
      return res.status(404).json({
        success: false,
        message: "All required fields are not filled!",
      });
    }

    const like = new likeModel({
      post, user
    });

    await like.save();

    //update likes array in post model
    const updatedPost = await postModal
      .findByIdAndUpdate(post, { $push: { likes: like._id } }, { new: true })
      .populate("likes")
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      message: "Liked post successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server error!",
    });
  }
};

const unlikeController = async (req, res) => {
  try {
    const { post, like } = req.body;

    if (!post || !like) {
      return res.status(404).json({
        success: false,
        message: "All required fields are not filled!",
      });
    }

    const deleteLike = await likeModel.findOneAndDelete(like);

    //update likes array in post model
    const updatedPost = await postModal
      .findByIdAndUpdate (post, { $pull: { likes: deleteLike._id} }, { new: true })
      .populate("likes")
      .populate("comments")
      .exec();

    res.status(200).json({
      success: true,
      message: "unliked post successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server error!",
    });
  }
};

module.exports = { likeController, unlikeController };
