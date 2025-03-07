import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users'; // Adjust based on your backend setup

// User registration
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// User login
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

// Fetch all users (if needed)
export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};
