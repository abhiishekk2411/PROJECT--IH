const dashboardService = require('../services/dashboard/dashboardService');

// @desc    Get dashboard summary
// @route   GET /api/dashboard
// @access  Public
const getDashboard = async (req, res, next) => {
  try {
    const userId = 'demo_farmer_001'; // Default fallback until auth is implemented

    const summary = await dashboardService.getDashboardSummary(userId);

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard
};
