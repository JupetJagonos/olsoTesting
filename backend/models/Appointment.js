const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    hours: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true }, // Add this line
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema); // Export the model