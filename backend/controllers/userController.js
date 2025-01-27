const User = require('../models/userModel');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Fetch all users with their count
exports.getAllUsers = async (req, res) => {
  try {
    console.log("Fetching all users...");

    // Fetch all users from the database excluding passwords
    const users = await User.find({}, '-password');

    // If no users are found
    if (!users || users.length === 0) {
      console.log("No users found in the database.");
      return res.status(404).json({
        message: "No users found in the database",
        totalUsers: 0,
        users: [],
      });
    }

    // Log the fetched users to the console
    console.log("Fetched Users Data:", users);

    // Return the response
    res.status(200).json({
      message: "All users fetched successfully",
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    // Log the error to the console
    console.error("Error fetching users:", error.message);

    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};


   

// Get all users by role
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params; // Role will be passed in the URL
    const users = await User.find({ role });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};
