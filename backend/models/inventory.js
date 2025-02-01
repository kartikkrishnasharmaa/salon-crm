const mongoose = require("mongoose");
const InventorySchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: { type: String, required: true }, // Example: Shampoo, Conditioner
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    supplier: { type: String },
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Inventory", InventorySchema);
