const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String }, // Only required if client creates their own account
    profilePicture: { type: String, default: "" },

    registeredBy: { type: String, enum: ["self", "manager"], required: true }, // Who created this client

    gender: { type: String, enum: ["male", "female", "other"] },
    dateOfBirth: { type: Date },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },

    appointmentHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    walletBalance: { type: Number, default: 0 },
    membershipStatus: { type: String, enum: ["none", "silver", "gold", "platinum"], default: "none" },

    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }]
}, { timestamps: true });

module.exports = mongoose.model("Client", ClientSchema);
