/**
 * Script to test the pure Historical Price Trend Analysis logic.
 */

const { calculateTrend } = require('../src/services/market/trendService');

// Helper to mock data
const generateMockPrices = (startPrice, days, changePerDay) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    // Add noise
    const noise = (Math.random() - 0.5);
    const price = startPrice + ((days - 1 - i) * changePerDay) + noise;
    
    data.push({
      date: d,
      price: Math.round(price * 10) / 10
    });
  }
  return data;
};

const runTests = () => {
  console.log('--- HISTORICAL PRICE TREND ANALYSIS TESTS ---\n');

  // 1. Increasing Series
  console.log('Test 1: Increasing Price Series (e.g. 20 -> 24.5 over 30 days)');
  const increasingData = generateMockPrices(20, 30, 0.15);
  const incResult = calculateTrend(increasingData);
  console.log('Result:', JSON.stringify(incResult, null, 2), '\n');

  // 2. Decreasing Series
  console.log('Test 2: Decreasing Price Series (e.g. 25 -> 20.5 over 30 days)');
  const decreasingData = generateMockPrices(25, 30, -0.15);
  const decResult = calculateTrend(decreasingData);
  console.log('Result:', JSON.stringify(decResult, null, 2), '\n');

  // 3. Stable Series
  console.log('Test 3: Stable Price Series (e.g. 22 with noise over 30 days)');
  const stableData = generateMockPrices(22, 30, 0);
  const stableResult = calculateTrend(stableData);
  console.log('Result:', JSON.stringify(stableResult, null, 2), '\n');
};

runTests();
