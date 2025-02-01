const express = require("express");
const {
  createSalonAdmin,
  salonAdminLogin,
  viewAllSalonAdmins,
  getTotalSalonAdminsCount,
  viewSalonAdmin,
  updateSalonAdmin,
  deleteSalonAdmin,
} = require("../controllers/salonAdminAuthController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Route to create a salon admin (Only super admin can do this)
router.post("/create-salon-admin", authMiddleware, createSalonAdmin);

//count all admin API
router.get(
  "/total-salon-admins-count",
  authMiddleware,
  getTotalSalonAdminsCount
);

//get all salon admin data
router.get("/view-all-salon-admins", authMiddleware, viewAllSalonAdmins);

//get salon admin by ID
router.get("/view-salon-admin/:adminId", authMiddleware, viewSalonAdmin);

// Update Salon Admin
router.put('/update-salon-admin/:id',authMiddleware, updateSalonAdmin);

// Delete Salon Admin
router.delete('/delete-salon-admin/:id',authMiddleware, deleteSalonAdmin);

// Salon admin login
router.post("/salon-admin-login", salonAdminLogin);

module.exports = router;
