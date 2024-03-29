const express = require("express");
const router = express.Router();

const {
    createPost,
    getAllPosts,
    deleteAllPosts,
    updatePost,
    getPosts,
    deletePost,
} = require("../controls/postcontrols");

router.post("/create/:id", createPost);
router.put("/update/:id", updatePost);
router.post("/get/:id", getPosts);
router.delete("/delete/:id", deletePost);
// to be commented out when deployed
router.get("/getall", getAllPosts);
router.delete("/deleteall", deleteAllPosts);

module.exports = router;
