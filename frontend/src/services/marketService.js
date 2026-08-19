// ============================================================================
// Market Service — FasalNirnay Frontend
// ============================================================================
// Handles market/mandi data: prices, trends, mandi list.
// Currently returns mock data. Replace with backend calls when ready.
// ============================================================================

import { mandiList, priceHistory, trendSummary } from '../data/mockData';

/**
 * Get nearby mandis with current prices for a given crop and location.
 * TODO: Replace with GET /api/markets?crop=Tomato&location=Nashik
 * @param {string} crop
 * @param {string} location
 * @returns {Array} List of mandis with price data
 */
export async function getMarketData(crop, location) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mandiList;
}

/**
 * Get historical price trend for a crop at a specific mandi.
 * TODO: Replace with GET /api/markets/trend?crop=Tomato&mandi=Pimpalgaon&days=30
 * @param {string} crop
 * @param {string} mandiId
 * @param {number} days
 * @returns {Object} { history: [], summary: {} }
 */
export async function getPriceTrend(crop, mandiId, days = 30) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { history: priceHistory, summary: trendSummary };
}

/**
 * Get price for a specific mandi.
 * TODO: Replace with GET /api/markets/:mandiId/price
 * @param {string} mandiId
 * @returns {Object} Current price data
 */
export async function getMandiPrice(mandiId) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const mandi = mandiList.find((m) => m.id === mandiId);
  return mandi || null;
}
