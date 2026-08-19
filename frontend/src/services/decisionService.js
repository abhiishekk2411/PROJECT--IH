// ============================================================================
// Decision Service — FasalNirnay Frontend
// ============================================================================
// Handles the core decision analysis: ranked mandis, sell now vs wait, weather.
// Currently returns mock data. Replace with backend calls when ready.
// ============================================================================

import { recommendation, weatherData, mandiList } from '../data/mockData';

/**
 * Analyze crop and get the full decision recommendation.
 * This is the primary API call that triggers the Decision Engine on the backend.
 * TODO: Replace with POST /api/decision/analyze
 * @param {Object} cropData - { crop, variety, quantity, unit, location, imageFile }
 * @returns {Object} Full recommendation with ranked mandis, explanation, weather, etc.
 */
export async function analyzeDecision(cropData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    recommendation,
    rankedMandis: mandiList,
    weather: weatherData,
  };
}

/**
 * Get weather risk for a location.
 * TODO: Replace with GET /api/weather?location=Nashik
 * @param {string} location
 * @returns {Object} Weather data with risk assessment
 */
export async function getWeather(location) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return weatherData;
}

/**
 * Get a specific past decision by ID.
 * TODO: Replace with GET /api/decisions/:id
 * @param {string} decisionId
 * @returns {Object} Decision details
 */
export async function getDecision(decisionId) {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return recommendation;
}
