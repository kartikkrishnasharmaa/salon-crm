const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["manager", "employee"], required: true },
    profilePicture: { type: String, default: "" },
    
    // Personal Details
    gender: { type: String, enum: ["male", "female", "other"] },
    dateOfBirth: { type: Date },
    bloodGroup: { type: String },
    maritalStatus: { type: String, enum: ["single", "married", "divorced", "widowed"] },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },

    // Employment Details
    employeeId: { type: String, unique: true, required: true },
    department: { type: String, required: true }, // E.g., Hair, Nails, Makeup, Spa
    designation: { type: String, required: true }, // E.g., Senior Stylist, Junior Barber
    joiningDate: { type: Date, default: Date.now },
    experience: { type: Number, default: 0 }, // in years
    shiftTiming: { type: String, default: "9 AM - 6 PM" },
    workingDays: [{ type: String }], // ["Monday", "Tuesday", ...]
    
    // Salary & Payments
    salary: { type: Number, default: 0 },
    salaryType: { type: String, enum: ["fixed", "commission", "hourly"], default: "fixed" },
    commissionPercentage: { type: Number, default: 0 }, // if applicable
    hourlyRate: { type: Number, default: 0 }, // if applicable
    bankDetails: {
        accountHolderName: { type: String },
        accountNumber: { type: String },
        bankName: { type: String },
        IFSC: { type: String }
    },

    // Attendance & Leaves
    attendance: [{
        date: { type: Date },
        checkIn: { type: String },
        checkOut: { type: String },
        status: { type: String, enum: ["present", "absent", "leave", "half-day"], default: "present" }
    }],
    totalLeavesAllowed: { type: Number, default: 12 },
    leavesTaken: { type: Number, default: 0 },
    leaveRequests: [{
        startDate: { type: Date },
        endDate: { type: Date },
        reason: { type: String },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
    }],

    // Performance & Reviews
    performanceRating: { type: Number, default: 5, min: 1, max: 5 }, // Rating out of 5
    clientReviews: [{
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
    completedAppointments: { type: Number, default: 0 },
    customerSatisfactionScore: { type: Number, default: 100 }, // Percentage

    // Documents & Certifications
    documents: [{
        documentType: { type: String }, // e.g., "Aadhar", "Driving License"
        documentURL: { type: String }
    }],
    certifications: [{
        certificationName: { type: String },
        issuedBy: { type: String },
        issueDate: { type: Date }
    }],

    // Access Control (for Managers)
    permissions: {
        canManageEmployees: { type: Boolean, default: false },
        canManageAppointments: { type: Boolean, default: false },
        canAccessPayments: { type: Boolean, default: false },
        canManageInventory: { type: Boolean, default: false },
        canEditServices: { type: Boolean, default: false }
    },

    // Notifications & Alerts
    notifications: [{
        message: { type: String },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }],

    activeStatus: { type: Boolean, default: true } // Active/Inactive Employee
}, { timestamps: true });

module.exports = mongoose.model("Employee", EmployeeSchema);
