const express = require("express");

const { createProductCategory, getProductCategories, createProduct, getProductsByBranch } = require("../controllers/productController");

const router = express.Router();

const { authMiddleware, isSalonAdmin } = require("../middleware/authMiddleware");

router.post("/create-product-category", authMiddleware, isSalonAdmin, createProductCategory);
router.get("/get-product-categories", authMiddleware, isSalonAdmin, getProductCategories);
router.post("/create-product", authMiddleware, isSalonAdmin, createProduct);
router.get("/get-all-products", authMiddleware, isSalonAdmin, getProductsByBranch);

module.exports = router;