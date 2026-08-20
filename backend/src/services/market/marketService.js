const Mandi = require('../../models/Mandi');
const MarketPrice = require('../../models/MarketPrice');
const mongoose = require('mongoose');

const FALLBACK_MANDIS = [
  { mandiId: 'pimpalgaon', name: 'Pimpalgaon Mandi', city: 'Pimpalgaon', state: 'Maharashtra', latitude: 20.1700, longitude: 73.9800, active: true },
  { mandiId: 'lasalgaon', name: 'Lasalgaon Mandi', city: 'Lasalgaon', state: 'Maharashtra', latitude: 20.1400, longitude: 74.2200, active: true },
  { mandiId: 'sinnar', name: 'Sinnar Mandi', city: 'Sinnar', state: 'Maharashtra', latitude: 19.8400, longitude: 73.9900, active: true },
  { mandiId: 'dindori', name: 'Dindori Mandi', city: 'Dindori', state: 'Maharashtra', latitude: 20.2000, longitude: 73.8200, active: true },
  { mandiId: 'manmad', name: 'Manmad Mandi', city: 'Manmad', state: 'Maharashtra', latitude: 20.2500, longitude: 74.4400, active: true }
];

const FALLBACK_PRICES = [
  { cropId: 'tomato', mandiId: 'pimpalgaon', varietyId: 'hybrid', price: 24, unit: 'kg' },
  { cropId: 'tomato', mandiId: 'lasalgaon', varietyId: 'hybrid', price: 22, unit: 'kg' },
  { cropId: 'tomato', mandiId: 'sinnar', varietyId: 'hybrid', price: 21, unit: 'kg' },
  { cropId: 'tomato', mandiId: 'dindori', varietyId: 'hybrid', price: 18, unit: 'kg' },
  { cropId: 'tomato', mandiId: 'manmad', varietyId: 'hybrid', price: 26, unit: 'kg' }
];

const getMarketsByCropAndLocation = async (cropId, location) => {
  let mandis = [];
  let prices = [];

  try {
    if (mongoose.connection.readyState === 1) {
      mandis = await Mandi.find({ active: true }).lean();
      if (mandis && mandis.length > 0) {
        const mandiIds = mandis.map(m => m.mandiId);
        prices = await MarketPrice.find({
          cropId: cropId.toLowerCase(),
          mandiId: { $in: mandiIds }
        }).lean();
      }
    }
  } catch (err) {
    console.warn("DB Query Warning in marketService:", err.message);
  }

  // Fallback to static seed data if DB is empty or disconnected
  if (!mandis || mandis.length === 0) {
    mandis = FALLBACK_MANDIS;
  }
  if (!prices || prices.length === 0) {
    prices = FALLBACK_PRICES.filter(p => p.cropId === cropId.toLowerCase());
  }

  // Combine them
  const result = mandis.map(mandi => {
    const mandiPrice = prices.find(p => p.mandiId === mandi.mandiId);
    if (mandiPrice) {
      return {
        mandiId: mandi.mandiId,
        mandiName: mandi.name,
        latitude: mandi.latitude,
        longitude: mandi.longitude,
        cropId: mandiPrice.cropId,
        varietyId: mandiPrice.varietyId,
        price: mandiPrice.price,
        unit: mandiPrice.unit
      };
    }
    return null;
  }).filter(item => item !== null);

  return result;
};

module.exports = {
  getMarketsByCropAndLocation
};
