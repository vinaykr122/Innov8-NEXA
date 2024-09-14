// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend server URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};