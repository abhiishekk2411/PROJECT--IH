/**
 * Crop Perishability Configuration
 * Deterministic configuration for the MVP Weather Risk module.
 */

const cropRiskConfig = {
  tomato: "high",
  onion: "medium",
  potato: "medium",
  wheat: "low",
  rice: "low",
  maize: "low",
  cotton: "low",
  soybean: "medium",
  chilli: "medium",
  brinjal: "high",
  cabbage: "high",
  cauliflower: "high"
};

const getCropPerishability = (cropId) => {
  if (!cropId) return "medium"; // default fallback
  return cropRiskConfig[cropId.toLowerCase()] || "medium";
};

module.exports = {
  cropRiskConfig,
  getCropPerishability
};
