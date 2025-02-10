const SalonAdmin = require("../models/salonAdminAuth");
const jwt = require("jsonwebtoken");


exports.getSalonBranches = async (req, res) => {
  try {
    const { salonAdminId } = req.params;

    const salonAdmin = await SalonAdmin.findById(salonAdminId).populate("branches");
    if (!salonAdmin) {
      return res.status(404).json({ message: "Salon Admin not found" });
    }

    res.status(200).json({ branches: salonAdmin.branches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
      servicesOffered,
      businessEmail,
      businessPhone,
      businessWebsite,
      establishedYear,
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
      servicesOffered,
      businessPhone,
      businessWebsite,
      establishedYear,
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

// Super Admin logs in as Salon Admin
exports.loginasSalonAdmin = async (req, res) => {
  try {
    console.log("Decoded User from Token:", req.user); // Debugging line

    const { salonAdminId } = req.params;

    // Find the Salon Admin
    const salonAdmin = await SalonAdmin.findById(salonAdminId).select("-password");
    if (!salonAdmin) {
      return res.status(404).json({ message: "Salon Admin not found" });
    }


    // Generate JWT token for Salon Admin
    const token = jwt.sign(
      { userId: salonAdmin._id, role: "salonadmin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: salonAdmin,
      message: `Successfully logged in as ${salonAdmin.salonName}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in as Salon Admin y sms backend se aa rha hai",
      error: error.message,
    });
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

exports.getSalonAdminProfile = async (req, res) => {
  try {
    const salonAdmin = await SalonAdmin.findById(req.user.userId).select("-password");
    if (!salonAdmin) {
      return res.status(404).json({ message: "Salon Admin not found" });
    }
    res.status(200).json(salonAdmin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
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

// view salon admin by ID
// Controller for viewing a specific salon admin by ID
exports.viewSalonAdmin = async (req, res) => {
  try {
    // Check if the logged-in user is a super admin
    if (req.user.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Access denied! Only SuperAdmin can view a SalonAdmin" });
    }

    // Retrieve the salon admin by ID from the request parameters
    const salonAdmin = await SalonAdmin.findById(req.params.adminId);

    if (!salonAdmin) {
      return res.status(404).json({ message: "Salon Admin not found" });
    }

    // Return the specific salon admin data
    res.status(200).json({ salonAdmin });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving salon admin", error: error.message });
  }
};

//update salon admin fields
exports.updateSalonAdmin = async (req, res) => {
  try {
    // Check if the logged-in user is super admin
    if (req.user.role !== "superadmin") {
      return res
        .status(403)
        .json({
          message: "Access denied! Only SuperAdmin can update SalonAdmin",
        });
    }

    const { id } = req.params;
    const {
      ownerName,
      email,
      phone,
      address,
      salonName,
      salonType,
      businessEmail,
      businessPhone,
      businessWebsite,
      establishedYear,
      servicesOffered
    } = req.body;

    // Check if salon admin exists
    const salonAdmin = await SalonAdmin.findById(id);
    if (!salonAdmin) {
      return res
        .status(404)
        .json({ message: "Salon Admin not found" });
    }

    // Update fields
    salonAdmin.ownerName = ownerName || salonAdmin.ownerName;
    salonAdmin.email = email || salonAdmin.email;
    salonAdmin.phone = phone || salonAdmin.phone;
    salonAdmin.address = address || salonAdmin.address;
    salonAdmin.salonName = salonName || salonAdmin.salonName;
    salonAdmin.salonType = salonType || salonAdmin.salonType;
    salonAdmin.businessEmail = businessEmail || salonAdmin.businessEmail;
    salonAdmin.businessPhone = businessPhone || salonAdmin.businessPhone;
    salonAdmin.businessWebsite = businessWebsite || salonAdmin.businessWebsite;
    salonAdmin.establishedYear = establishedYear || salonAdmin.establishedYear;
    salonAdmin.servicesOffered = servicesOffered || salonAdmin.servicesOffered
    await salonAdmin.save();

    res.status(200).json({ message: "Salon Admin updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating Salon Admin", error: error.message });
  }
};


// delete salon admin by id
exports.deleteSalonAdmin = async (req, res) => {
  try {
    // Check if the logged-in user is super admin
    if (req.user.role !== "superadmin") {
      return res
        .status(403)
        .json({
          message: "Access denied! Only SuperAdmin can delete SalonAdmin",
        });
    }

    const { id } = req.params;

    // Check if salon admin exists
    const salonAdmin = await SalonAdmin.findById(id);
    if (!salonAdmin) {
      return res
        .status(404)
        .json({ message: "Salon Admin not found" });
    }

    // Delete the salon admin
    await salonAdmin.deleteOne();

    res.status(200).json({ message: "Salon Admin deleted permanently" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Salon Admin", error: error.message });
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
