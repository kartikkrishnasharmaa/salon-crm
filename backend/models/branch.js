const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
    salonAdminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "SuperAdmin" }, // SuperAdmin reference
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Branch", BranchSchema);
