const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const superAdminSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String,default: 'superadmin' },
    },
    { timestamps: true }
);

// Encrypt password before saving
superAdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare passwords
superAdminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
