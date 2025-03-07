const Appointment = require('../models/Appointment');

// Create an Appointment
const createAppointment = async (req, res) => {
    const { service, date } = req.body;
    const userId = req.user.id;

    try {
        const appointment = new Appointment({ user: userId, service, date });
        await appointment.save();
        return res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get User Appointments with lean to optimize the query
const getUserAppointments = async (req, res) => {
    const userId = req.user.id;

    try {
        const appointments = await Appointment.find({ user: userId })
            .lean() // Use lean() for optimized memory usage
            .populate('service');
        return res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createAppointment,
    getUserAppointments,
};