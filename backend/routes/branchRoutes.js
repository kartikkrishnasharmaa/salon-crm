const express = require("express");
const { getSalonBranches,updateBranch,assignEmployeeToBranch,getallSalonBranches } = require("../controllers/branchController");

const {authMiddleware,isSalonAdmin} = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/get-salon/:salonAdminId/branches",authMiddleware,isSalonAdmin, getSalonBranches); // Fetch branches for a salon

router.patch("/update/:branchId", authMiddleware, isSalonAdmin, updateBranch); // Update branch details


router.put("/assign-branch", authMiddleware, isSalonAdmin, assignEmployeeToBranch); // Assign employee to branch

router.get("/get-all-branches",authMiddleware,isSalonAdmin, getallSalonBranches); // Get all branches



module.exports = router;
