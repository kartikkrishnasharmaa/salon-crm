const express = require('express');
const { createUser, getUsersByRole,getAllUsers  } = require('../controllers/userController');
const router = express.Router();

// Route to create a new user
router.post('/create-user', createUser);

// Route to get all users by role
router.get('/:role', getUsersByRole);
router.get('/all-user', getAllUsers);

module.exports = router;
