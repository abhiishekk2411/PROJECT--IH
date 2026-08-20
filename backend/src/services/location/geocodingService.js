/**
 * Geocoding Service using Nominatim (OpenStreetMap)
 * Includes a simple in-memory cache to prevent redundant API calls.
 */

// Simple in-memory cache
const locationCache = new Map();

const geocodeLocation = async (locationText) => {
  if (!locationText || typeof locationText !== 'string') {
    throw new Error("Invalid location text provided for geocoding.");
  }

  const normalizedInput = locationText.trim().toLowerCase();

  // 1. Check cache
  if (locationCache.has(normalizedInput)) {
    return locationCache.get(normalizedInput);
  }

  // 2. Fetch from Nominatim
  try {
    const query = encodeURIComponent(normalizedInput);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'FasalNirnay-DemoApp/1.0 (Contact: demo@fasalnirnay.test)',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error(`Location not found: "${locationText}"`);
    }

    const result = {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      displayName: data[0].display_name
    };

    // 3. Store in cache
    locationCache.set(normalizedInput, result);

    return result;

  } catch (error) {
    console.error("Geocoding Error:", error.message);
    throw new Error("Geocoding failed: " + error.message);
  }
};

module.exports = {
  geocodeLocation
};
