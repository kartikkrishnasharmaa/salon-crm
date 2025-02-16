const express = require("express");
const {addEmployee, loginEmployee} = require("../controllers/employee");

const router = express.Router();

// Add Employee (Salon Admin Only)
router.post("/add-employee", addEmployee);

// Employee Login
router.post("/employee-login", loginEmployee);

module.exports = router;
