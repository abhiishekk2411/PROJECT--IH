// ============================================================================
// Decision Service — FasalNirnay Frontend
// ============================================================================
// Decision Service
// ============================================================================
// Communicates with the backend decision endpoints.
// ============================================================================

import { apiRequest } from './api';

export const analyzeDecision = async (formData) => {
  const result = await apiRequest('/decision/analyze', {
    method: 'POST',
    body: JSON.stringify({
      cropId: formData.crop?.toLowerCase() || formData.cropId,
      varietyId: formData.variety?.toLowerCase() || formData.varietyId,
      quantityKg: Number(formData.quantity) || formData.quantityKg,
      location: formData.location || formData.farmerLocation
    })
  });
  return result.data;
};

export const getMarketTrend = async (cropId, mandiId, varietyId, days = 30) => {
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
};

export const getDashboard = async () => {
  const result = await apiRequest('/dashboard');
  return result.data;
};

export const getHistory = async (limit = 20) => {
  const result = await apiRequest(`/history?limit=${limit}`);
  return result.data;
};

export const analyzeImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('http://localhost:5000/api/vision/analyze', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Failed to analyze image');
    }
    return result;
  } catch (error) {
    throw error;
  }
};
