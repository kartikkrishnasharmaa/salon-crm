const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    salonAdminId: { type: mongoose.Schema.Types.ObjectId, ref: "SalonAdmin", required: true }, // To track which salon booked this appointment
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }, // Service reference
    assignedEmployee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true }, 
    endTime: { type: String, required: true }, 
    notes: { type: String, trim: true }, 
    price: { type: Number, required: true, min: 0 }, // Price must be >= 0
    status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
    paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" }
  },
  { timestamps: true }
);

// Validate that endTime is always after startTime
AppointmentSchema.pre("save", function (next) {
  if (this.startTime >= this.endTime) {
    return next(new Error("End time must be after start time."));
  }
  next();
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
