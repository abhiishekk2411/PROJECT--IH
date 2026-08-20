const express = require('express');
const router = express.Router();
const multer = require('multer');
const { analyzeImage } = require('../controllers/visionController');

// Multer config: memory storage, 10MB limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/analyze', upload.single('image'), analyzeImage);

module.exports = router;
