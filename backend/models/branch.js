const mongoose = require("mongoose");

const branchSchema = mongoose.Schema(
  {
    salonAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "SalonAdmin", required: true }, // Connected to a Salon Admin
    branchName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", branchSchema);
