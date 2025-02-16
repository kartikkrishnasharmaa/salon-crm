const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const adminAuthRoutes = require('./routes/authRoutes');
const salonAdminRoutes = require('./routes/salonAdminRoutes');
const EmployeeRoutes = require('./routes/employee');
const chalk = require('chalk');
// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use('/api/auth', adminAuthRoutes);
app.use('/api/salon', salonAdminRoutes);
app.use('/api/employee', EmployeeRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(chalk.yellow.bold(`\n 🚀 Server running on: ${chalk.cyan(`http://localhost:${PORT}`)}`));
});
