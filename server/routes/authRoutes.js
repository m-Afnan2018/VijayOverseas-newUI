const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { login, getMe, logout } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

module.exports = router;
