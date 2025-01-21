const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
    {
        client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
        amount: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
