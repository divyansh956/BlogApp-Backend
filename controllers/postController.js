const Post = require("../models/postModel")
const User = require("../models/userModel")

exports.createPost = async (req, res) => {
    try {
        const { title, body, user } = req.body;
        const post = new Post({ title, body });
        const savedPost = await post.save();

        await User.findByIdAndUpdate(user, {
            $push: { posts: savedPost._id }
        }, { new: true })

        res.json({
            post: savedPost
        })
    }
    catch (err) {
        return res.status(400).json({
            error: "Error While Creating Post"
        })
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        // const posts = await Post.find(); this will only return the id of likes and comments
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({
            data: posts,
        })
    }
    catch (err) {
        return res.status(400).json({
            error: "Error while Fetching Post "
        })
    }
}