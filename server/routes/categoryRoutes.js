const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const { handleSingleUpload } = require("../middleware/uploadMiddleware");

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 100 }),
  body("description").optional().isLength({ max: 500 }),
  body("isActive").optional().isBoolean(),
  body("order").optional().isNumeric(),
];

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", protect, handleSingleUpload, categoryValidation, createCategory);
router.put("/:id", protect, handleSingleUpload, categoryValidation, updateCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
