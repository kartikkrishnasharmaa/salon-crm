const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    reviewDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Review", ReviewSchema);
