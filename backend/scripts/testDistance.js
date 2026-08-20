const { calculateHaversineDistance } = require('../src/services/location/distanceService');

const runTests = () => {
  console.log('--- HAVERSINE DISTANCE SERVICE TESTS ---\n');

  // Test 1: Same coordinates
  const dist1 = calculateHaversineDistance(20.0, 73.0, 20.0, 73.0);
  console.log(`Test 1: Same coordinates -> Expected 0.0, Got: ${dist1}`);
  console.assert(dist1 === 0, 'Test 1 Failed');

  // Test 2: Different coordinates (Nashik to Mumbai approx)
  const dist2 = calculateHaversineDistance(19.9975, 73.7898, 19.0760, 72.8777);
  console.log(`Test 2: Nashik to Mumbai -> Expected ~139.7, Got: ${dist2}`);
  console.assert(dist2 > 100 && dist2 < 200, 'Test 2 Failed');

  // Test 3: Symmetry
  const dist3A = calculateHaversineDistance(20.1700, 73.9800, 20.1400, 74.2200);
  const dist3B = calculateHaversineDistance(20.1400, 74.2200, 20.1700, 73.9800);
  console.log(`Test 3: Symmetry (A->B == B->A) -> ${dist3A} == ${dist3B}`);
  console.assert(dist3A === dist3B, 'Test 3 Failed');

  console.log('\nAll Distance Tests Passed!\n');
};

runTests();
