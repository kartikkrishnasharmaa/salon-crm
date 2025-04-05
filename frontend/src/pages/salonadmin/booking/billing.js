import jsPDF from "jspdf";
import "jspdf-autotable";

const generateBill = (bookingSummary, customerData) => {
  // Create a new PDF instance
  const doc = new jsPDF();

  // Add a header with salon name and logo
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 40);
  doc.text("Unique Beauty Parlour", 15, 20);

  // Add a subtitle
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text("Booking Invoice", 15, 30);

  // Add a horizontal line
  doc.setDrawColor(200, 200, 200);
  doc.line(15, 35, 195, 35);

  // Add customer details
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text(`Customer Name: ${customerData.name} ${customerData.lastName}`, 15, 45);
  doc.text(`Email: ${customerData.email}`, 15, 55);
  doc.text(`Mobile: ${customerData.mobile}`, 15, 65); // Ensure mobile number is displayed

  // Add a unique bill number
  const billNumber = `INV-${Math.floor(Math.random() * 1000000)}`;
  doc.text(`Bill Number: ${billNumber}`, 15, 75);

  // Prepare data for the table
  const tableData = bookingSummary.map((booking) => [
    booking.service,
    booking.staff,
    `Rs. ${booking.price}`,
    booking.date,
    booking.time,
  ]);

  // Add the table to the PDF
  doc.autoTable({
    head: [["Service", "Staff", "Price", "Date", "Time"]],
    body: tableData,
    startY: 85, // Start the table below customer details
    theme: "striped", // Add striped theme for better readability
    headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] }, // Dark header with white text
    columnStyles: {
      0: { cellWidth: 50 }, // Service column width
      1: { cellWidth: 50 }, // Staff column width
      2: { cellWidth: 30 }, // Price column width
      3: { cellWidth: 40 }, // Date column width
      4: { cellWidth: 30 }, // Time column width
    },
  });

  // Add total bill amount
  const totalAmount = bookingSummary.reduce((total, booking) => total + booking.price, 0);
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text(`Total Bill: Rs. ${totalAmount}`, 15, doc.autoTable.previous.finalY + 20);

  // Add a footer with contact information
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Thank you for choosing Unique Beauty Parlour!", 15, doc.autoTable.previous.finalY + 35);
  doc.text("Contact us: +91 9876543210 | salonbliss@example.com", 15, doc.autoTable.previous.finalY + 45);
  doc.text("Address: 123 Beauty Street, City, Country", 15, doc.autoTable.previous.finalY + 55);

  // Add a horizontal line at the bottom
  doc.line(15, doc.autoTable.previous.finalY + 60, 195, doc.autoTable.previous.finalY + 60);

  // Save the PDF
  doc.save(`booking_bill_${billNumber}.pdf`);
};

export default generateBill;