const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, admin, createBooking).get(protect, admin, getBookings);

module.exports = router;
