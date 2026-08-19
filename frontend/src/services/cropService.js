// ============================================================================
// Crop Service — FasalNirnay Frontend
// ============================================================================
// Handles crop-related API calls: crop options, image upload, crop analysis.
// Currently returns mock data. Replace with backend calls when ready.
// ============================================================================

import { cropOptions, imageAnalysis } from '../data/mockData';

/**
 * Get available crop options for the dropdown.
 * TODO: Replace with GET /api/crops
 */
export async function getCropOptions() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return cropOptions;
}

/**
 * Upload a crop image for analysis.
 * TODO: Replace with POST /api/crops/analyze-image (multipart/form-data)
 * @param {File} imageFile - The crop image file
 * @returns {Object} Image analysis result
 */
export async function uploadCropImage(imageFile) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return imageAnalysis;
}

/**
 * Submit crop details for the decision pipeline.
 * TODO: Replace with POST /api/crops/submit
 * @param {Object} cropData - { crop, variety, quantity, unit, location, imageFile }
 * @returns {Object} Submitted crop lot ID
 */
export async function submitCropDetails(cropData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { id: 'crop-lot-001', status: 'submitted' };
}
