const Buyer = require('../../models/Buyer');
const mongoose = require('mongoose');

// Fallback demo data if DB is empty or disconnected
const DEMO_BUYERS = [
  {
    buyerId: 'demo_abc_foods',
    name: 'ABC Foods',
    location: 'Nashik',
    isDemo: true,
    active: true,
    requirements: [
      {
        cropId: 'tomato',
        varietyId: 'hybrid',
        quantityRequiredKg: 1000,
        offeredPricePerKg: 28,
        qualityGrade: 'Grade A'
      },
      {
        cropId: 'onion',
        varietyId: 'red',
        quantityRequiredKg: 2000,
        offeredPricePerKg: 24,
        qualityGrade: 'Grade A'
      }
    ]
  },
  {
    buyerId: 'demo_fresh_agro',
    name: 'Fresh Agro Traders',
    location: 'Nashik',
    isDemo: true,
    active: true,
    requirements: [
      {
        cropId: 'tomato',
        varietyId: 'hybrid',
        quantityRequiredKg: 500,
        offeredPricePerKg: 27,
        qualityGrade: 'Grade B'
      },
      {
        cropId: 'potato',
        varietyId: 'jyoti',
        quantityRequiredKg: 1500,
        offeredPricePerKg: 22,
        qualityGrade: 'Grade A'
      }
    ]
  },
  {
    buyerId: 'demo_local_veg',
    name: 'Local Vegetable Aggregator',
    location: 'Pimpalgaon',
    isDemo: true,
    active: true,
    requirements: [
      {
        cropId: 'tomato',
        varietyId: 'local',
        quantityRequiredKg: 700,
        offeredPricePerKg: 25,
        qualityGrade: 'Grade B'
      },
      {
        cropId: 'onion',
        varietyId: 'white',
        quantityRequiredKg: 1000,
        offeredPricePerKg: 26,
        qualityGrade: 'Grade A'
      }
    ]
  }
];

const getAllActiveBuyers = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      const buyers = await Buyer.find({ active: true }).lean();
      if (buyers && buyers.length > 0) {
        return buyers;
      }
    }
  } catch (err) {
    console.warn("Buyer DB Warning:", err.message);
  }
  
  // Return deterministic fallback mock data
  return DEMO_BUYERS;
};

module.exports = {
  getAllActiveBuyers,
  DEMO_BUYERS
};
