import axios from 'axios';

const exchangeApi = axios.create({
  baseURL: 'https://api.exchangerate-api.com/v4/latest',
  timeout: 10000,
});

let cachedRates = {};
let lastFetchCurrency = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 60 * 1000;

export async function fetchExchangeRates(baseCurrency = 'INR') {
  const now = Date.now();

  if (
    lastFetchCurrency === baseCurrency &&
    now - lastFetchTime < CACHE_DURATION &&
    Object.keys(cachedRates).length > 0
  ) {
    return cachedRates;
  }

  try {
    const response = await exchangeApi.get(`/${baseCurrency}`);
    cachedRates = response.data.rates || {};
    lastFetchCurrency = baseCurrency;
    lastFetchTime = now;
    return cachedRates;
  } catch (error) {
    console.error('Exchange rate API error:', error.message);
    if (Object.keys(cachedRates).length > 0) {
      return cachedRates;
    }
    return null;
  }
}
