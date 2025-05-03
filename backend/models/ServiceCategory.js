const mongoose = require('mongoose');

const ServiceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceCategory',
    default: null
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: [true, 'Branch ID is required']
  },
  imageUrl: {
    type: String,
    default: ''
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

// Update the updatedAt field before saving
ServiceCategorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add a virtual for subcategories
ServiceCategorySchema.virtual('subcategories', {
  ref: 'ServiceCategory',
  localField: '_id',
  foreignField: 'parentCategory'
});

// Enable population of virtuals
ServiceCategorySchema.set('toObject', { virtuals: true });
ServiceCategorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);