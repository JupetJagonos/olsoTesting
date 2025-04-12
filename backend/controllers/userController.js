const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Service = require('../models/Service');
const Appointment = require('../models/Appointment');

// User Registration
const registerUser = async (req, res) => {
    const { name, email, password, userType } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword, 
            userType 
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token, userId: user._id, userType: user.userType });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Services (for Clients)
const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        console.error('Get Services Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Book a Service
const bookService = async (req, res) => {
    const { service, date } = req.body; // Get service ID and date from request body
    const userId = req.user.id; // Extract user ID from authenticated user

    if (!service || !date) {
        return res.status(400).json({ message: 'Service and date are required.' });
    }

    try {
        const appointment = new Appointment({
            user: userId,
            service,
            date,
        });

        await appointment.save();
        res.status(201).json(appointment); // Respond with the newly created appointment
    } catch (error) {
        console.error('Error booking service:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// View User's Appointments
const viewAppointments = async (req, res) => {
    const userId = req.user.id;

    try {
        const appointments = await Appointment.find({ user: userId }).populate('service');
        res.status(200).json(appointments); 
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Profile
const updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { name, email }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Exporting the user controller functions
module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getServices,
    bookService,  
    viewAppointments,
    updateProfile,
};