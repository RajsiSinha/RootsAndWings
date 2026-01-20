// src/api/adoption.js

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Helper: Fetch with Timeout
// UPDATED: Increased default timeout to 15000ms (15 seconds)
const fetchWithTimeout = async (url, options = {}, timeout = 30000) => {
  const controller = new AbortController();
  let didTimeout = false;

  const id = setTimeout(() => {
    didTimeout = true;
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    // If our timeout fired, we know it's a timeout regardless of the error message
    if (didTimeout) {
      throw new Error('Request timed out. The server took too long to respond.');
    }
    // Otherwise it's a real abort or other error
    throw error;
  }
};

// 1. GET BOOKED DATES
export const getBookedDates = async (month) => {
  try {
    // If BASE_URL is missing, default to localhost
    const url = `${BASE_URL || 'http://localhost:5000'}/api/adoption/booked-dates?month=${month}`;

    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error('Failed to fetch booked dates');
    }

    return await response.json();
  } catch (error) {
    console.error("API Error (getBookedDates):", error);
    // Return empty structure so the calendar doesn't crash on network error
    return { bookedDays: [] };
  }
};

// 2. BOOK A VISIT
export const bookVisit = async (date, userId) => {
  try {
    const url = `${BASE_URL || 'http://localhost:5000'}/api/adoption/book`;
    const data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, userId }),
    };

    // This request was timing out before. 
    // Now it has 15 seconds to complete.
    const response = await fetchWithTimeout(url, data);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to book visit');
    }

    return await response.json();
  } catch (error) {
    console.error("API Error (bookVisit):", error);
    throw error;
  }
};

// 3. GET IMPACT RATES
export const getImpactRates = async () => {
  try {
    const url = `${BASE_URL || 'http://localhost:5000'}/api/adoption/impact-rates`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) throw new Error('Failed to fetch impact rates');
    return await response.json();
    return await response.json();
  } catch (error) {
    // Fail silently with default values
    return { mealCost: 50, supplementCost: 15, educationCost: 200 };
  }
};

// 4. GET USER ADOPTIONS
export const getUserAdoptions = async (userId) => {
  try {
    const url = `${BASE_URL || 'http://localhost:5000'}/api/adoption/user/${userId}`;
    const response = await fetchWithTimeout(url);

    if (!response.ok) throw new Error('Failed to fetch user adoptions');
    return await response.json();
  } catch (error) {
    console.error("API Error (getUserAdoptions):", error);
    return [];
  }
};