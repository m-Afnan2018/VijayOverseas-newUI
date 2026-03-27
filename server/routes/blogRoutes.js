const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");
const { handleSingleUpload } = require("../middleware/uploadMiddleware");

const blogValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Blog title is required")
    .isLength({ max: 300 }),
  body("content").notEmpty().withMessage("Content is required"),
  body("excerpt").optional().isLength({ max: 500 }),
  body("author").optional().isLength({ max: 100 }),
  body("isPublished").optional().isBoolean(),
];

router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", protect, handleSingleUpload, blogValidation, createBlog);
router.put("/:id", protect, handleSingleUpload, blogValidation, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
