/**
 * Pure Transport Cost Service
 * Deterministic MVP logic based on demo quantity brackets.
 * 
 * DEMO ASSUMPTIONS:
 * <= 500 kg  → ₹4/km
 * 501–1000 kg → ₹5/km
 * > 1000 kg → ₹6/km
 */

const calculateTransportCost = (distanceKm, quantityKg) => {
  if (distanceKm == null || distanceKm < 0) {
    throw new Error("Invalid distance provided.");
  }
  if (quantityKg == null || quantityKg <= 0) {
    throw new Error("Invalid quantity provided.");
  }

  let ratePerKm = 0;

  if (quantityKg <= 500) {
    ratePerKm = 4;
  } else if (quantityKg <= 1000) {
    ratePerKm = 5;
  } else {
    ratePerKm = 6;
  }

  // Cost = distance * rate
  // Note: We do NOT multiply by quantity again. The bracket sets the vehicle rate.
  const cost = distanceKm * ratePerKm;

  // Round to nearest rupee
  return Math.round(cost);
};

module.exports = {
  calculateTransportCost
};
