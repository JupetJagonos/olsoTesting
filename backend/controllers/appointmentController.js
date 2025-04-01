const Appointment = require('../models/Appointment');

// Create an Appointment
const createAppointment = async (req, res) => {
    const { serviceId, hours, date, time } = req.body; // Expecting these fields from the request
    const userId = req.user.id; // Get user ID from JWT token

    try {
        const appointment = new Appointment({
            user: userId,
            service: serviceId,
            hours: hours,
            date: new Date(date), // Ensure date is properly formatted
            time: time,
            status: 'Pending', // Default status for new appointment
        });

        await appointment.save(); // Save appointment to the database
        return res.status(201).json(appointment); // Respond with the created appointment
    } catch (error) {
        console.error('Error creating appointment:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get User Appointments
const getUserAppointments = async (req, res) => {
    const userId = req.user.id; // Get user ID from JWT token

    try {
        const appointments = await Appointment.find({ user: userId })
            .populate('service') // Populate the service details
            .lean();
        return res.status(200).json(appointments); // Return list of user appointments
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Booking Status
const updateBookingStatus = async (req, res) => {
    const { status } = req.body; // New status from request body
    const { id } = req.params; // Appointment ID from URL params

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { status }, // Update status
            { new: true } // Return the updated document
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        return res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Error updating booking status:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Get Upcoming Bookings for Provider
const getUpcomingBookingsForProvider = async (req, res) => {
    const providerId = req.user.id; // Capture the provider ID from JWT

    try {
        const bookings = await Appointment.find({
            date: { $gte: new Date() }, // Fetch future bookings
        })
        .populate('service') // Populate service details
        .populate('user', 'name') // Optionally populate user field
        .lean();

        const upcomingBookings = bookings.filter(booking => booking.service.provider.toString() === providerId);
        return res.status(200).json(upcomingBookings); // Send the response
    } catch (error) {
        console.error('Error fetching upcoming bookings:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getRecentBookingsForProvider = async (req, res) => {
    const providerId = req.user.id; // Get the provider ID from the authenticated user

    try {
        const bookings = await Appointment.find({
            user: providerId,
            status: 'Confirmed', // Only get confirmed bookings
            date: { $lt: new Date() }, // Ensure it's completed bookings
        })
        .populate('service') // Populate service details
        .lean();

        return res.status(200).json(bookings); // Return recent completed bookings
    } catch (error) {
        console.error('Error fetching recent bookings for provider:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createAppointment,
    getUserAppointments,
    updateBookingStatus,
    getUpcomingBookingsForProvider,
    getRecentBookingsForProvider
};