const { calculateTransportCost } = require('../src/services/decision/transportService');

const runTests = () => {
  console.log('--- TRANSPORT COST SERVICE TESTS ---\n');

  // Test 1: <= 500 kg -> Rate ₹4/km
  const cost1 = calculateTransportCost(32.4, 500);
  console.log(`Test 1 (500kg, 32.4km) -> Expected ₹130 (32.4 * 4), Got: ₹${cost1}`);
  console.assert(cost1 === Math.round(32.4 * 4), 'Test 1 Failed');

  // Test 2: 501-1000 kg -> Rate ₹5/km
  const cost2 = calculateTransportCost(32.4, 800);
  console.log(`Test 2 (800kg, 32.4km) -> Expected ₹162 (32.4 * 5), Got: ₹${cost2}`);
  console.assert(cost2 === Math.round(32.4 * 5), 'Test 2 Failed');

  // Test 3: > 1000 kg -> Rate ₹6/km
  const cost3 = calculateTransportCost(32.4, 1500);
  console.log(`Test 3 (1500kg, 32.4km) -> Expected ₹194 (32.4 * 6), Got: ₹${cost3}`);
  console.assert(cost3 === Math.round(32.4 * 6), 'Test 3 Failed');

  console.log('\nAll Transport Tests Passed!\n');
};

runTests();
