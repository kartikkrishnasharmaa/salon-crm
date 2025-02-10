const express = require("express");
const { createBranch } = require("../controllers/branchController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createBranch); // Only SuperAdmin can create a branch

module.exports = router;
