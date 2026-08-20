// ============================================================================
// Decision Service — FasalNirnay Frontend
// ============================================================================
// Handles the core decision analysis: ranked mandis, sell now vs wait, weather.
// Currently returns mock data. Replace with backend calls when ready.
// ============================================================================

import { apiRequest } from './api';

/**
 * Analyze crop and get the full decision recommendation.
 * Triggers the Decision Engine on the backend.
 * @param {Object} cropData - { crop, variety, quantity, unit, location }
 * @returns {Object} Full recommendation with ranked mandis, explanation, weather, etc.
 */
export async function analyzeDecision(cropData) {
  const payload = {
    cropId: cropData.crop.toLowerCase(),
    varietyId: cropData.variety.toLowerCase(),
    quantityKg: Number(cropData.quantity),
    location: cropData.location
  };

  const response = await apiRequest('/decision/analyze', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return response.data;
}

/**
 * Get historical price trend for a specific market and crop.
 * @param {string} cropId
 * @param {string} mandiId
 * @param {string} varietyId
 * @param {number} days
 * @returns {Object} Trend data including priceHistory
 */
export async function getMarketTrend(cropId, mandiId, varietyId, days = 30) {
  const queryParams = new URLSearchParams({
    crop: cropId.toLowerCase(),
    mandi: mandiId.toLowerCase(),
    variety: varietyId.toLowerCase(),
    days: days.toString()
  });

  const response = await apiRequest(`/markets/trend?${queryParams.toString()}`, {
    method: 'GET'
  });

  return response.data;
}


