const express = require('express');
const {
    createAppointment,
    getUpcomingBookingsForProvider,
    getRecentBookingsForProvider,
    getUpcomingBookingsForClient,
    getRecentBookingsForClient,
    updateAppointmentStatus,
} = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

const router = express.Router();

// Define routes for appointment functionalities
router.post('/bookings', auth(['Client']), createAppointment);
router.get('/provider/upcoming', auth(['Provider']), getUpcomingBookingsForProvider);
router.get('/provider/recent', auth(['Provider']), getRecentBookingsForProvider);
router.get('/client/upcoming', auth(['Client']), getUpcomingBookingsForClient);
router.get('/client/recent', auth(['Client']), getRecentBookingsForClient);
router.put('/status', auth(['Provider']), updateAppointmentStatus);

module.exports = router;