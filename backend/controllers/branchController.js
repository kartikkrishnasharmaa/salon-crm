const mongoose = require('mongoose');  // This imports mongoose
const Branch = require("../models/branch");
const SalonAdmin = require("../models/salonAdminAuth");

exports.createBranch = async (req, res) => {
  try {
    const { salonAdmin, branchName, address, phone } = req.body;

    // Validate salonAdminId to ensure it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(salonAdmin)) {
      return res.status(400).json({ message: "Invalid Salon Admin ID" });
    }

    // Check if SalonAdmin exists
    const salonAdminDoc = await SalonAdmin.findById(salonAdmin);
    if (!salonAdminDoc) {
      return res.status(404).json({ message: "Salon Admin not found" });
    }

    // Check if SalonAdmin has already 4 branches
    const branchCount = await Branch.countDocuments({ salonAdmin });
    if (branchCount >= 4) {
      return res.status(400).json({ message: "A Salon Admin can have a maximum of 4 branches" });
    }

    // Create a new branch
    const newBranch = new Branch({
      salonAdmin,
      branchName,
      address,
      phone
    });

    // Save the new branch
    await newBranch.save();

    // Add branch to SalonAdmin's branches array
    salonAdminDoc.branches.push(newBranch._id);
    await salonAdminDoc.save();

    res.status(201).json({
      message: "Branch created successfully",
      branch: newBranch,
    });

  } catch (error) {
    console.error('Error creating branch:', error);
    res.status(500).json({
      message: "Error creating branch",
      error: error.message,
    });
  }
};
exports.getBranches = async (req, res) => {
  try {
    const branches = await SalonAdmin.find()
      .populate({
        path: "branches",
        select: "branchName phone address", // Branch ka sirf yeh data fetch hoga
      })
      .select("ownerName salonName salonType businessEmail businessPhone branches") // Sirf zaroori fields fetch honge
      .exec();

    if (!branches.length) {
      return res.status(404).json({ message: "No Salon Admins found" });
    }

    res.status(200).json({ branches });
  } catch (error) {
    console.error("Error fetching salon admins with branches:", error);
    res.status(500).json({
      message: "Error fetching salon admins with branches",
      error: error.message,
    });
  }
};


// exports.getBranches = async (req, res) => {
//   try {
//     const branches = await SalonAdmin.find()
//       .populate("branches") // Fetch branch details
//       .select("name branches") // Select only necessary fields
//       .exec();

//     if (!branches.length) {
//       return res.status(404).json({ message: "No branches found" });
//     }

//     res.status(200).json({ branches });
//   } catch (error) {
//     console.error("Error fetching branches:", error);
//     res.status(500).json({
//       message: "Error fetching branches",
//       error: error.message,
//     });
//   }
// };