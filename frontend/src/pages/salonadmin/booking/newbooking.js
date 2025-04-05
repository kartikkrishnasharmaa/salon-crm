import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../api/axiosConfig";
import { FaPlus } from "react-icons/fa";
import { Tabs, Tab, TextField, Button, Box, Paper } from "@mui/material";

const SalonBookingPage = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentDetails, setPaymentDetails] = useState({});
  const token = localStorage.getItem("token");
  const [details, setDetails] = useState({});

  const handleChange = (event, newValue) => {
    setPaymentMethod(newValue);
    setDetails({}); // Reset details on tab change
  };
  useEffect(() => {
    if (!selectedBranch || !token) return;
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `/employee/all/employees?branchId=${selectedBranch}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Employees:", res.data);
        setEmployees(res.data?.employees || []);
      } catch (error) {
        console.error("Error fetching employees", error);
        setEmployees([]);
      }
    };
    fetchEmployees();
  }, [selectedBranch, token]);

  // 🔹 Fetch Customers
  useEffect(() => {
    if (!selectedBranch || !token) return;
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(
          `/customer/salon/customers?branchId=${selectedBranch}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Customers:", res.data);
        setCustomers(res.data?.customers || []);
        setFilteredCustomers(res.data?.customers || []);
      } catch (error) {
        console.error("Error fetching customers", error);
        setCustomers([]);
        setFilteredCustomers([]);
      }
    };
    fetchCustomers();
  }, [selectedBranch, token]);

  // 🔹 Fetch Services
  useEffect(() => {
    if (!selectedBranch || !token) return;
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `/service/get-services?branchId=${selectedBranch}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setServices(res.data?.services || []);
      } catch (error) {
        console.error("Error fetching services", error);
        setServices([]);
      }
    };
    fetchServices();
  }, [selectedBranch, token]);

  const handleCustomerSearch = (e) => {
    const value = e.target.value;
    setCustomerSearch(value);
    // Phone number must be exactly 10 digits
    if (value.length !== 10) {
      setFilteredCustomers([]);
      setSelectedCustomer("");
      return;
    }

    // Find exact match
    const matchedCustomer = customers.find((c) => String(c.phone) === value); // ✅ Convert to string
    if (matchedCustomer) {
      setSelectedCustomer(matchedCustomer._id);
      setFilteredCustomers([matchedCustomer]);
    } else {
      setFilteredCustomers([]);
      setSelectedCustomer("");
    }
  };

  const handleBookingSubmit = () => {
    if (
      !selectedCustomer ||
      !selectedEmployee ||
      !selectedService ||
      !date ||
      !startTime ||
      !endTime
    ) {
      toast.error("All fields are required!");
      return;
    }

    axios
      .post(
        "/order/create-order",
        {
          customerId: selectedCustomer, // ✅ Fixed key
          employeeId: selectedEmployee, // ✅ Ensure correct key name
          serviceId: selectedService, // ✅ Ensure correct key name
          price,
          discount,
          date,
          startTime,
          branchId: selectedBranch, // Ensure `_id` is sent
          endTime,
          paymentMethod, // Ensure this is included
          paymentDetails,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("API Response:", res.data);

        toast.success("Order Created Successfully!");
        setBookings([
          ...bookings,
          {
            customer: selectedCustomer,
            employee: selectedEmployee,
            service: selectedService,
            price,
            discount,
            date,
            startTime,
            endTime,
          },
        ]);
      })
      .catch((error) => toast.error("Order Creation Failed!"));
  };

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "Debit Card":
      case "Credit Card":
        return (
          <>
            <TextField
              label="Card Number"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={(e) =>
                setDetails({ ...details, cardNumber: e.target.value })
              }
            />
            <TextField
              label="Expiry Date"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={(e) =>
                setDetails({ ...details, expiryDate: e.target.value })
              }
            />
            {paymentMethod === "Credit Card" && (
              <TextField
                label="CVV"
                fullWidth
                variant="outlined"
                margin="normal"
                onChange={(e) =>
                  setDetails({ ...details, cvv: e.target.value })
                }
              />
            )}
          </>
        );
      case "UPI":
      case "Paytm":
      case "PhonePe":
      case "Google Pay":
        return (
          <TextField
            label={`${paymentMethod} ID`}
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={(e) => setDetails({ ...details, upiId: e.target.value })}
          />
        );
      default:
        return <p>No details required for Cash payment.</p>;
    }
  };

  return (
    <SAAdminLayout>
      <div className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Create New Order</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* 🔹 Customer Selection with Search */}

          <div>
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={customerSearch}
              onChange={handleCustomerSearch}
              className="w-full p-2 border rounded mb-2"
              maxLength={10} // ✅ Added
            />
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Customer</option>
              {filteredCustomers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} ({c.phone})
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e._id} value={e._id}>
                {e.name}
              </option>
            ))}
          </select>
          {/* 🔹 Services Dropdown */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} - ₹{s.price}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* <label>Payment Method:</label>
        <select onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Cash">Cash</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Credit Card">Credit Card</option>
          <option value="UPI">UPI</option>
          <option value="Paytm">Paytm</option>
          <option value="PhonePe">PhonePe</option>
          <option value="Google Pay">Google Pay</option>
        </select> */}

        <Paper elevation={3} className="p-6 rounded-lg max-w mx-auto mt-6">
          <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
          <Tabs
            value={paymentMethod}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {[
              "Cash",
              "Debit Card",
              "Credit Card",
              "UPI",
              "Paytm",
              "PhonePe",
              "Google Pay",
            ].map((method) => (
              <Tab key={method} label={method} value={method} />
            ))}
          </Tabs>
          <Box mt={3}>{renderPaymentFields()}</Box>
          {paymentMethod !== "Cash" && (
            <TextField
              label="Transaction ID"
              fullWidth
              variant="outlined"
              margin="normal"
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  transactionId: e.target.value,
                })
              }
            />
          )}
          <div className="flex gap-4 mt-4">
            <Button
              variant="contained"
              color="success"
              onClick={() => handleBookingSubmit()}
            >
              OK
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => toast.info("Cancelled")}
            >
              Cancel
            </Button>
          </div>
        </Paper>
      </div>

      <ToastContainer />
    </SAAdminLayout>
  );
};

export default SalonBookingPage;
