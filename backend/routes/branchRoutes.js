const express = require("express");
const { createBranch,getBranches  } = require("../controllers/branchController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-branch", authMiddleware, createBranch); // Only SuperAdmin can create a branch
router.get("/get-branches", authMiddleware, getBranches); // Only SuperAdmin can view branches

module.exports = router;
