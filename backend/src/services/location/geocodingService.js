/**
 * Geocoding Service using Nominatim (OpenStreetMap)
 * Includes a simple in-memory cache to prevent redundant API calls.
 */

// Simple in-memory cache
const locationCache = new Map();

const COMMON_LOCATIONS = {
  'nashik': { latitude: 20.0059, longitude: 73.7903, displayName: 'नाशिक (Nashik)' },
  'नाशिक': { latitude: 20.0059, longitude: 73.7903, displayName: 'नाशिक (Nashik)' },
  'nasik': { latitude: 20.0059, longitude: 73.7903, displayName: 'नाशिक (Nashik)' },
  'pune': { latitude: 18.5204, longitude: 73.8567, displayName: 'पुणे (Pune)' },
  'पुणे': { latitude: 18.5204, longitude: 73.8567, displayName: 'पुणे (Pune)' },
  'mumbai': { latitude: 19.0760, longitude: 72.8777, displayName: 'मुंबई (Mumbai)' },
  'मुंबई': { latitude: 19.0760, longitude: 72.8777, displayName: 'मुंबई (Mumbai)' },
  'delhi': { latitude: 28.7041, longitude: 77.1025, displayName: 'दिल्ली (Delhi)' },
  'दिल्ली': { latitude: 28.7041, longitude: 77.1025, displayName: 'दिल्ली (Delhi)' }
};

const geocodeLocation = async (locationText) => {
  if (!locationText || typeof locationText !== 'string') {
    throw new Error("कृपया एक सही स्थान दर्ज करें।");
  }

  const normalizedInput = locationText.trim().toLowerCase();

  // 1. Check Predefined Common Locations first (Ultra-fast & safe for demo)
  if (COMMON_LOCATIONS[normalizedInput]) {
    return COMMON_LOCATIONS[normalizedInput];
  }

  // 2. Check cache
  if (locationCache.has(normalizedInput)) {
    return locationCache.get(normalizedInput);
  }

  // 3. Fetch from Nominatim
  try {
    const query = encodeURIComponent(normalizedInput);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
    // Add a reasonable timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'FasalNirnay-DemoApp/1.0 (Contact: demo@fasalnirnay.test)',
        'Accept': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Nominatim API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error(`Location not found: "${locationText}"`);
    }

    const result = {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      displayName: data[0].display_name
    };

    // 4. Store in cache
    locationCache.set(normalizedInput, result);

    return result;

  } catch (error) {
    console.error("Geocoding Error:", error.message);
    
    // Farmer-friendly Hindi errors
    if (error.message.includes("Location not found")) {
       throw new Error(`आपके स्थान (${locationText}) की जानकारी नहीं मिल पाई। कृपया किसी बड़े शहर या ज़िले का नाम (जैसे: नाशिक) दर्ज करें।`);
    }
    
    throw new Error(`आपके स्थान (${locationText}) का पता लगाने में तकनीकी समस्या आई। कृपया नाशिक या पुणे जैसे शहर का नाम आज़माएं।`);
  }
};

module.exports = {
  geocodeLocation
};
