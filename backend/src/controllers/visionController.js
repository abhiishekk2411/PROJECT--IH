const visionService = require('../services/vision/visionService');

// @desc    Analyze uploaded crop image
// @route   POST /api/vision/analyze
// @access  Public
const analyzeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'कृपया फसल की साफ़ फोटो अपलोड करें।'
      });
    }

    const { buffer, mimetype } = req.file;

    // Validate mime type
    if (!mimetype.startsWith('image/')) {
      return res.status(400).json({
        success: false,
        error: 'कृपया केवल इमेज फ़ाइल (JPG/PNG) अपलोड करें।'
      });
    }

    // Pass to vision service
    const analysisResult = await visionService.analyzeCropImage(buffer, mimetype);

    res.json({
      success: true,
      data: analysisResult
    });
  } catch (error) {
    console.error('Vision Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'फोटो का विश्लेषण करने में समस्या आई। कृपया कुछ देर बाद फिर कोशिश करें।'
    });
  }
};

module.exports = {
  analyzeImage
};
