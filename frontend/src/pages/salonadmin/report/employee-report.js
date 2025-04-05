import SAAdminLayout from "../../../layouts/Salonadmin";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DataTable from "react-data-table-component";
import axios from "../../../api/axiosConfig";

const EmployeeReport = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const [employees, setEmployees] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (selectedBranch) {
      console.log("Fetching Employees for Branch ID:", selectedBranch);

      axios
        .get(`/employee/all/employees?branchId=${selectedBranch}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          console.log("API Response:", res.data);
          if (res.data && Array.isArray(res.data.employees)) {
            setEmployees(res.data.employees);
          } else {
            console.error("Error: Employees data format is incorrect");
            setEmployees([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
          setEmployees([]);
        });
    }
  }, [selectedBranch]);

  const filteredData = employees.filter((item) => {
    if (!startDate && !endDate) return true;
    const itemDate = new Date(item.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (!start || itemDate >= start) && (!end || itemDate <= end);
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Report", 20, 10);
    doc.autoTable({
      head: [["ID", "Name", "Email", "Phone", "Role", "Date"]],
      body: filteredData.map((item, index) => [
        index + 1,
        item.name,
        item.email,
        item.phone,
        item.role,
        new Date(item.createdAt).toLocaleDateString(),
      ]),
    });
    doc.save("Employee_Report.pdf");
  };

  const exportExcel = () => {
    const worksheet = utils.json_to_sheet(
      filteredData.map((item, index) => ({
        ID: index + 1,
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        Role: item.role,
        Date: new Date(item.createdAt).toLocaleDateString(),
      }))
    );

    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Employees");
    writeFile(workbook, "Employee_Report.xlsx");
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  const columns = [
    { name: "ID", selector: (_, index) => index + 1, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  const csvHeaders = columns.map((col) => ({
    label: col.name,
    key: col.selector
      ? col.selector.toString().replace(/[^a-zA-Z]/g, "")
      : col.name,
  }));

  return (
    <SAAdminLayout>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold mb-4">Employee Report</h1>
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={clearFilters}
            className="p-2 bg-gray-500 text-white rounded"
          >
            Clear Filters
          </button>
          <CSVLink
            data={filteredData}
            headers={csvHeaders}
            filename="Employee_Report.csv"
            className="p-2 bg-blue-500 text-white rounded"
          >
            Export CSV
          </CSVLink>
          <button
            onClick={exportExcel}
            className="p-2 bg-green-500 text-white rounded"
          >
            Export Excel
          </button>
          <button
            onClick={exportPDF}
            className="p-2 bg-red-500 text-white rounded"
          >
            Export PDF
          </button>
        </div>
        {filteredData.length === 0 ? (
          <p className="text-red-500 text-center">⚠ No records to display.</p>
        ) : (
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            striped
          />
        )}
      </div>
    </SAAdminLayout>
  );
};

export default EmployeeReport;
