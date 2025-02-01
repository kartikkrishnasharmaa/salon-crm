const mongoose = require("mongoose");
const ServiceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    category: { type: String, required: true }, // Example: Hair, Skin, Nails
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // in minutes
    description: { type: String },
    available: { type: Boolean, default: true }, // Active/Inactive service
    imageUrl: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Service", ServiceSchema);
