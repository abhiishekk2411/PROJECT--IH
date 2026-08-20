/**
 * Tests for deterministic Weather Risk and Penalty configuration.
 */

const { calculateWeatherRisk } = require('../src/services/weather/weatherRiskService');

const runTests = () => {
  console.log('--- WEATHER RISK SERVICE TESTS ---\n');

  // Test 1: Low rainfall + low perishability
  const test1 = calculateWeatherRisk({ available: true, rainProbability: 10, rainMm: 1 }, 'wheat');
  console.log(`Test 1 (Low rain, Wheat): Level=${test1.riskLevel}, Penalty=${test1.riskPercentage}%, CropType=${test1.cropPerishability}`);
  console.assert(test1.riskLevel === 'low' && test1.riskPercentage === 0, 'Test 1 Failed');

  // Test 2: Moderate rainfall + medium perishability
  const test2 = calculateWeatherRisk({ available: true, rainProbability: 40, rainMm: 6 }, 'onion');
  console.log(`Test 2 (Mod rain, Onion): Level=${test2.riskLevel}, Penalty=${test2.riskPercentage}%, CropType=${test2.cropPerishability}`);
  console.assert(test2.riskLevel === 'moderate' && test2.riskPercentage === 3, 'Test 2 Failed');

  // Test 3: Moderate rainfall + high perishability
  const test3 = calculateWeatherRisk({ available: true, rainProbability: 40, rainMm: 6 }, 'tomato');
  console.log(`Test 3 (Mod rain, Tomato): Level=${test3.riskLevel}, Penalty=${test3.riskPercentage}%, CropType=${test3.cropPerishability}`);
  console.assert(test3.riskLevel === 'moderate' && test3.riskPercentage === 5, 'Test 3 Failed');

  // Test 4: High rainfall + high perishability
  const test4 = calculateWeatherRisk({ available: true, rainProbability: 80, rainMm: 20 }, 'tomato');
  console.log(`Test 4 (High rain, Tomato): Level=${test4.riskLevel}, Penalty=${test4.riskPercentage}%, CropType=${test4.cropPerishability}`);
  console.assert(test4.riskLevel === 'high' && test4.riskPercentage === 7, 'Test 4 Failed');

  // Test 5: High rainfall + low perishability
  const test5 = calculateWeatherRisk({ available: true, rainProbability: 80, rainMm: 20 }, 'wheat');
  console.log(`Test 5 (High rain, Wheat): Level=${test5.riskLevel}, Penalty=${test5.riskPercentage}%, CropType=${test5.cropPerishability}`);
  console.assert(test5.riskLevel === 'high' && test5.riskPercentage === 3, 'Test 5 Failed');

  // Test 6: Unavailable weather API
  const test6 = calculateWeatherRisk({ available: false }, 'tomato');
  console.log(`Test 6 (Unavailable): Level=${test6.riskLevel}, Penalty=${test6.riskPercentage}%, Tag=${test6.explanationTag}`);
  console.assert(test6.riskLevel === 'unknown' && test6.riskPercentage === 0 && test6.explanationTag === 'weather_data_unavailable', 'Test 6 Failed');

  console.log('\nAll Weather Risk Tests Passed!\n');
};

runTests();
