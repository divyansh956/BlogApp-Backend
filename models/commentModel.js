// Import Mongoose 
const mongoose = require('mongoose')


// Route Handler 
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post" //reference to the post model
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //reference to the user model
    },
    body: {
        type: String,
        required: true,
    }
})


// Export 
module.exports = mongoose.model("Comment", commentSchema)