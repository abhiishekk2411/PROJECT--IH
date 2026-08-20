/**
 * Pure Business Logic Module for FasalNirnay Decision Engine
 * Isolated from routes/controllers. No ML, no Gemini.
 */

const calculateDecision = ({ cropId, varietyId, quantityKg, farmerLocation, mandis, weatherRisk }) => {
  if (!mandis || mandis.length === 0) {
    throw new Error('No mandi data provided to Decision Engine');
  }

  // Calculate expected Net Return for each mandi
  const analyzedMandis = mandis.map(mandi => {
    // 1. Calculate Expected Revenue
    const expectedRevenue = mandi.price * quantityKg;

    // 2. Fetch/Calculate Transport Cost (Mocked for MVP based on distance)
    // Assuming a mock rate of ₹20 per km per 1000kg (₹0.02 per kg per km)
    // Since distance is passed in mock data, we use it directly or default to 50
    const distanceKm = mandi.distanceKm || 50; 
    const transportCost = mandi.transportCost || Math.round(distanceKm * 0.02 * quantityKg);

    // 3. Fetch/Calculate Risk Penalty (Mocked for MVP based on weather/quality)
    const riskPenalty = mandi.riskPenalty || 0;

    // 4. Trend and Timing Logic
    const trend = mandi.trend || "stable";
    const trendPercentage = mandi.trendPercentage || 0;
    const estimatedRange = mandi.estimatedRange || { min: mandi.price, max: mandi.price };
    
    let sell_now_vs_wait = "sell_now";
    
    // Explicit deterministic rule for MVP
    // HIGH WEATHER RISK priority
    if (weatherRisk && weatherRisk.riskLevel === "high") {
      sell_now_vs_wait = "sell_now";
    } else {
      // Historical trend logic
      if (trend === "decreasing") {
        sell_now_vs_wait = "sell_now";
      } else if (trend === "increasing") {
        // Near upper end of historical range
        const historicalMax = estimatedRange.max;
        if (mandi.price >= historicalMax * 0.95) {
          sell_now_vs_wait = "sell_now";
        } else {
          sell_now_vs_wait = "wait";
        }
      } else if (trend === "stable") {
        sell_now_vs_wait = "sell_now";
      }
    }

    // 5. Calculate Net Return
    const expectedNetReturn = expectedRevenue - transportCost - riskPenalty;

    return {
      mandiId: mandi.mandiId,
      mandiName: mandi.mandiName,
      price: mandi.price,
      distanceKm,
      transportCost,
      riskPenalty,
      expectedRevenue,
      expectedNetReturn,
      trend,
      trendPercentage,
      estimatedRange,
      sell_now_vs_wait
    };
  });

  // Sort by expectedNetReturn descending
  analyzedMandis.sort((a, b) => b.expectedNetReturn - a.expectedNetReturn);

  const bestMandi = analyzedMandis[0];
  
  // Generate basic reasoning tags based on comparison, trend, and weather
  const reasoningTags = [];
  
  if (weatherRisk) {
    if (weatherRisk.explanationTag) {
      reasoningTags.push(weatherRisk.explanationTag);
    }
    
    // If high weather risk forced the sell decision despite trend
    if (weatherRisk.riskLevel === "high" && bestMandi.trend !== "decreasing") {
      reasoningTags.push("weather_supports_early_sale");
    }
  }

  if (bestMandi.trend === "increasing") {
    reasoningTags.push("price_trend_increasing");
  } else if (bestMandi.trend === "decreasing") {
    reasoningTags.push("price_trend_decreasing");
  } else {
    reasoningTags.push("price_trend_stable");
  }

  if (analyzedMandis.length > 1) {
    const secondBest = analyzedMandis[1];
    if (bestMandi.expectedNetReturn > secondBest.expectedNetReturn) {
      reasoningTags.push('better_net_return');
    }
    if (bestMandi.transportCost < secondBest.transportCost) {
      reasoningTags.push('lower_transport_cost');
    }
  }

  return {
    rankedMandis: analyzedMandis,
    bestMandi: bestMandi.mandiId,
    reasoningTags
  };
};

module.exports = {
  calculateDecision
};
