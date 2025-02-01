const express = require('express');
const { createSalonAdmin, salonAdminLogin,viewAllSalonAdmins,getTotalSalonAdminsCount } = require('../controllers/salonAdminAuthController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a salon admin (Only super admin can do this)
router.post('/create-salon-admin', authMiddleware, createSalonAdmin);

router.get('/total-salon-admins-count',authMiddleware,getTotalSalonAdminsCount);

//get all salon admin data
router.get('/view-all-salon-admins',authMiddleware,viewAllSalonAdmins);
// Salon admin login
router.post('/salon-admin-login', salonAdminLogin);

module.exports = router;
