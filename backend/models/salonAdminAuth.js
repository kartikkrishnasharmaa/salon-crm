const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const salonAdminSchema = mongoose.Schema(
  {
    // Personal Details
    ownerName: { type: String,  },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true },
    address: {
      mapaddress: { type: String },
      street: { type: String },
      city: { type: String,  },
      state: { type: String, },
      zipCode: { type: String, },
      country: { type: String, },
    },
    // business details
    salonName: { type: String,  },
    salonType: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },
    businessEmail: { type: String,  },
    businessPhone: { type: String,  },
    businessWebsite: { type: String },
    establishedYear: { type: Number }, // Year of establishment
    servicesOffered: [{ type: String }], // List of services
    role: { type: String, default: "salonadmin" },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // Approval status by super admin
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Branch" }], // Branches reference
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
