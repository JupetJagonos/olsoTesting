const express = require('express');
const {
    createAppointment,
    getUserAppointments,
    getUpcomingBookingsForProvider,
    getRecentBookingsForProvider,
    updateBookingStatus,
} = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

const router = express.Router(); // Initialize the router

// Create an Appointment
router.post('/', auth(['Client']), createAppointment);

// Get User Appointments
router.get('/', auth(['Client', 'Provider']), getUserAppointments);

// Ensure this upcoming bookings route is defined
router.get('/upcoming', auth(['Provider']), getUpcomingBookingsForProvider); // For providers' upcoming bookings

// Get Recent Bookings for Provider
router.get('/recent', auth(['Provider']), getRecentBookingsForProvider); // Fetch recent bookings for providers


router.put('/:id/status', auth(['Provider']), updateBookingStatus); 

module.exports = router; // Export the router