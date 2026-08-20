const decisionEngine = require('../services/decision/decisionEngine');
const marketService = require('../services/market/marketService');
const trendService = require('../services/market/trendService');
const { geocodeLocation } = require('../services/location/geocodingService');
const { calculateHaversineDistance } = require('../services/location/distanceService');
const { calculateTransportCost } = require('../services/decision/transportService');
const { getWeatherForecast } = require('../services/weather/weatherService');
const { calculateWeatherRisk } = require('../services/weather/weatherRiskService');
const MarketPrice = require('../models/MarketPrice');

// @desc    Analyze crop selling decision
// @route   POST /api/decision/analyze
// @access  Public
const analyzeDecision = async (req, res, next) => {
  try {
    const { cropId, varietyId, quantityKg, location } = req.body;

    if (!cropId || !varietyId || !quantityKg || !location) {
      res.status(400);
      throw new Error('Missing required fields: cropId, varietyId, quantityKg, location');
    }

    if (quantityKg <= 0) {
      res.status(400);
      throw new Error('Quantity must be greater than zero');
    }

    // 1. Geocode farmer location
    let farmerCoords;
    try {
      farmerCoords = await geocodeLocation(location);
    } catch (err) {
      res.status(400);
      throw new Error(`Location error: ${err.message}`);
    }

    // 2. Fetch Weather Forecast and Calculate Risk
    const weatherData = await getWeatherForecast(farmerCoords.latitude, farmerCoords.longitude);
    const weatherRisk = calculateWeatherRisk(weatherData, cropId);

    // 3. Fetch relevant market data from DB
    const marketData = await marketService.getMarketsByCropAndLocation(cropId, location);

    if (!marketData || marketData.length === 0) {
      res.status(404);
      throw new Error(`No market data found for crop: ${cropId} near ${location}`);
    }

    // 4. Process each mandi: Distance, Transport, Trend, Risk
    const mandisWithDetails = await Promise.all(marketData.map(async (m) => {
      // Get Mandi coordinates from the marketData (which comes from Mandi model)
      const mandiLat = m.latitude;
      const mandiLon = m.longitude;
      
      let distanceKm = 50; // Fallback
      if (mandiLat && mandiLon) {
        distanceKm = calculateHaversineDistance(farmerCoords.latitude, farmerCoords.longitude, mandiLat, mandiLon);
      }
      
      const transportCost = calculateTransportCost(distanceKm, quantityKg);
      
      // Calculate Risk Penalty
      const expectedRevenue = m.price * quantityKg;
      const riskPenalty = Math.round(expectedRevenue * (weatherRisk.riskPercentage / 100));
      
      // Fetch historical prices to get trend
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const historicalPrices = await MarketPrice.find({
        cropId: cropId.toLowerCase(),
        mandiId: m.mandiId.toLowerCase(),
        varietyId: varietyId.toLowerCase(),
        date: { $gte: startDate }
      }).sort({ date: 1 }).lean();

      let trendData = { trend: 'stable', percentageChange: 0, estimatedRange: { min: m.price, max: m.price } };
      if (historicalPrices.length > 0) {
        const calculatedTrend = trendService.calculateTrend(historicalPrices);
        trendData = {
          trend: calculatedTrend.trend,
          trendPercentage: calculatedTrend.percentageChange,
          estimatedRange: calculatedTrend.estimatedRange
        };
      }

      return {
        ...m,
        distanceKm,
        transportCost,
        riskPenalty,
        ...trendData
      };
    }));

    // 5. Pass everything to pure Decision Engine
    const decisionResult = decisionEngine.calculateDecision({
      cropId,
      varietyId,
      quantityKg,
      farmerLocation: location,
      mandis: mandisWithDetails,
      weatherRisk // Pass weather risk to engine for reasoning tags
    });

    // 6. Return structured JSON
    res.json({
      success: true,
      data: {
        farmerLocation: {
          input: location,
          latitude: farmerCoords.latitude,
          longitude: farmerCoords.longitude,
          displayName: farmerCoords.displayName
        },
        weather: {
          ...weatherData,
          riskLevel: weatherRisk.riskLevel,
          riskPercentage: weatherRisk.riskPercentage,
          cropPerishability: weatherRisk.cropPerishability
        },
        ...decisionResult
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeDecision
};
