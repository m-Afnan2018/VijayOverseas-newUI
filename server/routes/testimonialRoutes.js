const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const { protect } = require("../middleware/authMiddleware");
const { handleSingleUpload } = require("../middleware/uploadMiddleware");

const testimonialValidation = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 1000 }),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("designation").optional().isLength({ max: 150 }),
  body("company").optional().isLength({ max: 150 }),
  body("isActive").optional().isBoolean(),
  body("order").optional().isNumeric(),
];

router.get("/", getTestimonials);
router.get("/:id", getTestimonial);
router.post("/", protect, handleSingleUpload, testimonialValidation, createTestimonial);
router.put("/:id", protect, handleSingleUpload, testimonialValidation, updateTestimonial);
router.delete("/:id", protect, deleteTestimonial);

module.exports = router;
