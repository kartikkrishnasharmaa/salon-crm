const ProductCategory = require("../models/ProductCategory");
const Branch = require("../models/branch");
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

// CREATE PRODUCT CATEGORY - Only for salon admin, with optional parentCategory and image
exports.createProductCategory = [
  upload.single("image"), // assuming upload middleware for image is same
  async (req, res) => {
    try {
      const { name, parentCategory, branchId } = req.body;

      if (!name || !branchId) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Name and branch ID are required" });
      }

      // Check branch exists & belongs to salon admin
      const branch = await Branch.findOne({ _id: branchId, salonAdminId: req.user._id });
      if (!branch) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(404).json({ message: "Branch not found or unauthorized" });
      }

      // Validate parent category if provided
      if (parentCategory) {
        const parent = await ProductCategory.findOne({ _id: parentCategory, branchId });
        if (!parent) {
          if (req.file) fs.unlinkSync(req.file.path);
          return res.status(404).json({ message: "Parent category not found in this branch" });
        }
      }

      // Check if category name already exists in branch
      const existing = await ProductCategory.findOne({ name, branchId });
      if (existing) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Category with this name already exists in the branch" });
      }

      // Image URL if uploaded
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

      const newCategory = new ProductCategory({
        name,
        parentCategory: parentCategory || null,
        branchId,
        imageUrl,
      });

      await newCategory.save();

      res.status(201).json({
        message: "Product category created successfully",
        category: newCategory,
      });
    } catch (error) {
      if (req.file) fs.unlinkSync(req.file.path);
      console.error("Create Product Category Error:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

exports.getProductCategories = async (req, res) => {
  try {
    const { branchId } = req.query;
    if (!branchId) {
      return res.status(400).json({ message: "Branch ID is required" });
    }

    // Check branch ownership
    const branch = await Branch.findOne({ _id: branchId, salonAdminId: req.user._id });
    if (!branch) {
      return res.status(404).json({ message: "Branch not found or unauthorized" });
    }

    // Fetch categories
    const categories = await ProductCategory.find({ branchId })
      .populate({ path: "parentCategory", select: "name" })
      .sort({ createdAt: -1 });

    // Build hierarchical structure
    const categoryMap = {};
    const rootCategories = [];

    categories.forEach(cat => {
      categoryMap[cat._id] = { ...cat.toObject(), children: [] };
    });

    categories.forEach(cat => {
      if (cat.parentCategory) {
        if (categoryMap[cat.parentCategory._id]) {
          categoryMap[cat.parentCategory._id].children.push(categoryMap[cat._id]);
        }
      } else {
        rootCategories.push(categoryMap[cat._id]);
      }
    });

    res.status(200).json({
      success: true,
      categories: rootCategories,
      flatCategories: categories,
    });
  } catch (error) {
    console.error("Get Product Categories Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      inclusiveTax = false,
      mrp,
      stockQuantity,
      brand,
      hsnCode,
      tax,
      measurement,
      unit,
      isRetail = false,
      isConsumable = false,
      salonBranch,
      locations = []
    } = req.body;

    // 🧾 Validate required fields
    const requiredFields = ["name", "category", "price", "stockQuantity", "unit", "salonBranch"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // 🔐 Validate Branch ownership
    const branch = await Branch.findOne({ _id: salonBranch, salonAdminId: req.user._id });
    if (!branch) {
      return res.status(404).json({ message: "Branch not found or unauthorized" });
    }

    // 📂 Validate Category
    const categoryExists = await ProductCategory.findOne({ _id: category, branchId: salonBranch });
    if (!categoryExists) {
      return res.status(404).json({ message: "Product category not found in this branch" });
    }

    // 🖼️ Handle images (assuming images are sent as array of URLs or handled via middleware)
    const images = req.body.images || [];

    // 📍 Validate locations
    const validLocations = Array.isArray(locations) ? locations.map(loc => ({
      city: loc.city,
      isActive: loc.isActive ?? true,
      price: loc.price,
      inclusiveTax: loc.inclusiveTax ?? false
    })) : [];

    // 🚀 Create Product
    const newProduct = new Product({
      name,
      category,
      description,
      price: parseFloat(price),
      inclusiveTax,
      mrp: parseFloat(mrp || 0),
      stockQuantity: parseInt(stockQuantity),
      brand,
      hsnCode,
      tax: parseFloat(tax || 0),
      measurement,
      unit,
      isRetail,
      isConsumable,
      images,
      salonBranch,
      createdBy: req.user._id,
      status: stockQuantity > 0 ? "Available" : "Out of Stock",
      locations: validLocations
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });
  } catch (error) {
    console.error("Product Creation Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductsByBranch = async (req, res) => {
  try {
    const { branchId } = req.query;

    // 🔐 Verify branch belongs to the logged-in salon admin
    const branch = await Branch.findOne({ _id: branchId, salonAdminId: req.user._id });
    if (!branch) {
      return res.status(404).json({ message: "Branch not found or unauthorized" });
    }

    // 📦 Fetch products for the given branch
    const products = await Product.find({ branchId })
      .populate("category", "name")
      .populate("subCategory", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Products fetched successfully",
      products
    });
  } catch (error) {
    console.error("Fetch Products Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};