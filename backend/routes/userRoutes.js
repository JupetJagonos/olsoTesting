const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    getServices,
    bookService,
    viewAppointments,
    updateProfile,
    getUserActivities, // Should be used for fetching recent activities
    getUpcomingBookings, // For fetching upcoming bookings
    getRecentBookingsForProvider // This will fetch recent completed bookings for providers
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

// Get User Activities (Recent Activities)
router.get('/activities', auth(['Client', 'Provider']), getUserActivities);

// Get Upcoming Bookings
router.get('/upcoming-bookings', auth(['Client', 'Provider']), getUpcomingBookings); // Ensure this is available

router.get('/recent-bookings', auth(['Provider']), getRecentBookingsForProvider);

module.exports = router; // Export router