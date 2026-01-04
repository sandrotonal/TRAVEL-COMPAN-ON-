import axios from 'axios';

// Base URLs
const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1';
const OPEN_METEO_URL = 'https://api.open-meteo.com/v1';
const FRANKFURTER_URL = 'https://api.frankfurter.app';

// REST Countries Service
export const countryService = {
  getAllCountries: async () => {
    try {
      // Fetching all needed fields to minimize data transfer
      const response = await axios.get(`${REST_COUNTRIES_URL}/all?fields=name,flags,region,capital,population,currencies,latlng,cca3`);
      return response.data;
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  },
  getCountryByCode: async (code) => {
    try {
      const response = await axios.get(`${REST_COUNTRIES_URL}/alpha/${code}`);
      return response.data[0];
    } catch (error) {
      console.error(`Error fetching country ${code}:`, error);
      throw error;
    }
  },
  searchCountries: async (name) => {
    try {
      const response = await axios.get(`${REST_COUNTRIES_URL}/name/${name}`);
      return response.data;
    } catch (error) {
       // 404 is common for search
      if (error.response && error.response.status === 404) return [];
      console.error(`Error searching country ${name}:`, error);
      throw error;
    }
  }
};

// Open-Meteo Service
export const weatherService = {
  getWeather: async (lat, lng) => {
    try {
      const response = await axios.get(`${OPEN_METEO_URL}/forecast`, {
        params: {
          latitude: lat,
          longitude: lng,
          current_weather: true,
          temperature_unit: 'celsius'
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  }
};

// Frankfurter Service
export const currencyService = {
  getRates: async (from = 'USD') => {
    try {
      const response = await axios.get(`${FRANKFURTER_URL}/latest`, {
        params: { from }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching rates:", error);
      throw error;
    }
  },
  convert: async (amount, from, to) => {
    try {
      const response = await axios.get(`${FRANKFURTER_URL}/latest`, {
        params: { amount, from, to }
      });
      return response.data;
    } catch (error) {
      console.error("Error converting currency:", error);
      throw error;
    }
  }
};
