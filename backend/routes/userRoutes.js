const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    getServices,
    bookService,
    viewAppointments,
    updateProfile,
    getUserActivities,
    getUpcomingBookings, // Ensure this new function is imported
} = require('../controllers/userController'); 
const auth = require('../middleware/auth'); // Import the auth middleware

const router = express.Router();

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Get User Profile
router.get('/profile', auth(['Client', 'Provider']), getUserProfile);

// Get All Services
router.get('/services', getServices);

// Book a Service
router.post('/book', auth(['Client']), bookService);

// View User's Appointments
router.get('/appointments', auth(['Client', 'Provider']), viewAppointments);

// Get Upcoming Bookings
router.get('/upcoming-bookings', auth(['Client', 'Provider']), getUpcomingBookings); // New route for upcoming bookings

// Update User Profile
router.put('/profile', auth(['Client']), updateProfile);

// Get User Activities
router.get('/activities', auth(['Client', 'Provider']), getUserActivities);

module.exports = router; // Export router