const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true }, // Linked to Appointment
    serviceDetails: [{
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalAmount: { type: Number, required: true } // unitPrice * quantity
    }],
    productDetails: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory", required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        totalAmount: { type: Number, required: true } // unitPrice * quantity
    }],
    discount: { type: Number, default: 0 }, // Discount if applicable
    tax: { type: Number, default: 0 }, // Tax on total
    finalAmount: { type: Number, required: true }, // Total amount after discount & tax
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    paymentMethod: { type: String, enum: ["cash", "card", "UPI", "wallet"], required: true },
    transactionId: { type: String, unique: true }, // If payment is done via any gateway
    billDate: { type: Date, default: Date.now },
    billStatus: { type: String, enum: ["generated", "paid", "canceled"], default: "generated" }
}, { timestamps: true });

module.exports = mongoose.model("Bill", BillSchema);
