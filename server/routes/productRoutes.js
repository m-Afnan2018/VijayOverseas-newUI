const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { handleMultiUpload } = require("../middleware/uploadMiddleware");

const productValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 200 }),
  body("category").notEmpty().withMessage("Category is required"),
  body("description").optional().isLength({ max: 1000 }),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
  body("isActive").optional().isBoolean(),
  body("isFeatured").optional().isBoolean(),
  body("productType")
    .optional()
    .isIn(["Agricultural Product", "Food Product", "Other"]),
  body("status")
    .optional()
    .isIn(["In Stock", "Out of Stock", "Coming Soon"]),
  body("state").optional().isLength({ max: 100 }),
];

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", protect, handleMultiUpload, productValidation, createProduct);
router.put("/:id", protect, handleMultiUpload, productValidation, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
