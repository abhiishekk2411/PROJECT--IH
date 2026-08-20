const Mandi = require('../../models/Mandi');
const MarketPrice = require('../../models/MarketPrice');

const getMarketsByCropAndLocation = async (cropId, location) => {
  // 1. Find all active mandis
  // In a real app with Map APIs, we would filter by geonear location.
  // For MVP, we'll return all seeded mandis (which are all in Nashik).
  const mandis = await Mandi.find({ active: true }).lean();
  
  if (!mandis || mandis.length === 0) {
    return [];
  }

  const mandiIds = mandis.map(m => m.mandiId);

  // 2. Find latest prices for this crop in these mandis
  const prices = await MarketPrice.find({
    cropId: cropId.toLowerCase(),
    mandiId: { $in: mandiIds }
  }).lean();

  // 3. Combine them
  const result = mandis.map(mandi => {
    // Find price for this mandi
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
