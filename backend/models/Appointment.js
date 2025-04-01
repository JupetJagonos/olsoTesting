const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }, // Reference to Service
    date: { type: Date, required: true }, // Date of the appointment
    time: { type: String, required: true }, // Time for the appointment (stored as a string e.g. "14:00")
    hours: { type: Number, required: true }, // Number of hours for the booking
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }, // Appointment status
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Appointment', AppointmentSchema); // Export the model