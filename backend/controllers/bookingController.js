const axios = require('axios');
const Appointment = require("../models/appointment");
const Customer = require("../models/customer");

exports.createAppointment = async (req, res) => {
  try {
    const {
      customer,
      services,
      staff,
      date,
      time,
      customerType,
      staffType,
      appointmentNote,
      clientNote,
      branchId,
    } = req.body;

    const requiredFields = {
      branchId: "Branch ID",
      customer: "Customer details",
      services: "Services",
      staff: "Staff",
      date: "Date",
      time: "Time",
      customerType: "Customer type",
      staffType: "Staff type"
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([field]) => !req.body[field])
      .map(([_, name]) => name);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`
      });
    }

    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one service must be provided"
      });
    }

    if (!Array.isArray(staff) || staff.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one staff member must be assigned"
      });
    }

    let totalPrice = 0;
    try {
      totalPrice = services.reduce((total, service) => {
        if (typeof service.price !== 'number') {
          throw new Error(`Invalid price for service: ${service.name}`);
        }
        return total + service.price;
      }, 0);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    const newAppointment = new Appointment({
      customer,
      services,
      staff,
      date,
      time,
      customerType,
      staffType,
      appointmentNote,
      clientNote,
      branchId,
      totalPrice,
      status: "Pending",
      paymentStatus: "Pending"
    });

    const savedAppointment = await newAppointment.save();

    // ✅ Send WhatsApp Notification via Cunnekt (official format)
    const whatsappPayload = JSON.stringify({
      mobile:  "919057508560" || customer?.mobile , 
      templateid: "710183098258086"
    });

    try {
      await axios.post("https://app2.cunnekt.com/v1/sendnotification", whatsappPayload, {
        headers: {
          "Content-Type": "application/json",
          "API-KEY": "33c0c252d80b77bce62342b08a6902d7774e9a8f"
        },
        maxBodyLength: Infinity
      });
    } catch (whatsappError) {
      console.error("❌ Failed to send WhatsApp message:", whatsappError.response?.data || whatsappError.message);
    }
    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment: {
        _id: savedAppointment._id,
        customer: savedAppointment.customer,
        services: savedAppointment.services,
        staff: savedAppointment.staff,
        date: savedAppointment.date,
        time: savedAppointment.time,
        status: savedAppointment.status,
        totalPrice: savedAppointment.totalPrice
      }
    });

  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


exports.getAppointments = async (req, res) => {
  try {
    const { branchId } = req.query;

    // Basic validation
    if (!branchId) {
      return res.status(400).json({ 
        success: false,
        message: "Branch ID is required" 
      });
    }

    // Fetch appointments with minimal processing
    const appointments = await Appointment.find({ branchId })
      .sort({ date: 1, time: 1 }) // Sort by date and time
      .lean();

    // Simple response formatting
    const response = {
      success: true,
      count: appointments.length,
      appointments: appointments.map(app => ({
        id: app._id,
        customer: app.customer,
        services: app.services,
        staff: app.staff,
        date: app.date,
        time: app.time,
        status: app.status || 'Pending',
        paymentStatus: app.paymentStatus || 'Pending',
        totalPrice: app.totalPrice
      }))
    };

    res.status(200).json(response);

  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message
    });
  }
};
exports.checkInAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      return res.status(400).json({ 
        success: false,
        message: "Appointment ID is required" 
      });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "Completed" },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ 
        success: false,
        message: "Appointment not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment checked in successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error checking in appointment:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error",
      error: error.message 
    });
  }
};

// Cancel an Appointment
// Cancel an Appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { cancellationReason } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ 
        success: false,
        message: "Appointment ID is required" 
      });
    }

    // Find appointment and check if it exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ 
        success: false,
        message: "Appointment not found" 
      });
    }

    // Check if the appointment is already completed
    if (appointment.status === "Completed") {
      return res.status(400).json({ 
        success: false,
        message: "Completed appointments cannot be canceled" 
      });
    }

    // Update appointment status to "Cancelled"
    appointment.status = "Cancelled";
    appointment.cancellationReason = cancellationReason || "No reason provided";
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment: {
        id: appointment._id,
        customer: appointment.customer,
        branchId: appointment.branchId,
        services: appointment.services,
        staff: appointment.staff,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        paymentStatus: appointment.paymentStatus,
        totalPrice: appointment.totalPrice,
        cancellationReason: appointment.cancellationReason,
      },
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error",
      error: error.message 
    });
  }
};