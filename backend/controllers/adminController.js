const User = require('../models/User'); // Import the User model
const Service = require('../models/Service'); // Import the Service model
const Appointment = require('../models/Appointment'); // Import the Appointment model

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('user service');
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get stats (like count of users, services and appointments, if needed)
const getStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const serviceCount = await Service.countDocuments();
        const appointmentCount = await Appointment.countDocuments();

        res.status(200).json({
            userCount,
            serviceCount,
            appointmentCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllUsers,
    deleteUser, // Ensure this is correctly exported
    getAllServices,
    getAllAppointments,
};