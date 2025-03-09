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

const getUpcomingBookingsForProvider = async (req, res) => {
    const providerId = req.user.id; 

    try {
        const bookings = await Appointment.find({
            date: { $gte: new Date() }, // Fetch bookings that are upcoming
        })
        .populate('service') // Populate service details
        .populate('user', 'name')
        .lean();

        const upcomingBookings = bookings.filter(booking => booking.service.provider.toString() === providerId);
        return res.status(200).json(upcomingBookings);
    } catch (error) {
        console.error('Error fetching upcoming bookings:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const getRecentBookingsForProvider = async (req, res) => {
    const providerId = req.user.id; // Get the provider ID from the authenticated user

    try {
        const bookings = await Appointment.find({
            // Assuming the Booking model has a reference to User model with a provider id
            user: providerId,
            status: 'Confirmed', // Filter to show only completed bookings
            date: { $lt: new Date() }, // Ensure it's past the current date
        })
        .populate('service') // Populate service details
        .lean();

        return res.status(200).json(bookings); // Send back the recent completed bookings
    } catch (error) {
        console.error('Error fetching recent bookings for provider:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const updateBookingStatus = async (req, res) => {
    const { status } = req.body; // Get the new status from the request body
    const { id } = req.params; // Get the appointment ID from the URL parameters

    try {
        // Update the appointment based on its ID
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Return the newly updated document
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        return res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Error updating booking status:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    createAppointment,
    getUserAppointments,
    getUpcomingBookingsForProvider,
    getRecentBookingsForProvider,
    updateBookingStatus,
};