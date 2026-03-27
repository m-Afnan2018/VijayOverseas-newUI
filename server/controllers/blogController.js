const { validationResult } = require("express-validator");
const Blog = require("../models/Blog");
const path = require("path");
const fs = require("fs");

const paginate = (total, page, limit) => ({
  total,
  page,
  limit,
  pages: Math.ceil(total / limit),
});

/**
 * @desc  Get all blogs
 * @route GET /api/v1/blogs
 * @access Public
 */
const getBlogs = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { excerpt: { $regex: req.query.search, $options: "i" } },
        { author: { $regex: req.query.search, $options: "i" } },
        { tags: { $in: [new RegExp(req.query.search, "i")] } },
      ];
    }
    if (req.query.isPublished !== undefined)
      filter.isPublished = req.query.isPublished === "true";
    if (req.query.tag) filter.tags = { $in: [req.query.tag] };

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .select("-content") // exclude full content from list view
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      pagination: paginate(total, page, limit),
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Get single blog by ID or slug
 * @route GET /api/v1/blogs/:id
 * @access Public
 */
const getBlog = async (req, res, next) => {
  try {
    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: req.params.id }
      : { slug: req.params.id };

    const blog = await Blog.findOne(query);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Create blog
 * @route POST /api/v1/blogs
 * @access Private
 */
const createBlog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const body = { ...req.body };

    if (typeof body.tags === "string") {
      body.tags = body.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    if (typeof body.categories === "string") {
      body.categories = body.categories
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
    }

    if (req.file) {
      body.coverImage = `/uploads/${req.file.filename}`;
    }

    const blog = await Blog.create(body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Update blog
 * @route PUT /api/v1/blogs/:id
 * @access Private
 */
const updateBlog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const body = { ...req.body };

    if (typeof body.tags === "string") {
      body.tags = body.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    if (typeof body.categories === "string") {
      body.categories = body.categories
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
    }

    if (req.file) {
      const existing = await Blog.findById(req.params.id);
      if (
        existing &&
        existing.coverImage &&
        existing.coverImage.startsWith("/uploads/")
      ) {
        const oldPath = path.join(__dirname, "..", existing.coverImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      body.coverImage = `/uploads/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Delete blog
 * @route DELETE /api/v1/blogs/:id
 * @access Private
 */
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (blog.coverImage && blog.coverImage.startsWith("/uploads/")) {
      const imgPath = path.join(__dirname, "..", blog.coverImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBlogs, getBlog, createBlog, updateBlog, deleteBlog };
