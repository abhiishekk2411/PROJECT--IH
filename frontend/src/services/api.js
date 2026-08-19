// ============================================================================
// API Base Configuration — FasalNirnay Frontend
// ============================================================================
// This file provides the base API client for communicating with the backend.
// Currently returns mock data. Replace implementations when backend is ready.
// ============================================================================

const BASE_URL = '/api';

/**
 * Generic API request helper.
 * TODO: Replace with actual fetch/axios calls when backend is ready.
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  // TODO: Uncomment when backend is ready
  // const response = await fetch(url, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     ...options.headers,
  //   },
  //   ...options,
  // });
  // if (!response.ok) {
  //   throw new Error(`API Error: ${response.status}`);
  // }
  // return response.json();

  // For now, simulate a small network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return null; // Individual services return mock data
}

export default { apiRequest };
