const { validationResult } = require("express-validator");
const Notice = require("../models/Notice");

/**
 * Build pagination metadata
 */
const paginate = (total, page, limit) => ({
  total,
  page,
  limit,
  pages: Math.ceil(total / limit),
});

/**
 * @desc  Get all notices
 * @route GET /api/v1/notices
 * @access Public
 */
const getNotices = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { message: { $regex: req.query.search, $options: "i" } },
      ];
    }
    if (req.query.type) filter.type = req.query.type;
    if (req.query.isActive !== undefined)
      filter.isActive = req.query.isActive === "true";

    const total = await Notice.countDocuments(filter);
    const notices = await Notice.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      pagination: paginate(total, page, limit),
      data: notices,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Get active notices (public facing)
 * @route GET /api/v1/notices/active
 * @access Public
 */
const getActiveNotices = async (req, res, next) => {
  try {
    const now = new Date();
    const notices = await Notice.find({
      isActive: true,
      $or: [{ startDate: { $lte: now } }, { startDate: null }],
      $and: [
        {
          $or: [{ endDate: { $gte: now } }, { endDate: null }],
        },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: notices });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Get single notice
 * @route GET /api/v1/notices/:id
 * @access Public
 */
const getNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }
    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Create notice
 * @route POST /api/v1/notices
 * @access Private
 */
const createNotice = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const notice = await Notice.create(req.body);
    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Update notice
 * @route PUT /api/v1/notices/:id
 * @access Private
 */
const updateNotice = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!notice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }

    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc  Delete notice
 * @route DELETE /api/v1/notices/:id
 * @access Private
 */
const deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }
    res.status(200).json({ success: true, message: "Notice deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotices,
  getActiveNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
};
