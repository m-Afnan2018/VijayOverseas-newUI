const { validationResult } = require("express-validator");
const Category = require("../models/Category");
const path = require("path");
const fs = require("fs");

const paginate = (total, page, limit) => ({
  total,
  page,
  limit,
  pages: Math.ceil(total / limit),
});

/**
 * @desc  Get all categories
 * @route GET /api/v1/categories
 * @access Public
 */
const getCategories = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }
    if (req.query.isActive !== undefined)
      filter.isActive = req.query.isActive === "true";

    const total = await Category.countDocuments(filter);
    const categories = await Category.find(filter)
      .sort({ order: 1, name: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      pagination: paginate(total, page, limit),
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Get single category
 * @route GET /api/v1/categories/:id
 * @access Public
 */
const getCategory = async (req, res, next) => {
  try {
    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: req.params.id }
      : { slug: req.params.id };

    const category = await Category.findOne(query);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Create category
 * @route POST /api/v1/categories
 * @access Private
 */
const createCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const body = { ...req.body };
    if (req.file) {
      body.image = `/uploads/${req.file.filename}`;
    }

    const category = await Category.create(body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Update category
 * @route PUT /api/v1/categories/:id
 * @access Private
 */
const updateCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const body = { ...req.body };
    if (req.file) {
      // Remove old image if it was from uploads
      const existing = await Category.findById(req.params.id);
      if (existing && existing.image && existing.image.startsWith("/uploads/")) {
        const oldPath = path.join(__dirname, "..", existing.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      body.image = `/uploads/${req.file.filename}`;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Delete category
 * @route DELETE /api/v1/categories/:id
 * @access Private
 */
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Clean up uploaded image
    if (category.image && category.image.startsWith("/uploads/")) {
      const imgPath = path.join(__dirname, "..", category.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
