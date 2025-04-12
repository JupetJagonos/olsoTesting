const Appointment = require('../models/Appointment');
const Service = require('../models/Service'); // Ensure the Service model is imported

// Create a new appointment
const createAppointment = async (req, res) => {
    const { serviceId, hours, date, time } = req.body;
    const userId = req.user.id; // Assume user ID is attached to the request via middleware

    // Check for required fields
    if (!serviceId || !hours || !date || !time) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Fetch the service to get the provider ID
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }

        const providerId = service.provider; // Get the provider ID from the service

        const appointment = new Appointment({
            user: userId,
            service: serviceId,
            hours: Number(hours),
            date: new Date(date), // Use the appropriate date creation based on your requirements
            time,
            status: 'Pending', // Set the initial status of the appointment
            provider: providerId, // Set the provider from the service
        });

        await appointment.save(); // Save the appointment in the database
        return res.status(201).json(appointment); // Respond with the created appointment
    } catch (error) {
        console.error('Error creating appointment:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get upcoming bookings for provider
const getUpcomingBookingsForProvider = async (req, res) => {
    const providerId = req.user.id; // The authenticated provider ID

    try {
        const upcomingBookings = await Appointment.find({
            provider : providerId, // Filter by provider
            date: { $gte: new Date() }, // Fetch future bookings
        })
        .populate('user', 'name email') // Populate client details
        .populate('service') // Populate service details
        .lean();

        console.log('Upcoming Bookings for Provider:', upcomingBookings); // Debugging log
        return res.status(200).json(upcomingBookings);
    } catch (error) {
        console.error('Error fetching upcoming bookings for provider:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get upcoming bookings for client
const getUpcomingBookingsForClient = async (req, res) => {
    const userId = req.user.id; // The authenticated client ID

    try {
        const upcomingBookings = await Appointment.find({
            user: userId, // Filter by client
            date: { $gte: new Date() }, // Fetch future bookings
        })
        .populate('service') // Populate service details
        .lean();

        console.log('Upcoming Bookings for Client:', upcomingBookings); // Debugging log
        return res.status(200).json(upcomingBookings);
    } catch (error) {
        console.error('Error fetching upcoming bookings for client:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get recent bookings for provider
const getRecentBookingsForProvider = async (req, res) => {
    const providerId = req.user.id; // The authenticated provider ID

    try {
        const recentBookings = await Appointment.find({
            'service.provider': providerId, // Filter by provider
            date: { $lt: new Date() }, // Fetch past bookings
            status: 'Completed', // Only get confirmed bookings
        })
        .populate('user', 'name email') // Populate client details
        .populate('service') // Populate service details
        .lean();

        console.log('Recent Bookings for Provider:', recentBookings); // Debugging log
        return res.status(200).json(recentBookings);
    } catch (error) {
        console.error('Error fetching recent bookings for provider:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get recent bookings for client
const getRecentBookingsForClient = async (req, res) => {
    const userId = req.user.id; // The authenticated client ID

    try {
        const recentBookings = await Appointment.find({
            user: userId, // Filter by client
            date: { $lt: new Date() }, // Fetch past bookings
            status: 'Completed', // Only get confirmed bookings
        })
        .populate('service') // Populate service details
        .lean();

        console.log('Recent Bookings for Client:', recentBookings); // Debugging log
        return res.status(200).json(recentBookings);
    } catch (error) {
        console.error('Error fetching recent bookings for client:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createAppointment,
    getUpcomingBookingsForProvider,
    getRecentBookingsForProvider,
    getUpcomingBookingsForClient,
    getRecentBookingsForClient,
};