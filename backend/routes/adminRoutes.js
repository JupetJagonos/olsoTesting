const express = require('express');
const {
    getAllUsers,
    deleteUser, // Make sure this is properly defined in your adminController
    getAllServices,
    getAllAppointments,
} = require('../controllers/adminController'); // Ensure the path is correct

const auth = require('../middleware/auth');

const router = express.Router();

// Get all users
router.get('/users', auth(['Admin']), getAllUsers);

// Delete a user by ID
router.delete('/users/:id', auth(['Admin']), deleteUser); // Ensure 'deleteUser' is defined correctly

// Get all services
router.get('/services', auth(['Admin']), getAllServices);

// Get all appointments
router.get('/appointments', auth(['Admin']), getAllAppointments);

module.exports = router;