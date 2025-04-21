const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a new appointment with payment
const createAppointment = async (req, res) => {
    const { serviceId, hours, date, time, paymentIntentId } = req.body;
    const userId = req.user.id;

    if (!serviceId || !hours || !date || !time || !paymentIntentId) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Verify payment intent
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ message: 'Payment not completed' });
        }

        // Fetch the service
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }

        const providerId = service.provider;
        const amount = service.price * hours;

        // Create appointment
        const appointment = new Appointment({
            user: userId,
            service: serviceId,
            hours: Number(hours),
            date: new Date(date),
            time,
            status: 'Pending',
            provider: providerId,
            paymentStatus: 'Completed',
            stripePaymentId: paymentIntentId,
            amount,
        });

        await appointment.save();
        return res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get upcoming bookings for provider
const getUpcomingBookingsForProvider = async (req, res) => {
    const providerId = req.user.id;

    try {
        const upcomingBookings = await Appointment.find({
            provider: providerId,
            date: { $gte: new Date() },
        })
            .populate('user', 'name email')
            .populate('service')
            .lean();

        console.log('Upcoming Bookings for Provider:', upcomingBookings);
        return res.status(200).json(upcomingBookings);
    } catch (error) {
        console.error('Error fetching upcoming bookings for provider:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get upcoming bookings for client
const getUpcomingBookingsForClient = async (req, res) => {
    const userId = req.user.id;

    try {
        const upcomingBookings = await Appointment.find({
            user: userId,
            date: { $gte: new Date() },
        })
            .populate('service')
            .lean();

        console.log('Upcoming Bookings for Client:', upcomingBookings);
        return res.status(200).json(upcomingBookings);
    } catch (error) {
        console.error('Error fetching upcoming bookings for client:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get recent bookings for provider
const getRecentBookingsForProvider = async (req, res) => {
    const providerId = req.user.id;

    try {
        const recentBookings = await Appointment.find({
            provider: providerId,
            date: { $lt: new Date() },
            status: 'Confirmed',
        })
            .populate('user', 'name email')
            .populate('service')
            .lean();

        console.log('Recent Bookings for Provider:', recentBookings);
        return res.status(200).json(recentBookings);
    } catch (error) {
        console.error('Error fetching recent bookings for provider:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get recent bookings for client
const getRecentBookingsForClient = async (req, res) => {
    const userId = req.user.id;

    try {
        const recentBookings = await Appointment.find({
            user: userId,
            date: { $lt: new Date() },
            status: 'Confirmed',
        })
            .populate('service')
            .lean();

        console.log('Recent Bookings for Client:', recentBookings);
        return res.status(200).json(recentBookings);
    } catch (error) {
        console.error('Error fetching recent bookings for client:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update appointment status (and optionally payment status)
const updateAppointmentStatus = async (req, res) => {
    const { id, status, paymentStatus } = req.body;

    if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid appointment status.' });
    }

    if (paymentStatus && !['Pending', 'Completed', 'Failed'].includes(paymentStatus)) {
        return res.status(400).json({ message: 'Invalid payment status.' });
    }

    try {
        const updateData = { status };
        if (paymentStatus) {
            updateData.paymentStatus = paymentStatus;
        }

        const appointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }
        return res.status(200).json(appointment);
    } catch (error) {
        console.error('Error updating appointment status:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createAppointment,
    getUpcomingBookingsForProvider,
    getRecentBookingsForProvider,
    getUpcomingBookingsForClient,
    getRecentBookingsForClient,
    updateAppointmentStatus,
};