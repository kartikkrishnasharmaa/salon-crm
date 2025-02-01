const mongoose = require("mongoose");
const AttendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: Date, required: true },
    checkIn: { type: String },
    checkOut: { type: String },
    status: { type: String, enum: ["present", "absent", "leave", "half-day"], default: "present" }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
