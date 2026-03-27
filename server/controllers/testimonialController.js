const { validationResult } = require("express-validator");
const Testimonial = require("../models/Testimonial");
const path = require("path");
const fs = require("fs");

const paginate = (total, page, limit) => ({
  total,
  page,
  limit,
  pages: Math.ceil(total / limit),
});

/**
 * @desc  Get all testimonials
 * @route GET /api/v1/testimonials
 * @access Public
 */
const getTestimonials = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { company: { $regex: req.query.search, $options: "i" } },
        { message: { $regex: req.query.search, $options: "i" } },
      ];
    }
    if (req.query.isActive !== undefined)
      filter.isActive = req.query.isActive === "true";

    const total = await Testimonial.countDocuments(filter);
    const testimonials = await Testimonial.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      pagination: paginate(total, page, limit),
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Get single testimonial
 * @route GET /api/v1/testimonials/:id
 * @access Public
 */
const getTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Create testimonial
 * @route POST /api/v1/testimonials
 * @access Private
 */
const createTestimonial = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const body = { ...req.body };
    if (req.file) {
      body.avatar = `/uploads/${req.file.filename}`;
    }

    const testimonial = await Testimonial.create(body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Update testimonial
 * @route PUT /api/v1/testimonials/:id
 * @access Private
 */
const updateTestimonial = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const body = { ...req.body };
    if (req.file) {
      const existing = await Testimonial.findById(req.params.id);
      if (
        existing &&
        existing.avatar &&
        existing.avatar.startsWith("/uploads/")
      ) {
        const oldPath = path.join(__dirname, "..", existing.avatar);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      body.avatar = `/uploads/${req.file.filename}`;
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }

    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Delete testimonial
 * @route DELETE /api/v1/testimonials/:id
 * @access Private
 */
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }

    if (testimonial.avatar && testimonial.avatar.startsWith("/uploads/")) {
      const imgPath = path.join(__dirname, "..", testimonial.avatar);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.status(200).json({ success: true, message: "Testimonial deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
