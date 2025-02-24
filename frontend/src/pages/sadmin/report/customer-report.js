import SAAdminLayout from "../../../layouts/Salonadmin";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DataTable from "react-data-table-component";

// Generate dummy customer data
const generateDummyData = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        phone: `98765432${(i % 10) + 10}`,
        date: `2025-02-${String((i % 28) + 1).padStart(2, "0")}`,
    }));
};

const CustomerReport = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(generateDummyData(500)); // Simulating large dataset
    }, []);

    // Filter Data Based on Date Range
    const filteredData = data.filter((item) => {
        if (!startDate && !endDate) return true;
        const itemDate = new Date(item.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || itemDate >= start) && (!end || itemDate <= end);
    });

    // Export PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Customer Report", 20, 10);
        doc.autoTable({
            head: [["ID", "Name", "Email", "Phone", "Date"]],
            body: filteredData.map((item) => [
                item.id, 
                item.name, 
                item.email, 
                item.phone, 
                item.date
            ]),
        });
        doc.save("Customer_Report.pdf");
    };

    // Export Excel (XLSX)
    const exportExcel = () => {
        const worksheet = utils.json_to_sheet(filteredData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Customers");
        writeFile(workbook, "Customer_Report.xlsx");
    };

    // Clear Filters (Show Full Data)
    const clearFilters = () => {
        setStartDate("");
        setEndDate("");
    };

    // Table Columns
    const columns = [
        { name: "ID", selector: (row) => row.id, sortable: true },
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Phone", selector: (row) => row.phone, sortable: true },
        { name: "Date", selector: (row) => row.date, sortable: true },
    ];

    // **Fix for CSV Export (Avoid replace Error)**
    const csvHeaders = columns.map((col) => ({
        label: col.name,
        key: col.selector ? col.selector.toString().replace(/[^a-zA-Z]/g, "") : col.name,
    }));

    return (
        <SAAdminLayout>
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
                <h1 className="text-3xl font-bold mb-4">Customer Report</h1>

                {/* Filters & Export Buttons (Aligned in One Line) */}
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
                        filename="Customer_Report.csv" 
                        className="p-2 bg-blue-500 text-white rounded"
                    >
                        Export CSV
                    </CSVLink>
                    <button onClick={exportExcel} className="p-2 bg-green-500 text-white rounded">
                        Export Excel
                    </button>
                    <button onClick={exportPDF} className="p-2 bg-red-500 text-white rounded">
                        Export PDF
                    </button>
                </div>

                {/* Data Table */}
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    striped
                />
            </div>
        </SAAdminLayout>
    );
};

export default CustomerReport;
