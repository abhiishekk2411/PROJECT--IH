/**
 * This script manually tests the pure Decision Engine without needing MongoDB.
 * It proves the engine calculates Net Return correctly and sorts them.
 */

const { calculateDecision } = require('../src/services/decision/decisionEngine');
const { calculateHaversineDistance } = require('../src/services/location/distanceService');
const { calculateTransportCost } = require('../src/services/decision/transportService');

const farmerLocation = { latitude: 19.9975, longitude: 73.7898 }; // Nashik
const quantityKg = 800; // > 500 and <= 1000 -> ₹5/km

const mockMarketData = [
  { mandiId: 'pimpalgaon', mandiName: 'Pimpalgaon Mandi', price: 24, latitude: 20.1700, longitude: 73.9800, riskPenalty: 500, trend: 'increasing', trendPercentage: 20, estimatedRange: { min: 20, max: 24.5 } },
  { mandiId: 'lasalgaon', mandiName: 'Lasalgaon Mandi', price: 22, latitude: 20.1400, longitude: 74.2200, riskPenalty: 200, trend: 'stable', trendPercentage: 0, estimatedRange: { min: 21, max: 23 } },
  { mandiId: 'sinnar', mandiName: 'Sinnar Mandi', price: 21, latitude: 19.8400, longitude: 73.9900, riskPenalty: 800, trend: 'decreasing', trendPercentage: -16, estimatedRange: { min: 21, max: 25 } },
  { mandiId: 'dindori', mandiName: 'Dindori Mandi', price: 18, latitude: 20.2000, longitude: 73.8200, riskPenalty: 0, trend: 'increasing', trendPercentage: 16, estimatedRange: { min: 15, max: 20 } },
  { mandiId: 'manmad', mandiName: 'Manmad Mandi', price: 27, latitude: 20.2500, longitude: 74.4400, riskPenalty: 0, trend: 'decreasing', trendPercentage: -7, estimatedRange: { min: 26, max: 29 } }
];

// Orchestrate
const weatherRisk = {
  riskLevel: 'high',
  rainProbability: 80,
  rainMm: 20,
  cropPerishability: 'high',
  riskPercentage: 7,
  explanationTag: 'weather_risk_high'
};

const mandisWithDynamicValues = mockMarketData.map(mandi => {
  const distanceKm = calculateHaversineDistance(farmerLocation.latitude, farmerLocation.longitude, mandi.latitude, mandi.longitude);
  const transportCost = calculateTransportCost(distanceKm, quantityKg);
  
  const expectedRevenue = mandi.price * quantityKg;
  const riskPenalty = Math.round(expectedRevenue * (weatherRisk.riskPercentage / 100));
  
  return {
    ...mandi,
    distanceKm,
    transportCost,
    riskPenalty
  };
});

const input = {
  cropId: 'tomato',
  varietyId: 'hybrid',
  quantityKg,
  farmerLocation: 'Nashik',
  mandis: mandisWithDynamicValues,
  weatherRisk
};

console.log('--- FASALNIRNAY DECISION ENGINE TEST ---\n');
console.log('Inputs: Tomato (Hybrid), 800 kg from Nashik (19.9975, 73.7898)\n');

try {
  const result = calculateDecision(input);
  
  console.log('Engine Output (Should be sorted descending by expectedNetReturn):\n');
  console.log(JSON.stringify(result, null, 2));

} catch (e) {
  console.error(e);
}
