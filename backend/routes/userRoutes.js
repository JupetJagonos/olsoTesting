const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    getServices,
    bookService,
    viewAppointments,
    updateProfile,
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

// Update User Profile
router.put('/profile', auth(['Client', 'Provider']), updateProfile);

module.exports = router; // Export router