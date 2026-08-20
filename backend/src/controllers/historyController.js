const historyService = require('../services/history/historyService');

// @desc    Get user decision history
// @route   GET /api/history
// @access  Public
const getHistory = async (req, res, next) => {
  try {
    const userId = 'demo_farmer_001'; // Default fallback until auth is implemented
    const limit = parseInt(req.query.limit, 10) || 20;

    const history = await historyService.getHistoryByUserId(userId, limit);

    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHistory
};
