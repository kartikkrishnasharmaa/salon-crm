const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema(
    {
        client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
        date: { type: Date, required: true },
        timeSlot: { type: String, required: true }, // Example: '10:00 AM - 11:00 AM'
        notes: { type: String },
        status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
