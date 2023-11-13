const express = require('express');
const router = express.Router();

// Import Controller 
const { createComment, deleteComment } = require("../controllers/commentController");
const { createPost, getAllPosts } = require("../controllers/postController");
const { likePost, unlikePost } = require("../controllers/likeController");
const { getUserDetails, createUser } = require("../controllers/userController");
// const { koko } = require("../controllers/likeController");

// Mapping Create
router.post("/comments/create", createComment)
router.post("/comments/delete", deleteComment)
router.post("/posts/create", createPost)
router.get("/posts", getAllPosts)
router.post("/likes/like", likePost)
router.post("/likes/unlike", unlikePost)
router.post("/user/details", getUserDetails)
router.post("/user/create", createUser)
// router.get("/koko", koko)

// Export Controller
module.exports = router;