// Import Mongoose 
const mongoose = require('mongoose')


// Route Handler 
const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post" //reference to the post model
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" //reference to the user model
    },
})


// Export 
module.exports = mongoose.model("Like", likeSchema)