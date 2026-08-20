/**
 * Pure Business Logic Module for Historical Price Trend Analysis
 * Isolated from controllers. No ML forecasting used.
 */

const calculateTrend = (historicalPrices) => {
  if (!historicalPrices || historicalPrices.length === 0) {
    throw new Error("No historical data provided");
  }

  // Sort prices by date ascending to ensure chronological order
  const sortedPrices = [...historicalPrices].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const startingPrice = sortedPrices[0].price;
  const latestPrice = sortedPrices[sortedPrices.length - 1].price;
  
  // Calculate percentage change
  const percentageChange = ((latestPrice - startingPrice) / startingPrice) * 100;
  
  // Calculate min/max for estimated range
  const prices = sortedPrices.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Classification Rule
  let trend = "stable";
  if (percentageChange > 3) {
    trend = "increasing";
  } else if (percentageChange < -3) {
    trend = "decreasing";
  }

  // Optional: 7-day moving average comparison could be added here
  // For MVP, we stick to the overall window change to classify trend.

  return {
    trend,
    percentageChange: parseFloat(percentageChange.toFixed(2)),
    estimatedRange: {
      min: minPrice,
      max: maxPrice
    },
    windowDays: sortedPrices.length,
    priceHistory: sortedPrices.map(p => {
      const d = new Date(p.date);
      return {
        date: `${d.getMonth() + 1}/${d.getDate()}`, // Format as MM/DD
        price: p.price
      };
    })
  };
};

module.exports = {
  calculateTrend
};
