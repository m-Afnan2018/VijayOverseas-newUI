const { validationResult } = require("express-validator");
const Product = require("../models/Product");
const path = require("path");
const fs = require("fs");

const paginate = (total, page, limit) => ({
  total,
  page,
  limit,
  pages: Math.ceil(total / limit),
});

/**
 * @desc  Get all products
 * @route GET /api/v1/products
 * @access Public
 */
const getProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
        { origin: { $regex: req.query.search, $options: "i" } },
        { region: { $regex: req.query.search, $options: "i" } },
        { tags: { $in: [new RegExp(req.query.search, "i")] } },
      ];
    }
    if (req.query.category) filter.category = req.query.category;
    if (req.query.isActive !== undefined)
      filter.isActive = req.query.isActive === "true";
    if (req.query.isFeatured !== undefined)
      filter.isFeatured = req.query.isFeatured === "true";
    if (req.query.productType) filter.productType = req.query.productType;
    if (req.query.state) filter.state = { $regex: req.query.state, $options: "i" };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      pagination: paginate(total, page, limit),
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Get single product by ID or slug
 * @route GET /api/v1/products/:id
 * @access Public
 */
const getProduct = async (req, res, next) => {
  try {
    const query = req.params.id.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: req.params.id }
      : { slug: req.params.id };

    const product = await Product.findOne(query).populate(
      "category",
      "name slug"
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Create product
 * @route POST /api/v1/products
 * @access Private
 */
const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const body = { ...req.body };

    // Handle tags as comma-separated string
    if (typeof body.tags === "string") {
      body.tags = body.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      body.images = req.files.map((f) => `/uploads/${f.filename}`);
    } else if (req.file) {
      body.images = [`/uploads/${req.file.filename}`];
    }

    const product = await Product.create(body);
    const populated = await product.populate("category", "name slug");

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Update product
 * @route PUT /api/v1/products/:id
 * @access Private
 */
const updateProduct = async (req, res, next) => {
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

    const existing = await Product.findById(req.params.id);

    if (req.files && req.files.length > 0) {
      // Images the admin wants to keep (sent as existingImages[] in form data)
      const imagesToKeep = req.body.existingImages
        ? (Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages])
        : [];

      // Delete old uploaded files that are no longer needed
      if (existing) {
        existing.images.forEach((img) => {
          if (img.startsWith("/uploads/") && !imagesToKeep.includes(img)) {
            const imgPath = path.join(__dirname, "..", img);
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
          }
        });
      }

      body.images = [...imagesToKeep, ...req.files.map((f) => `/uploads/${f.filename}`)];
    } else if (req.body.existingImages !== undefined) {
      // No new files but user may have removed some existing images
      const imagesToKeep = Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages];

      if (existing) {
        existing.images.forEach((img) => {
          if (img.startsWith("/uploads/") && !imagesToKeep.includes(img)) {
            const imgPath = path.join(__dirname, "..", img);
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
          }
        });
      }

      body.images = imagesToKeep;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    }).populate("category", "name slug");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Delete product
 * @route DELETE /api/v1/products/:id
 * @access Private
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Remove uploaded images
    product.images.forEach((img) => {
      if (img.startsWith("/uploads/")) {
        const imgPath = path.join(__dirname, "..", img);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }
    });

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
