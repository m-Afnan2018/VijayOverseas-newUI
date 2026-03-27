const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getNotices,
  getActiveNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");
const { protect } = require("../middleware/authMiddleware");

const noticeValidation = [
  body("title").trim().notEmpty().withMessage("Title is required").isLength({ max: 200 }),
  body("message").trim().notEmpty().withMessage("Message is required").isLength({ max: 1000 }),
  body("type")
    .optional()
    .isIn(["info", "warning", "urgent"])
    .withMessage("Type must be info, warning, or urgent"),
  body("isActive").optional().isBoolean(),
  body("autoHideMs").optional().isNumeric().withMessage("autoHideMs must be a number"),
];

router.get("/active", getActiveNotices);
router.get("/", getNotices);
router.get("/:id", getNotice);
router.post("/", protect, noticeValidation, createNotice);
router.put("/:id", protect, noticeValidation, updateNotice);
router.delete("/:id", protect, deleteNotice);

module.exports = router;
