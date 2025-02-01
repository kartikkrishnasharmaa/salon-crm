const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const salonAdminSchema = mongoose.Schema(
  {
    // Personal Details
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: {
      street: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    // business details
    salonName: { type: String, required: true },
    salonType: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      required: true,
    },
    businessEmail: { type: String, unique: true },
    businessPhone: { type: String, unique: true },
    businessWebsite: { type: String },
    establishedYear: { type: Number }, // Year of establishment
    servicesOffered: [{ type: String }], // List of services
    openingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    priceRange: { type: String, enum: ["Low", "Medium", "High"] }, // Pricing level
    salonImages: [{ type: String }], // Array of image URLs
    description: { type: String }, // Short description about the salon
    role: { type: String, default: "salonadmin" },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // Approval status by super admin
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "SuperAdmin" }, // SuperAdmin reference
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Encrypt password before saving
salonAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
salonAdminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("SalonAdmin", salonAdminSchema);
