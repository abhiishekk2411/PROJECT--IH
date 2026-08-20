require('dotenv').config();
const mongoose = require('mongoose');
const Mandi = require('../src/models/Mandi');
const MarketPrice = require('../src/models/MarketPrice');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env');
  process.exit(1);
}

const seedMandis = [
  { mandiId: 'pimpalgaon', name: 'Pimpalgaon Mandi', city: 'Pimpalgaon', state: 'Maharashtra', latitude: 20.1700, longitude: 73.9800, active: true },
  { mandiId: 'lasalgaon', name: 'Lasalgaon Mandi', city: 'Lasalgaon', state: 'Maharashtra', latitude: 20.1400, longitude: 74.2200, active: true },
  { mandiId: 'sinnar', name: 'Sinnar Mandi', city: 'Sinnar', state: 'Maharashtra', latitude: 19.8400, longitude: 73.9900, active: true },
  { mandiId: 'dindori', name: 'Dindori Mandi', city: 'Dindori', state: 'Maharashtra', latitude: 20.2000, longitude: 73.8200, active: true },
  { mandiId: 'manmad', name: 'Manmad Mandi', city: 'Manmad', state: 'Maharashtra', latitude: 20.2500, longitude: 74.4400, active: true }
];

// Generate 30 days of historical data for each mandi
const generateHistoricalData = () => {
  const data = [];
  const today = new Date();
  
  // Define base scenarios to test trend logic
  const scenarios = {
    'pimpalgaon': { base: 20, type: 'increasing' }, // 20 -> 24 (+20%)
    'lasalgaon': { base: 22, type: 'stable' },      // 22 -> 22 (0%)
    'sinnar': { base: 25, type: 'decreasing' },     // 25 -> 21 (-16%)
    'dindori': { base: 18, type: 'increasing' },    // 18 -> 21 (+16%)
    'manmad': { base: 28, type: 'decreasing' }      // 28 -> 26 (-7%)
  };

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    for (const [mandiId, scenario] of Object.entries(scenarios)) {
      let price = scenario.base;
      // Add slight noise
      const noise = (Math.random() - 0.5) * 1.5; 
      
      // Add trend
      if (scenario.type === 'increasing') {
        price = scenario.base + ((29 - i) * 0.15) + noise; 
      } else if (scenario.type === 'decreasing') {
        price = scenario.base - ((29 - i) * 0.15) + noise;
      } else {
        price = scenario.base + noise;
      }
      
      data.push({
        cropId: 'tomato',
        mandiId,
        varietyId: 'hybrid',
        price: Math.round(price * 10) / 10,
        unit: 'kg',
        date,
        source: 'demo'
      });
    }
  }
  return data;
};

const seedPrices = generateHistoricalData();

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing
    await Mandi.deleteMany({});
    await MarketPrice.deleteMany({});
    console.log('Cleared existing Mandi and MarketPrice collections');

    // Insert seeds
    await Mandi.insertMany(seedMandis);
    await MarketPrice.insertMany(seedPrices);
    console.log('Successfully seeded 5 Nashik Mandis and their Tomato prices!');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
