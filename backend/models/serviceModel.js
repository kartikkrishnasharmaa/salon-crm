const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        duration: { type: Number, required: true }, // Duration in minutes
    },
    { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
