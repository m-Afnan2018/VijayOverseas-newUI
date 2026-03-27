const express = require("express");
const router = express.Router();
const { uploadSingle, uploadMultiple } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");
const { handleSingleUpload, handleMultiUpload } = require("../middleware/uploadMiddleware");

router.post("/", protect, handleSingleUpload, uploadSingle);
router.post("/multiple", protect, handleMultiUpload, uploadMultiple);

module.exports = router;
