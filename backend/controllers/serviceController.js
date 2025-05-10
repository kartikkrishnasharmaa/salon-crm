const Service = require("../models/service");
const Branch = require("../models/branch");
const ServiceCategory = require("../models/ServiceCategory");
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

// 🏷️ CREATE SERVICE CATEGORY WITH IMAGE - Salon Admin Only
exports.createServiceCategory = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, parentCategory, branchId } = req.body;

      // Validate required fields
      if (!name || !branchId) {
        // Remove uploaded file if validation fails
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ 
          message: "Name and branch ID are required" 
        });
      }

      // Check if the branch exists and belongs to the salon admin
      const branch = await Branch.findOne({ 
        _id: branchId, 
        salonAdminId: req.user._id 
      });
      if (!branch) {
        // Remove uploaded file if branch not found
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({ 
          message: "Branch not found or unauthorized" 
        });
      }

      // Check if parent category exists if provided
      if (parentCategory) {
        const parentExists = await ServiceCategory.findOne({ 
          _id: parentCategory,
          branchId
        });
        if (!parentExists) {
          // Remove uploaded file if parent not found
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          return res.status(404).json({ 
            message: "Parent category not found in this branch" 
          });
        }
      }

      // Check if category name already exists in this branch
      const existingCategory = await ServiceCategory.findOne({ 
        name, 
        branchId 
      });
      if (existingCategory) {
        // Remove uploaded file if category exists
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ 
          message: "Category with this name already exists in the branch" 
        });
      }

      // Create image URL if file was uploaded
      const imageUrl = req.file 
        ? `/uploads/${req.file.filename}`
        : "";

      // Create new service category
      const newCategory = new ServiceCategory({
        name,
        parentCategory: parentCategory || null,
        branchId,
        imageUrl
      });

      await newCategory.save();

      res.status(201).json({ 
        message: "Service category created successfully", 
        category: newCategory 
      });

    } catch (error) {
      // Remove uploaded file if error occurs
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.error("Service Category Creation Error:", error.message);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  }
];

// 🏷️ GET SERVICE CATEGORIES - Salon Admi
// 🏷️ GET SERVICE CATEGORIES - Salon Admin Only
exports.getServiceCategories = async (req, res) => {
  try {
    const { branchId } = req.query;

    // Validate required fields
    if (!branchId) {
      return res.status(400).json({ 
        message: "Branch ID is required" 
      });
    }

    // Check if the branch exists and belongs to the salon admin
    const branch = await Branch.findOne({ 
      _id: branchId, 
      salonAdminId: req.user._id 
    });
    
    if (!branch) {
      return res.status(404).json({ 
        message: "Branch not found or unauthorized" 
      });
    }

    // Fetch categories with parent-child relationships
    const categories = await ServiceCategory.find({ branchId })
      .populate({
        path: 'parentCategory',
        select: 'name'
      })
      .sort({ createdAt: -1 });

    // Transform categories into hierarchical structure
    const categoryMap = {};
    const rootCategories = [];

    // First pass: map all categories
    categories.forEach(category => {
      categoryMap[category._id] = {
        ...category.toObject(),
        children: []
      };
    });

    // Second pass: build hierarchy
    categories.forEach(category => {
      if (category.parentCategory) {
        if (categoryMap[category.parentCategory._id]) {
          categoryMap[category.parentCategory._id].children.push(
            categoryMap[category._id]
          );
        }
      } else {
        rootCategories.push(categoryMap[category._id]);
      }
    });

    res.status(200).json({ 
      success: true,
      categories: rootCategories,
      flatCategories: categories // Also return flat list for easy reference
    });

  } catch (error) {
    console.error("Get Service Categories Error:", error.message);
    res.status(500).json({ 
      message: "Internal server error" 
    });
  }
};

// 🎯 CREATE SERVICE - Salon Admin Only
exports.createservice = async (req, res) => {
  try {
    const { branchId, name, category, type, price, duration, startTime, endTime, description } = req.body;

    //  Validate Required Fields
    if (!branchId || !name || !category || !type || !price || !duration || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔍 Check if the branch exists & belongs to the salon admin
    const branch = await Branch.findOne({ _id: branchId, salonAdminId: req.user._id });
    if (!branch) {
      return res.status(404).json({ message: "Branch not found or unauthorized" });
    }

    // 🕒 Validate Time Range
    if (startTime >= endTime) {
      return res.status(400).json({ message: "End time must be after start time" });
    }

    // 🚀 Create New Service
    const newService = new Service({
      salonAdminId: req.user._id,
      branchId,
      name,
      category,
      type,
      price,
      duration,
      startTime,
      endTime,
      description,
    });

    await newService.save();
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    console.error("Service Creation Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getServicesByBranch = async (req, res) => {
  try {
    const { branchId } = req.query; // Query params se branchId lo

    if (!branchId) {
      return res.status(400).json({ message: "Branch ID is required" });
    }

    // ✅ Fetch services for the given branch
    const services = await Service.find({ branchId });

    if (!services.length) {
      return res.status(404).json({ message: "No services found for this branch" });
    }

    res.status(200).json({ services });
  } catch (error) {
    console.error("Fetch Services Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 👥 GET ALL EMPLOYEES WITH SERVICES
exports.getAllEmployeesWithServices = async (req, res) => {
  try {
    const { branchId } = req.query;
    
    const query = { salonAdminId: req.user._id };
    if (branchId) {
      query.branchId = branchId;
    }

    const employees = await Employee.find(query)
      .populate("branchId", "branchName")
      .populate("services", "name duration price category type");

    res.status(200).json({ employees });
  } catch (error) {
    console.error("Get Employees Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ➕ ASSIGN SERVICE TO EMPLOYEE
exports.assignServiceToEmployee = async (req, res) => {
  try {
    const { employeeId, serviceId } = req.body;

    // Check if employee exists and belongs to the salon admin
    const employee = await Employee.findOne({ 
      _id: employeeId, 
      salonAdminId: req.user._id 
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found or unauthorized" });
    }

    // Check if service exists and belongs to the salon admin
    const service = await Service.findOne({ 
      _id: serviceId, 
      salonAdminId: req.user._id 
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found or unauthorized" });
    }

    // Check if service is already assigned
    if (employee.services.includes(serviceId)) {
      return res.status(400).json({ message: "Service already assigned to this employee" });
    }

    // Assign the service
    employee.services.push(serviceId);
    await employee.save();

    // Update the service's assignedEmployee
    service.assignedEmployee = employeeId;
    await service.save();

    const updatedEmployee = await Employee.findById(employeeId)
      .populate("services", "name duration price");

    res.status(200).json({ 
      message: "Service assigned successfully",
      employee: updatedEmployee
    });
  } catch (error) {
    console.error("Assign Service Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
