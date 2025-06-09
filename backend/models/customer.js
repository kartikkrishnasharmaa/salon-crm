const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    lastname: { type: String, },
    password: { type: String },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" }, // Updated
    createdByModel: {
      type: String,
      enum: ["SalonAdmin", "Manager", "Self"],
      default: "SalonAdmin",
    }, // ✅ Fixed enum
  },
  { timestamps: true } // ✅ Add timestamps (createdAt, updatedAt)
);

module.exports = mongoose.model("Customer", customerSchema);