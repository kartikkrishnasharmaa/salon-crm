const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product category name is required"],
    trim: true,
    unique: true
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    default: null
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: [true, "Branch ID is required"]
  },
  imageUrl: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto update `updatedAt` before save
ProductCategorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for subcategories
ProductCategorySchema.virtual("subcategories", {
  ref: "ProductCategory",
  localField: "_id",
  foreignField: "parentCategory"
});

// Enable population of virtual fields
ProductCategorySchema.set("toObject", { virtuals: true });
ProductCategorySchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
