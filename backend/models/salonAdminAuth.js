const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const salonAdminSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'salonadmin' },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'SuperAdmin' }, // SuperAdmin reference
    },
    { timestamps: true }
);

// Encrypt password before saving
salonAdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare passwords
salonAdminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('SalonAdmin', salonAdminSchema);
