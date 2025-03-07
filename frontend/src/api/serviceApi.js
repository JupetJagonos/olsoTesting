// src/api/serviceApi.js

import axios from 'axios';

// Base URL for your API. Adjust as necessary based on your backend setup.
const API_URL = 'http://localhost:5001/api/services';

// Function to fetch all services
export const fetchAllServices = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the array of services
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error; // Rethrow the error to handle it in the calling component
    }
};

// Function to create a new service
export const createService = async (serviceData, token) => {
    try {
        const response = await axios.post(API_URL, serviceData, {
            headers: {
                Authorization: `Bearer ${token}` // Attach the token
            }
        });
        return response.data; // Return the created service
    } catch (error) {
        console.error('Error creating service:', error);
        throw error; // Rethrow the error for handling
    }
};

// Function to fetch a specific service by ID
export const fetchServiceById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; // Return the service details
    } catch (error) {
        console.error('Error fetching service by ID:', error);
        throw error; // Rethrow the error for handling
    }
};

// Function to update a service
export const updateService = async (id, serviceData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, serviceData, {
            headers: {
                Authorization: `Bearer ${token}` // Attach the token
            }
        });
        return response.data; // Return the updated service
    } catch (error) {
        console.error('Error updating service:', error);
        throw error; // Rethrow the error for handling
    }
};

// Function to delete a service
export const deleteService = async (id, token) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` // Attach the token
            }
        });
        return true; // Return true if deletion was successful
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error; // Rethrow the error for handling
    }
};