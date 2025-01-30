const express = require('express');
const { createSalonAdmin, salonAdminLogin } = require('../controllers/salonAdminAuthController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a salon admin (Only super admin can do this)
router.post('/create-salon-admin', authMiddleware, createSalonAdmin);

// Salon admin login
router.post('/salon-admin-login', salonAdminLogin);

module.exports = router;
