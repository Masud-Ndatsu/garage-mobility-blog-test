const { Router } = require("express");
const {
     createPost,
     getPosts,
     getPostById,
     updatePostById,
     deletePostById,
} = require("../controllers/post.controller");

const router = Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:postId", getPostById);
router.put("/:postId", updatePostById);
router.delete("/:postId", deletePostById);

module.exports = postRoutes = router;
