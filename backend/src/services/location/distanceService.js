/**
 * Pure Haversine Distance Service
 * Calculates approximate straight-line distance between two coordinates in kilometers.
 */

const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    throw new Error("Invalid coordinates provided for distance calculation.");
  }

  const toRadians = (deg) => deg * (Math.PI / 180);

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = R * c;

  // Round to 1 decimal place
  return Math.round(distance * 10) / 10;
};

module.exports = {
  calculateHaversineDistance
};
