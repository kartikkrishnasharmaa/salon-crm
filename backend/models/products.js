const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 }, // global price
    inclusiveTax: { type: Boolean, default: false }, // global tax
    mrp: { type: Number, min: 0 },
    stockQuantity: { type: Number, required: true, min: 0 },
    brand: { type: String, trim: true },
    hsnCode: { type: String, trim: true },
    tax: { type: Number, min: 0 },
    measurement: { type: String, trim: true },
    unit: {
      type: String,
      enum: ["liter", "ml", "gram", "kg", "piece"],
      required: true,
    },
    isRetail: { type: Boolean, default: false },
    isConsumable: { type: Boolean, default: false },
    images: { type: [String], default: [] },
    salonBranch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalonAdmin",
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Out of Stock"],
      default: "Available",
    },
    locations: [
      {
        city: { type: String, required: true, trim: true },
        isActive: { type: Boolean, default: true },
        price: { type: Number, required: true, min: 0 },
        inclusiveTax: { type: Boolean, default: false },
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
