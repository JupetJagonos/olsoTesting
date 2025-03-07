const express = require('express');
const { createAppointment, getUserAppointments } = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

const router = express.Router(); // Initialize the router

// Create an Appointment
router.post('/', auth(['Client']), createAppointment);

// Get User Appointments
router.get('/', auth(['Client']), getUserAppointments);

module.exports = router; // Export the router