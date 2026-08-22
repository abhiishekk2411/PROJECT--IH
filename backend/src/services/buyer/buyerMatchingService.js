const { calculateHaversineDistance } = require('../location/distanceService');
const { geocodeLocation } = require('../location/geocodingService');

const findMatches = async (farmerCrop, farmerVariety, farmerQuantityKg, farmerLocationCoords, buyers) => {
  const matches = [];

  for (const buyer of buyers) {
    // Check if buyer has any requirements matching the crop
    const matchingReqs = buyer.requirements.filter(req => req.cropId === farmerCrop);
    
    for (const req of matchingReqs) {
      // 1. Variety check (bonus points if exact match, but allow fallback if variety isn't strict)
      const varietyMatch = req.varietyId === farmerVariety;
      if (!varietyMatch && req.varietyId !== 'any') {
        continue; // Skip if variety doesn't match and buyer is strict
      }

      // 2. Quantity check (farmer should be able to supply at least 20% of requirement to be considered)
      if (farmerQuantityKg < (req.quantityRequiredKg * 0.2)) {
        continue; // Too little quantity
      }

      // 3. Distance check
      let distanceKm = 0;
      try {
        const buyerCoords = await geocodeLocation(buyer.location);
        distanceKm = calculateHaversineDistance(
          farmerLocationCoords.latitude, 
          farmerLocationCoords.longitude, 
          buyerCoords.latitude, 
          buyerCoords.longitude
        );
      } catch (err) {
        // Fallback distance if geocoding fails
        distanceKm = Math.floor(Math.random() * 50) + 10;
      }

      // Skip if buyer is too far (> 200km)
      if (distanceKm > 200) {
        continue;
      }

      // Calculate a simple match score (0-100)
      let matchScore = 50;
      if (varietyMatch) matchScore += 20;
      if (farmerQuantityKg >= (req.quantityRequiredKg * 0.8)) matchScore += 20; // Good quantity match
      if (distanceKm < 50) matchScore += 10;

      matches.push({
        buyerId: buyer.buyerId,
        buyerName: buyer.name,
        isDemo: buyer.isDemo,
        buyerLocation: buyer.location,
        cropId: req.cropId,
        varietyId: req.varietyId,
        quantityRequiredKg: req.quantityRequiredKg,
        offerPrice: req.offeredPricePerKg,
        qualityGrade: req.qualityGrade,
        distanceKm,
        matchScore
      });
    }
  }

  // Sort by highest score, then highest price
  return matches.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    return b.offerPrice - a.offerPrice;
  });
};

module.exports = {
  findMatches
};
