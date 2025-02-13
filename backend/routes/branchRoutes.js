const express = require("express");
const { createBranch,getBranches,deleteBranch  } = require("../controllers/branchController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-branch", authMiddleware, createBranch); 
// Only SuperAdmin can create a branch

// delete api
router.delete("/delete-branch/:salonAdminId/:branchId", authMiddleware, deleteBranch); // Only SuperAdmin can delete a branch


router.get("/get-branches", authMiddleware, getBranches); // Only SuperAdmin can view branches



module.exports = router;
