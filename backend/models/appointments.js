const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true }, // Assigned employee
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },

    appointmentDate: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // Example: "10:00 AM - 11:00 AM"
    status: { type: String, enum: ["scheduled", "completed", "canceled"], default: "scheduled" },
    
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    reviewGiven: { type: Boolean, default: false } // Client ne review diya ya nahi
}, { timestamps: true });

module.exports = mongoose.model("Appointment", AppointmentSchema);
