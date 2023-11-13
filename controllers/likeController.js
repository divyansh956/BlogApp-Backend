// Import Models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");
const User = require("../models/userModel");

// Like a Post
exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();

    await User.findByIdAndUpdate(user, { $push: { likes: savedLike._id } }, { new: true });

    // Update Post Collection basis on this
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error While Like Post",
    });
  }
};

// Unlike a Post
exports.unlikePost = async (req, res) => {
  try {
    const { post, like, user } = req.body;

    // find and delete the from like collection
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    // update the user collection
    await User.findByIdAndUpdate(
      user,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    );

    // update the post collection
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    );

    res.json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error While unLike Post",
    });
  }
};

// exports.koko = (req, res) => {
//   res.send("Koko");
// };
