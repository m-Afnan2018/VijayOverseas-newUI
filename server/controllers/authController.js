const { validationResult } = require("express-validator");
const Admin = require("../models/Admin");
const { sendTokenResponse } = require("../utils/generateToken");

/**
 * @desc  Login admin
 * @route POST /api/v1/auth/login
 * @access Public
 */
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    sendTokenResponse(admin, 200, res);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Get current logged in admin
 * @route GET /api/v1/auth/me
 * @access Private
 */
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.admin,
  });
};

/**
 * @desc  Logout admin (clear cookie)
 * @route POST /api/v1/auth/logout
 * @access Private
 */
const logout = (req, res) => {
  res.cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = { login, getMe, logout };
