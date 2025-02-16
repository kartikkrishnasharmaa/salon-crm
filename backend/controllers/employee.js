const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");

// Add Employee (Salon Admin Only)
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, phone, role, salonId,password, branchId } = req.body;
    const employee = new Employee({ name, email, phone,password, role, salonId, branchId });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// login employee
exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({
        email,
        password,
        });
    if (!employee) {
        return res.status(400).json({ error: "Invalid credentials" });
        }
    const token = jwt.sign({ employeeId: employee._id }, process.env.JWT_SECRET);
    res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
