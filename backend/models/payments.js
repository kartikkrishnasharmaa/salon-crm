const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["cash", "card", "UPI", "wallet"], required: true },
    transactionId: { type: String, unique: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
