const decisionEngine = require('../services/decision/decisionEngine');
const marketService = require('../services/market/marketService');
const trendService = require('../services/market/trendService');
const { geocodeLocation } = require('../services/location/geocodingService');
const { calculateHaversineDistance } = require('../services/location/distanceService');
const { calculateTransportCost } = require('../services/decision/transportService');
const { getWeatherForecast } = require('../services/weather/weatherService');
const { calculateWeatherRisk } = require('../services/weather/weatherRiskService');
const MarketPrice = require('../models/MarketPrice');
const DecisionHistory = require('../models/DecisionHistory');
const mongoose = require('mongoose');

// @desc    Analyze crop selling decision
// @route   POST /api/decision/analyze
// @access  Public
const analyzeDecision = async (req, res, next) => {
  try {
    const { cropId, varietyId, quantityKg, location } = req.body;

    if (!cropId || !varietyId || quantityKg == null || !location) {
      res.status(400);
      throw new Error('कृपया फसल, किस्म, मात्रा और स्थान की जानकारी भरें।');
    }

    if (location.trim() === '') {
      res.status(400);
      throw new Error('स्थान की जानकारी खाली नहीं हो सकती।');
    }

    const numericQuantity = parseFloat(quantityKg);
    if (isNaN(numericQuantity) || numericQuantity <= 0) {
      res.status(400);
      throw new Error('मात्रा एक सही संख्या होनी चाहिए और 0 से अधिक होनी चाहिए।');
    }
    
    // Override quantity with clean parsed value
    req.body.quantityKg = numericQuantity;

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
      throw new Error(`इस फसल के लिए वर्तमान में आसपास की मंडियों का भाव उपलब्ध नहीं है। कृपया अन्य फसल चुनें। (No market data found for this crop)`);
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

      let historicalPrices = [];
      try {
        if (mongoose.connection.readyState === 1) {
          historicalPrices = await MarketPrice.find({
            cropId: cropId.toLowerCase(),
            mandiId: m.mandiId.toLowerCase(),
            varietyId: varietyId.toLowerCase(),
            date: { $gte: startDate }
          }).sort({ date: 1 }).lean();
        }
      } catch (histErr) {
        console.warn("Historical prices query warning:", histErr.message);
      }

      let trendData = { trend: 'stable', percentageChange: 0, estimatedRange: { min: m.price, max: m.price } };
      if (historicalPrices && historicalPrices.length > 0) {
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

    // 6. Save Decision to History (Non-blocking)
    try {
      const bestMandiId = decisionResult.bestMandi;
      const bestMandi = decisionResult.rankedMandis.find(m => m.mandiId === bestMandiId) || decisionResult.rankedMandis[0];
      
      if (bestMandi && mongoose.connection.readyState === 1) {
        await DecisionHistory.create({
          userId: 'demo_farmer_001', // Future proofing for auth
          cropId: cropId,
          varietyId: varietyId,
          quantityKg: quantityKg,
          farmerLocation: location,
          selectedMandiId: bestMandi.mandiId,
          selectedMandiName: bestMandi.mandiName,
          selectedMandiPrice: bestMandi.price,
          expectedRevenue: bestMandi.expectedRevenue,
          transportCost: bestMandi.transportCost,
          riskPenalty: bestMandi.riskPenalty,
          expectedNetReturn: bestMandi.expectedNetReturn,
          trend: bestMandi.trend,
          trendPercentage: bestMandi.trendPercentage,
          sell_now_vs_wait: bestMandi.sell_now_vs_wait,
          weatherRiskLevel: weatherRisk.riskLevel,
          weatherRiskPercentage: weatherRisk.riskPercentage
        });
      }
    } catch (historyErr) {
      console.error("Failed to save Decision History:", historyErr.message);
      // DO NOT fail the main request if DB history saving fails
    }

    // 7. Find Buyer Matches (PS 26132 Extension)
    let buyerMatches = [];
    try {
      const buyerService = require('../services/buyer/buyerService');
      const buyerMatchingService = require('../services/buyer/buyerMatchingService');
      
      const allBuyers = await buyerService.getAllActiveBuyers();
      buyerMatches = await buyerMatchingService.findMatches(
        cropId, 
        varietyId, 
        quantityKg, 
        { latitude: farmerCoords.latitude, longitude: farmerCoords.longitude }, 
        allBuyers
      );
    } catch (buyerErr) {
      console.error("Failed to fetch buyer matches:", buyerErr.message);
      // DO NOT fail the main request if buyer lookup fails
    }

    // 8. Return structured JSON
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
        buyers: buyerMatches,
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
