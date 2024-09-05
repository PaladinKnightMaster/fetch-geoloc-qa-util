const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

const getGeoData = async (location) => {
  let url;
  if (/\d{5}/.test(location)) {
    url = `http://api.openweathermap.org/geo/1.0/zip?zip=${location},US&appid=${API_KEY}`;
  } else {
    const [city, state] = location.split(",");
    url = `http://api.openweathermap.org/geo/1.0/direct?q=${city.trim()},${state.trim()},US&appid=${API_KEY}`;
  }
  try {
    const response = await axios.get(url);
    if (!response.data || response.data.length === 0) {
      throw new Error("Location not found or invalid response");
    }

    const locationData = Array.isArray(response.data)
      ? response.data[0]
      : response.data;

    return {
      name: locationData.name || locationData.zip || "Unknown",
      lat: locationData.lat,
      lon: locationData.lon,
    };
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(
        `Error fetching data for ${location}:`,
        "Rate limit exceeded"
      );
    } else {
      console.error(
        `Error fetching data for ${location}:`,
        error.message || "Unknown error"
      );
    }
  }
};

module.exports = { getGeoData };
