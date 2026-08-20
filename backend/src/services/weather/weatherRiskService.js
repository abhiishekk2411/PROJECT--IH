/**
 * Weather Risk Service
 * Deterministically converts weather parameters into a Risk Level and Risk Penalty Percentage.
 */

const { getCropPerishability } = require('../../config/cropRiskConfig');

const calculateWeatherRisk = (weatherData, cropId) => {
  if (!weatherData || !weatherData.available) {
    return {
      riskLevel: "unknown",
      rainProbability: weatherData ? weatherData.rainProbability : 0,
      rainMm: weatherData ? weatherData.rainMm : 0,
      cropPerishability: getCropPerishability(cropId),
      riskPercentage: 0,
      explanationTag: "weather_data_unavailable"
    };
  }

  const { rainProbability, rainMm } = weatherData;
  let riskLevel = "low";

  // MVP Rule Matrix
  if (rainProbability >= 70 || rainMm >= 15) {
    riskLevel = "high";
  } else if (rainProbability >= 30 || rainMm >= 5) {
    riskLevel = "moderate";
  }

  const cropPerishability = getCropPerishability(cropId);
  let riskPercentage = 0;

  // Penalty Matrix: [Low Perishability, Medium Perishability, High Perishability]
  const penaltyMatrix = {
    "low": { "low": 0, "medium": 0, "high": 0 },
    "moderate": { "low": 1, "medium": 3, "high": 5 },
    "high": { "low": 3, "medium": 5, "high": 7 }
  };

  riskPercentage = penaltyMatrix[riskLevel][cropPerishability];

  let explanationTag = `weather_risk_${riskLevel}`;
  if (!weatherData.available) {
    explanationTag = "weather_data_unavailable";
  }

  return {
    riskLevel,
    rainProbability,
    rainMm,
    cropPerishability,
    riskPercentage,
    explanationTag
  };
};

module.exports = {
  calculateWeatherRisk
};
