const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Ensure you have a proper connection

dotenv.config(); // Load environment variables from .env file

// Check the JWT secret environment variable
console.log('JWT_SECRET:', process.env.JWT_SECRET); 

// Importing Routes
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler'); // Custom error handling middleware

// Connect to MongoDB
connectDB();

const app = express(); // Create an Express application

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Basic test route
app.get("/", (req, res) => {
    res.send("BACK END - OLSO"); // Confirm the backend is running
});

// Route Definitions for the API
app.use('/api/users', userRoutes); // User related routes
app.use('/api/services', serviceRoutes); // Service related routes
app.use('/api/appointments', appointmentRoutes); // Appointment related routes
app.use('/api/reviews', reviewRoutes); // Review related routes
app.use('/api/admin', adminRoutes); // Admin related routes

// Error Handling Middleware
app.use(errorHandler); // Use this for handling errors across your API

// Starting the server
const PORT = process.env.PORT || 5001; // Use either the specified PORT or default to 5001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log confirmation of server start
});