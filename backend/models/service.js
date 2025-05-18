const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
  // Basic Info
  serviceName: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  serviceCode: {
    type: String,
    required: [true, 'Service code is required'],
    unique: true
  },

  // Category References (from ServiceCategory model)
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceCategory',
    required: [true, 'Category reference is required']
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceCategory',
  },

  // Business Info
  businessUnit: {
    type: String,
    enum: ['Spa', 'Salon', 'Spa and Salon', 'Ayurveda Gram'],
    required: [true, 'Business unit is required']
  },
  description: String,

  // Pricing
  memberPrice: {
    type: Number,
    required: [true, 'Member price is required'],
    min: [0, 'Price cannot be negative']
  },
  nonMemberPrice: {
    type: Number,
    required: [true, 'Non-member price is required'],
    min: [0, 'Price cannot be negative']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  startTime: { type: String },
endTime: { type: String },

  // Tax Info
  hsnCode: {
    type: String,
    required: [true, 'HSN code is required']
  },
  gstCategory: {
    type: String,
    enum: ['GST 5%', 'GST 12%', 'GST 18%', 'GST 28%', 'Custom'],
    required: [true, 'GST category is required']
  },
  cgst: {
    type: Number,
    required: [true, 'CGST is required'],
    min: [0, 'CGST cannot be negative']
  },
  sgst: {
    type: Number,
    required: [true, 'SGST is required'],
    min: [0, 'SGST cannot be negative']
  },

  // Calculated Fields
  memberPriceWithTax: {
    type: Number,
    required: [true, 'Member price with tax is required']
  },
  nonMemberPriceWithTax: {
    type: Number,
    required: [true, 'Non-member price with tax is required']
  },

  // System Fields
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: [true, 'Branch ID is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
},
{
  timestamps: true
});

// Calculate tax-inclusive prices before saving
ServiceSchema.pre('save', function(next) {
  const totalTax = (this.cgst + this.sgst) / 100;
  
  this.memberPriceWithTax = this.memberPrice + (this.memberPrice * totalTax);
  this.nonMemberPriceWithTax = this.nonMemberPrice + (this.nonMemberPrice * totalTax);
  
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Service', ServiceSchema);