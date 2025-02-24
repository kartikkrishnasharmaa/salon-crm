import SAAdminLayout from "../../../layouts/Salonadmin";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DataTable from "react-data-table-component";

// Generate Dummy Employee Data
const generateDummyEmployees = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Employee ${i + 1}`,
        role: i % 2 === 0 ? "Hair Stylist" : "Receptionist",
        salary: `${(i % 10) * 1000 + 15000} INR`,
        contact: `98765432${(i % 10) + 10}`,
        dateJoined: `2024-02-${String((i % 28) + 1).padStart(2, "0")}`, // Random Dates
    }));
};

const EmployeeReport = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // Store filtered data

    useEffect(() => {
        const employeeData = generateDummyEmployees(200);
        setData(employeeData);
        setFilteredData(employeeData);
    }, []);

    // Function to filter data based on date range
    const filterDataByDate = () => {
        if (!startDate && !endDate) {
            setFilteredData(data); // Show all data if no date selected
            return;
        }

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const filtered = data.filter(item => {
            const itemDate = new Date(item.dateJoined);
            return (!start || itemDate >= start) && (!end || itemDate <= end);
        });

        setFilteredData(filtered);
    };

    // Function to reset filters
    const resetFilters = () => {
        setStartDate("");
        setEndDate("");
        setFilteredData(data);
    };

    // Export PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Employee Report", 20, 10);
        doc.autoTable({
            head: [["ID", "Name", "Role", "Salary", "Contact", "Date Joined"]],
            body: filteredData.map(item => [
                item.id, item.name, item.role, item.salary, item.contact, item.dateJoined
            ]),
        });
        doc.save("Employee_Report.pdf");
    };

    // Export Excel (XLSX)
    const exportExcel = () => {
        const worksheet = utils.json_to_sheet(filteredData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Employees");
        writeFile(workbook, "Employee_Report.xlsx");
    };

    // Table Columns
    const columns = [
        { name: "ID", selector: row => row.id, sortable: true },
        { name: "Name", selector: row => row.name, sortable: true },
        { name: "Role", selector: row => row.role, sortable: true },
        { name: "Salary", selector: row => row.salary, sortable: true },
        { name: "Contact", selector: row => row.contact, sortable: true },
        { name: "Date Joined", selector: row => row.dateJoined, sortable: true },
    ];

    // Fix CSV Headers
    const csvHeaders = [
        { label: "ID", key: "id" },
        { label: "Name", key: "name" },
        { label: "Role", key: "role" },
        { label: "Salary", key: "salary" },
        { label: "Contact", key: "contact" },
        { label: "Date Joined", key: "dateJoined" },
    ];

    return (
        <SAAdminLayout>
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
                <h1 className="text-3xl font-bold mb-4">Employee Report</h1>

                {/* Filters & Buttons (Aligned in One Line) */}
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
                    <button onClick={filterDataByDate} className="p-2 bg-blue-500 text-white rounded">
                        Filter
                    </button>
                    <button onClick={resetFilters} className="p-2 bg-gray-500 text-white rounded">
                        Reset
                    </button>
                    <CSVLink data={filteredData} headers={csvHeaders} filename="Employee_Report.csv" className="p-2 bg-blue-500 text-white rounded">
                        Export CSV
                    </CSVLink>
                    <button onClick={exportExcel} className="p-2 bg-green-500 text-white rounded">Export Excel</button>
                    <button onClick={exportPDF} className="p-2 bg-red-500 text-white rounded">Export PDF</button>
                </div>

                {/* Data Table */}
                <DataTable columns={columns} data={filteredData} pagination highlightOnHover striped />
            </div>
        </SAAdminLayout>
    );
};

export default EmployeeReport;
