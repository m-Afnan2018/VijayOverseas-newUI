/**
 * @desc  Upload single image
 * @route POST /api/v1/upload
 * @access Private
 */
const uploadSingle = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({
    success: true,
    data: {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      url,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
};

/**
 * @desc  Upload multiple images
 * @route POST /api/v1/upload/multiple
 * @access Private
 */
const uploadMultiple = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: "No files uploaded" });
  }
  const files = req.files.map((file) => ({
    filename: file.filename,
    path: `/uploads/${file.filename}`,
    url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
    size: file.size,
    mimetype: file.mimetype,
  }));
  res.status(200).json({ success: true, data: files });
};

module.exports = { uploadSingle, uploadMultiple };
