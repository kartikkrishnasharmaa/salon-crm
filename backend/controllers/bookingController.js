const Booking = require('../models/bookingModel');

const createBooking = async (req, res) => {
    const { client, service, date, timeSlot, notes } = req.body;
    try {
        const booking = await Booking.create({ client, service, date, timeSlot, notes });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('client service');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBooking, getBookings };
