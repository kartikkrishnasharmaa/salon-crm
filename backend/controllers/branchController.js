const Branch = require("../models/branch");
const SalonAdmin = require("../models/salonAdminAuth");

exports.createBranch = async (req, res) => {
  try {
    // Check if user is superadmin
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied! Only SuperAdmin can create branches" });
    }

    const { salonAdminId, branchName, address, phone, email } = req.body;

    // Check if SalonAdmin exists
    const salonAdmin = await SalonAdmin.findById(salonAdminId);
    if (!salonAdmin) {
      return res.status(404).json({ message: "Salon Admin not found" });
    }

    // Check if SalonAdmin already has 4 branches
    const branchCount = await Branch.countDocuments({ salonAdmin: salonAdminId });
    if (branchCount >= 4) {
      return res.status(400).json({ message: "A Salon Admin can have a maximum of 4 branches" });
    }

    // Create a new Branch
    const branch = new Branch({
      salonAdmin: salonAdminId,
      branchName,
      address,
      phone,
      email,
    });

    await branch.save();

    // Update SalonAdmin's branch list
    salonAdmin.branches.push(branch._id);
    await salonAdmin.save();

    res.status(201).json({ message: "Branch created successfully", branch });
  } catch (error) {
    res.status(500).json({ message: "Error creating branch", error: error.message });
  }
};
