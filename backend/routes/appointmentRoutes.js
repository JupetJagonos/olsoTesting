const express = require('express');
const {
    createAppointment,
    getUserAppointments,
    getUpcomingBookingsForProvider,
    getRecentBookingsForProvider, // Ensure this is imported
    updateBookingStatus,
} = require('../controllers/appointmentController'); // All functions from appointmentController should be available
const auth = require('../middleware/auth');

const router = express.Router();

// Verify all routes are defined appropriately
router.post('/bookings', auth(['Client']), createAppointment);
router.get('/appointments', auth(['Client', 'Provider']), getUserAppointments);
router.get('/upcoming', auth(['Provider']), getUpcomingBookingsForProvider);
router.get('/recent', auth(['Provider']), getRecentBookingsForProvider); // Ensure this function exists in the controller
router.put('/:id/status', auth(['Provider']), updateBookingStatus);

module.exports = router;