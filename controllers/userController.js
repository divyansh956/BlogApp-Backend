const Like = require('../models/likeModel');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    try {
        const { name } = req.body;
        const user = new User({ name });
        const savedUser = await user.save();
        res.json({
            success: true,
            message: 'User Created Successfully',
            user: savedUser,
        });
    } catch (err) {
        return res.status(500).json({
            error: 'Error while creating user',
        });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).populate('posts').populate('likes').populate('comments').exec();
        res.json({
            success: true,
            message: 'User details fetched successfully',
            data: user,
        });
    } catch (err) {
        return res.status(500).json({
            error: 'Error while fetching user details',
        });
    }
};