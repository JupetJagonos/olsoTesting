const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Log JWT_SECRET for debugging
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Import Routes
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes); // Add auth middleware if needed: auth(['Provider'])
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

// Serve React app for non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5001; // Align with proxy port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});