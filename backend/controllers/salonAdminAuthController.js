const SalonAdmin = require("../models/salonAdminAuth");
const jwt = require("jsonwebtoken");

// Function to create a salon admin (only super admin can do this)
exports.createSalonAdmin = async (req, res) => {
  try {
    // Check if the logged-in user is super admin
    if (req.user.role !== "superadmin") {
      return res
        .status(403)
        .json({
          message: "Access denied! Only SuperAdmin can create SalonAdmin",
        });
    }

    const {
      ownerName,
      email,
      password,
      phone,
      address,
      salonName,
      salonType,
      businessEmail,
      businessPhone,
      businessWebsite,
      establishedYear,
      servicesOffered,
      openingHours,
      priceRange,
      salonImages,
      description,
      createdBy,
    } = req.body;

    // Check if salon admin already exists
    const existingUser = await SalonAdmin.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Salon admin with this email already exists" });
    }

    // Create new salon admin
    const salonAdmin = new SalonAdmin({
      ownerName,
      email,
      password,
      phone,
      address,
      salonName,
      salonType,
      businessEmail,
      businessPhone,
      businessWebsite,
      establishedYear,
      servicesOffered,
      openingHours,
      priceRange,
      salonImages,
      description,
      createdBy: req.user.id, // Linking the salon admin to the super admin
    });

    await salonAdmin.save();

    res.status(201).json({ message: "Salon Admin created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Salon Admin", error: error.message });
  }
};

// Salon Admin Login
exports.salonAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user
    const user = await SalonAdmin.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Respond with user details and token
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error during salon admin login",
        error: error.message,
      });
  }
};

// Get all salon admins
exports.viewAllSalonAdmins = async (req, res) => {
  try {
    // Check if the logged-in user is a super admin
    if (req.user.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Access denied! Only SuperAdmin can view all SalonAdmins" });
    }

    // Retrieve all salon admin data
    const salonAdmins = await SalonAdmin.find();

    if (salonAdmins.length === 0) {
      return res.status(404).json({ message: "No salon admins found" });
    }
 // Get the total count of salon admins
    const totalSalonAdmins = salonAdmins.length;
    // Return salon admin data
    res.status(200).json({ salonAdmins,totalSalonAdmins });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving salon admins", error: error.message });
  }
};


// see total admins counting
exports.getTotalSalonAdminsCount = async (req, res) => {
  try {
    // Check if the logged-in user is a super admin
    if (req.user.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Access denied! Only SuperAdmin can view the count of SalonAdmins" });
    }

    // Get the total count of salon admins without fetching the full data
    const totalSalonAdmins = await SalonAdmin.countDocuments();

    // Return the total count of salon admins
    res.status(200).json({ totalSalonAdmins });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving salon admin count", error: error.message });
  }
};
