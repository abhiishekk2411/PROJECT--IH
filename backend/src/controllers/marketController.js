const marketService = require('../services/market/marketService');
const trendService = require('../services/market/trendService');
const MarketPrice = require('../models/MarketPrice');

// @desc    Get markets and prices for a specific crop and location
// @route   GET /api/markets
// @access  Public
const getMarkets = async (req, res, next) => {
  try {
    const { crop, location } = req.query;

    if (!crop || !location) {
      res.status(400);
      throw new Error('Please provide both crop and location parameters');
    }

    const markets = await marketService.getMarketsByCropAndLocation(crop, location);

    res.json({
      success: true,
      data: markets
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get historical trend for a specific market and crop
// @route   GET /api/markets/trend
// @access  Public
const getMarketTrend = async (req, res, next) => {
  try {
    const { crop, mandi, variety, days = 30 } = req.query;

    if (!crop || !mandi || !variety) {
      res.status(400);
      throw new Error('Please provide crop, mandi, and variety parameters');
    }

    // Query past N days of data from the database
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const historicalPrices = await MarketPrice.find({
      cropId: crop.toLowerCase(),
      mandiId: mandi.toLowerCase(),
      varietyId: variety.toLowerCase(),
      date: { $gte: startDate }
    }).sort({ date: 1 }).lean();

    if (historicalPrices.length === 0) {
      res.status(404);
      throw new Error('No historical data found for the given parameters');
    }

    // Pass data to pure trendService logic
    const trendData = trendService.calculateTrend(historicalPrices);

    res.json({
      success: true,
      data: {
        mandiId: mandi,
        cropId: crop,
        varietyId: variety,
        ...trendData
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMarkets,
  getMarketTrend
};
