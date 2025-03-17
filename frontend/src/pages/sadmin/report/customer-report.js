import SAAdminLayout from "../../../layouts/Salonadmin";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DataTable from "react-data-table-component";
import axios from "../../../api/axiosConfig";

const CustomerReport = () => {
    const selectedBranch = useSelector(state => state.branch.selectedBranch);
    const [customers, setCustomers] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [whatsappNumbers, setWhatsappNumbers] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");

    useEffect(() => {
        if (selectedBranch) {
            axios.get(`/customer/salon/customers?branchId=${selectedBranch}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(res => {
                if (res.data && Array.isArray(res.data.customers)) {
                    setCustomers(res.data.customers);
                } else {
                    setCustomers([]);
                }
            })
            .catch(() => setCustomers([]));
        }
    }, [selectedBranch]);

    const filteredData = customers.filter((item) => {
        if (!startDate && !endDate) return true;
        const itemDate = new Date(item.createdAt);
        return (!startDate || itemDate >= new Date(startDate)) && (!endDate || itemDate <= new Date(endDate));
    });

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Customer Report", 20, 10);
        doc.autoTable({
            head: [["ID", "Name", "Email", "Phone", "Date"]],
            body: filteredData.map((item, index) => [
                index + 1, item.name, item.email, item.phone, new Date(item.createdAt).toLocaleDateString()
            ]),
        });
        const pdfBlob = doc.output("blob");
        const pdfFile = new File([pdfBlob], "Customer_Report.pdf", { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfFile);
        setPdfUrl(pdfUrl);
        doc.save("Customer_Report.pdf");
    };

    const exportExcel = () => {
        const worksheet = utils.json_to_sheet(filteredData.map((item, index) => ({
            ID: index + 1,
            Name: item.name,
            Email: item.email,
            Phone: item.phone,
            Date: new Date(item.createdAt).toLocaleDateString(),
        })));
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Customers");
        writeFile(workbook, "Customer_Report.xlsx");
    };

    const shareOnWhatsApp = () => {
        if (!pdfUrl) {
            alert("Please generate the PDF first!");
            return;
        }
        const numbers = whatsappNumbers.split(",").map(num => num.trim()).filter(num => num);
        numbers.forEach(number => {
            window.open(`https://wa.me/${number}?text=Customer Report: ${pdfUrl}`, "_blank");
        });
    };

    return (
        <SAAdminLayout>
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
                <h1 className="text-3xl font-bold mb-4">Customer Report</h1>
                <div className="mb-4 flex flex-wrap gap-2 items-center">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded" />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded" />
                    <CSVLink data={filteredData} filename="Customer_Report.csv" className="p-2 bg-blue-500 text-white rounded">Export CSV</CSVLink>
                    <button onClick={exportExcel} className="p-2 bg-green-500 text-white rounded">Export Excel</button>
                    <button onClick={generatePDF} className="p-2 bg-red-500 text-white rounded">Export PDF</button>
                </div>
                <div className="mb-4 flex gap-2 items-center">
                    <input type="text" placeholder="Enter WhatsApp Numbers (comma separated)" value={whatsappNumbers} onChange={(e) => setWhatsappNumbers(e.target.value)} className="p-2 border rounded w-full" />
                    <button onClick={shareOnWhatsApp} className="p-2 bg-green-500 text-white rounded">WhatsApp पर भेजें</button>
                </div>
                {filteredData.length === 0 ? (
                    <p className="text-red-500 text-center">⚠ No records to display.</p>
                ) : (
                    <DataTable columns={[{ name: "ID", selector: (_, index) => index + 1, sortable: true }, { name: "Name", selector: row => row.name, sortable: true }, { name: "Email", selector: row => row.email, sortable: true }, { name: "Phone", selector: row => row.phone, sortable: true }, { name: "Date", selector: row => new Date(row.createdAt).toLocaleDateString(), sortable: true }]} data={filteredData} pagination highlightOnHover striped />
                )}
            </div>
        </SAAdminLayout>
    );
};

export default CustomerReport;