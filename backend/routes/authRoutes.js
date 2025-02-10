const express = require('express');
const { signup, login,   } = require('../controllers/superAdminAuthController');
const router = express.Router();

// POST super admin signup /api/auth/signup
router.post('/sa-signup', signup);

// POST super admin login /api/auth/login
router.post('/sa-login', login);

module.exports = router;
