/**
 * Weather Service using OpenWeatherMap
 * Fetches the 5-day / 3-hour forecast and extracts 24-hour relevant data safely.
 */

const getWeatherForecast = async (latitude, longitude) => {
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!API_KEY) {
    console.warn("Weather Service: OPENWEATHER_API_KEY is missing. Returning fallback.");
    return {
      available: false,
      riskLevel: "unknown",
      reason: "Weather service unavailable"
    };
  }

  if (latitude == null || longitude == null) {
    return {
      available: false,
      riskLevel: "unknown",
      reason: "Invalid coordinates provided"
    };
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    
    // Add a reasonable timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const response = await fetch(url, { signal: controller.signal });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenWeather API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.list || data.list.length === 0) {
      throw new Error("Invalid response format from weather API");
    }

    // Take the first 8 intervals (24 hours, as each interval is 3 hours)
    const forecast24h = data.list.slice(0, 8);

    let maxPop = 0;
    let totalRain = 0;
    let maxTemp = -100;

    forecast24h.forEach(interval => {
      // pop is probability of precipitation (0 to 1)
      if (interval.pop != null && interval.pop > maxPop) {
        maxPop = interval.pop;
      }
      // Rain volume for last 3 hours
      if (interval.rain && interval.rain['3h']) {
        totalRain += interval.rain['3h'];
      }
      if (interval.main && interval.main.temp_max > maxTemp) {
        maxTemp = interval.main.temp_max;
      }
    });

    return {
      available: true,
      rainProbability: Math.round(maxPop * 100), // Convert to percentage
      rainMm: Math.round(totalRain * 10) / 10,
      temperature: Math.round(maxTemp),
      forecastHours: 24
    };

  } catch (error) {
    console.error("Weather Service Error:", error.message);
    return {
      available: false,
      riskLevel: "unknown",
      reason: "Weather service unavailable"
    };
  }
};

module.exports = {
  getWeatherForecast
};
