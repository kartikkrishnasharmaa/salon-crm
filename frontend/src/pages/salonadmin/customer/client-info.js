import { useLocation, useNavigate } from "react-router-dom";
import SAAdminLayout from "../../../layouts/Salonadmin";
import Tabs from "rc-tabs";
import "rc-tabs/assets/index.css";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaLock,
  FaMoneyBillWave,
  FaCreditCard,
  FaWallet,
  FaFileInvoice,
  FaFilter,
  FaFileExport,
  FaSearch,
  FaPrint,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { useState } from "react";
import ClientInfo from "./Information";
import MergeInfo from "./merge-client";
import Addprepaid from "./add-prepaid";
import AdvancePayment from "./advance-amount";
import Allcustomer from "./all-customer";
import Appointments from "./appointment";
import Giftcardredeem from "./gift-card-redeem";
import Giftcard from "./gift-card";
import Information from "./Information";
import Itemwiseapt from "./item-wise-appointment"
import MergeClient from "./merge-client"
import NewVisitDiscount from "./new-visit-discount"
import Outstanding from "./outstanding-invoice"
import PackageBalance from "./package-balance"
import PackageSale from "./package-sale"
import Prepaidcard from "./pre-paid-card"
import RewardsPoint from "./rewards-point"
import SecondaryClient from "./secondary-client"

function ClientDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const client = location.state?.client;

  const tabsStyle = `
  .custom-rc-tabs {
    margin: 0 16px;
        font-size: 13px;

  }
  .custom-rc-tabs .rc-tabs-nav-wrap {
    overflow: visible !important;
  }
  .custom-rc-tabs .rc-tabs-nav-list {
    display: flex;
    flex-wrap: wrap;
    overflow-x: visible;
    white-space: normal;
    gap:4px
  }
    .rc-tabs-tab-btn{
    line-height:13px
    }
  .custom-rc-tabs .rc-tabs-tab {
    padding: 8px 16px;
    margin: 0 8px 8px 0 !important;
    border-radius: 6px;
    transition: all 0.3s;
    border: none !important;
    white-space: nowrap;
  }
  .custom-rc-tabs .rc-tabs-tab:first-child {
    margin-left: 0 !important;
  }
  .custom-rc-tabs .rc-tabs-tab-active {
    background: #1890ff;
    color: white !important;
  }
  .custom-rc-tabs .rc-tabs-tab:not(.rc-tabs-tab-active) {
    background: #f5f5f5;
    color: #666;
  }
  .custom-rc-tabs .rc-tabs-ink-bar {
    background: #1890ff;
    height: 3px !important;
  }
  .custom-rc-tabs .rc-tabs-nav {
    margin-bottom: 16px;
    border-bottom: none !important;
  }
  .custom-rc-tabs .rc-tabs-content-holder {
    padding: 16px;
    border: 1px solid #f0f0f0;
    border-radius: 0 0 8px 8px;
  }
`;

  if (!client) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <p className="text-center text-red-500">No Client Data Found!</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Define AdvancePayment component outside
  function AdvancePayment({ client }) {
    const [activeTab, setActiveTab] = useState("take");
    const [amount, setAmount] = useState("");
    const [paymentMode, setPaymentMode] = useState("cash");
    const [cardNumber, setCardNumber] = useState("");
    const [cardType, setCardType] = useState("visa");
    const [walletBalance, setWalletBalance] = useState("0");
    const [showSuccess, setShowSuccess] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newTransaction = {
        id: transactions.length + 1,
        date: new Date().toLocaleDateString(),
        type: activeTab === "take" ? "Take Advance" : "Return Advance",
        amount,
        paymentMode,
        cardNumber: paymentMode === "card" ? cardNumber : "",
        cardType: paymentMode === "card" ? cardType : "",
        walletBalance,
      };
      setTransactions([...transactions, newTransaction]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setAmount("");
      setCardNumber("");
    };

    return (
      <div className="space-y-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "take"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("take")}
          >
            Take Advance
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "return"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("return")}
          >
            Return Advance
          </button>
        </div>

        {showSuccess && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">
              Transaction completed successfully.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Amount</label>
              <div className="flex items-center border p-2 rounded-md">
                <FaMoneyBillWave className="text-gray-500 mr-2" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border-none outline-none"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-2">Payment Mode</label>
              <div className="flex items-center border p-2 rounded-md">
                <FaCreditCard className="text-gray-500 mr-2" />
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full border-none outline-none"
                  required
                >
                  <option value="cash">Cash</option>
                  <option value="paytm">Paytm</option>
                  <option value="rtgs">RTGS</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
              </div>
            </div>
          </div>

          {paymentMode === "card" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">
                    Card Number (last 4 digits)
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => {
                      if (
                        e.target.value.length <= 4 &&
                        /^\d*$/.test(e.target.value)
                      ) {
                        setCardNumber(e.target.value);
                      }
                    }}
                    className="w-full border p-2 rounded-md"
                    placeholder="Last 4 digits"
                    maxLength={4}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Card Type</label>
                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    className="w-full border p-2 rounded-md"
                  >
                    <option value="visa">Visa</option>
                    <option value="mastercard">Master Card</option>
                    <option value="amex">Amex</option>
                    <option value="discover">Discover Card</option>
                    <option value="dinner">Dinner Card</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block font-semibold mb-2">Wallet Balance</label>
            <div className="flex items-center border p-2 rounded-md">
              <FaWallet className="text-gray-500 mr-2" />
              <input
                type="text"
                value={walletBalance}
                readOnly
                className="w-full border-none bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={() => {
                setAmount("");
                setCardNumber("");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>

        {transactions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Type</th>
                    <th className="py-2 px-4 border">Amount</th>
                    <th className="py-2 px-4 border">Payment Mode</th>
                    <th className="py-2 px-4 border">Card Details</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border text-center">
                        {txn.date}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {txn.type}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        ₹{txn.amount}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {txn.paymentMode}
                      </td>
                      <td className="py-2 px-4 border text-center">
                        {txn.paymentMode === "card"
                          ? `${txn.cardType} ****${txn.cardNumber}`
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Define PaymentHistory component outside
  function PaymentHistory({ client }) {
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [exportFormat, setExportFormat] = useState("");
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [refundReason, setRefundReason] = useState("");

    // Sample payment data
    const [payments, setPayments] = useState([
      {
        id: 1,
        date: "2023-05-15",
        time: "10:30 AM",
        appointmentId: "APT-001",
        services: "Haircut, Coloring",
        amount: 2500,
        tax: 375,
        discount: 200,
        total: 2675,
        paymentMode: "card",
        cardLast4: "4242",
        status: "success",
        invoiceNo: "INV-2023-001",
        isRefunded: false,
      },
      {
        id: 2,
        date: "2023-06-20",
        time: "02:15 PM",
        appointmentId: "APT-002",
        services: "Manicure, Pedicure",
        amount: 1800,
        tax: 270,
        discount: 0,
        total: 2070,
        paymentMode: "upi",
        status: "success",
        invoiceNo: "INV-2023-002",
        isRefunded: false,
      },
      {
        id: 3,
        date: "2023-07-10",
        time: "11:00 AM",
        appointmentId: "APT-003",
        services: "Facial, Waxing",
        amount: 3200,
        tax: 480,
        discount: 300,
        total: 3380,
        paymentMode: "cash",
        status: "pending",
        invoiceNo: "INV-2023-003",
        isRefunded: false,
      },
      {
        id: 4,
        date: "2023-08-05",
        time: "04:45 PM",
        appointmentId: "APT-004",
        services: "Hair Treatment",
        amount: 4200,
        tax: 630,
        discount: 500,
        total: 4330,
        paymentMode: "wallet",
        status: "failed",
        invoiceNo: "INV-2023-004",
        isRefunded: true,
        refundAmount: 4330,
        refundDate: "2023-08-06",
        refundReason: "Service not satisfactory",
      },
    ]);

    const filteredPayments = payments.filter((payment) => {
      // Filter by status
      if (filter !== "all" && payment.status !== filter) return false;

      // Search filter
      if (
        searchTerm &&
        !payment.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !payment.appointmentId.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    const handleRefund = () => {
      if (!selectedTransaction || !refundReason) return;

      const updatedPayments = payments.map((payment) => {
        if (payment.id === selectedTransaction.id) {
          return {
            ...payment,
            isRefunded: true,
            refundAmount: payment.total,
            refundDate: new Date().toISOString().split("T")[0],
            refundReason,
            status: "refunded",
          };
        }
        return payment;
      });

      setPayments(updatedPayments);
      setShowRefundModal(false);
      setRefundReason("");
      setSelectedTransaction(null);
    };

    const handleExport = () => {
      if (!exportFormat) return;
      alert(`Exporting data as ${exportFormat.toUpperCase()}`);
      // In a real app, you would generate and download the file here
    };

    const getStatusColor = (status) => {
      switch (status) {
        case "success":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "failed":
          return "bg-red-100 text-red-800";
        case "refunded":
          return "bg-blue-100 text-blue-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    const outstandingBalance = 1500; // This would be calculated in a real app

    return (
      <div className="space-y-6">
        {/* Client Information Header */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold">Client Information</h3>
              <p>{client.name}</p>
              <p>{client.email}</p>
              <p>{client.number}</p>
            </div>
            <div>
              <h3 className="font-semibold">Total Spent</h3>
              <p className="text-2xl font-bold">
                ₹
                {payments.reduce(
                  (sum, p) => sum + (p.isRefunded ? 0 : p.total),
                  0
                )}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Outstanding Balance</h3>
              <p
                className={`text-2xl font-bold ${
                  outstandingBalance > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                ₹{Math.abs(outstandingBalance)}{" "}
                {outstandingBalance > 0 ? "(Due)" : "(Credit)"}
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search invoices..."
              className="pl-10 w-full border p-2 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center border p-2 rounded-md">
              <FaFilter className="text-gray-500 mr-2" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full border-none outline-none"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex items-center border p-2 rounded-md">
              <FaFileExport className="text-gray-500 mr-2" />
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full border-none outline-none"
              >
                <option value="">Export Format</option>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>
          <div>
            <button
              onClick={handleExport}
              disabled={!exportFormat}
              className={`w-full flex items-center justify-center p-2 rounded-md ${
                exportFormat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <FaFileExport className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border text-left">Date/Time</th>
                <th className="py-3 px-4 border text-left">Appointment ID</th>
                <th className="py-3 px-4 border text-left">Services</th>
                <th className="py-3 px-4 border text-left">Amount</th>
                <th className="py-3 px-4 border text-left">Payment Mode</th>
                <th className="py-3 px-4 border text-left">Status</th>
                <th className="py-3 px-4 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border">
                      <div>{payment.date}</div>
                      <div className="text-sm text-gray-500">
                        {payment.time}
                      </div>
                    </td>
                    <td className="py-3 px-4 border">
                      {payment.appointmentId}
                    </td>
                    <td className="py-3 px-4 border">
                      <div className="line-clamp-1">{payment.services}</div>
                    </td>
                    <td className="py-3 px-4 border">
                      <div className="font-semibold">₹{payment.total}</div>
                      {payment.isRefunded && (
                        <div className="text-sm text-red-500">
                          Refunded: ₹{payment.refundAmount}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 border">
                      <div className="flex items-center">
                        {payment.paymentMode === "card" && (
                          <FaCreditCard className="mr-2 text-blue-500" />
                        )}
                        {payment.paymentMode === "upi" && (
                          <FaWallet className="mr-2 text-purple-500" />
                        )}
                        {payment.paymentMode === "cash" && (
                          <FaMoneyBillWave className="mr-2 text-green-500" />
                        )}
                        {payment.paymentMode === "wallet" && (
                          <FaWallet className="mr-2 text-orange-500" />
                        )}
                        {payment.paymentMode === "card"
                          ? `Card ****${payment.cardLast4}`
                          : payment.paymentMode.charAt(0).toUpperCase() +
                            payment.paymentMode.slice(1)}
                      </div>
                    </td>
                    <td className="py-3 px-4 border">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 border">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="View Invoice"
                        >
                          <FaFileInvoice />
                        </button>
                        <button
                          className="p-1 text-green-600 hover:text-green-800"
                          title="Print"
                        >
                          <FaPrint />
                        </button>
                        <button
                          className="p-1 text-purple-600 hover:text-purple-800"
                          title="Email Receipt"
                        >
                          <FaEnvelopeOpenText />
                        </button>
                        {!payment.isRefunded &&
                          payment.status === "success" && (
                            <button
                              className="p-1 text-red-600 hover:text-red-800"
                              title="Refund"
                              onClick={() => {
                                setSelectedTransaction(payment);
                                setShowRefundModal(true);
                              }}
                            >
                              Refund
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No payments found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Payment Breakdown Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Payment Methods</h3>
            <div className="space-y-2">
              {["cash", "card", "upi", "wallet"].map((method) => {
                const count = payments.filter(
                  (p) => p.paymentMode === method
                ).length;
                return count > 0 ? (
                  <div key={method} className="flex justify-between">
                    <span>
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </span>
                    <span>
                      {count} ({Math.round((count / payments.length) * 100)}%)
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Tax Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Tax Collected</span>
                <span>
                  ₹
                  {payments.reduce(
                    (sum, p) => sum + (p.isRefunded ? 0 : p.tax),
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Average Tax Rate</span>
                <span>18%</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Discounts Given</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Discounts</span>
                <span>
                  ₹
                  {payments.reduce(
                    (sum, p) => sum + (p.isRefunded ? 0 : p.discount),
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discounts per Visit</span>
                <span>
                  ₹
                  {Math.round(
                    payments.reduce(
                      (sum, p) => sum + (p.isRefunded ? 0 : p.discount),
                      0
                    ) / payments.length
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Modal */}
        {showRefundModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Process Refund</h3>
              <div className="mb-4">
                <p className="font-medium">
                  Appointment: {selectedTransaction.appointmentId}
                </p>
                <p className="font-medium">
                  Amount: ₹{selectedTransaction.total}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {selectedTransaction.date}
                </p>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Refund Reason
                </label>
                <textarea
                  className="w-full border p-2 rounded-md"
                  rows="3"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="Enter reason for refund..."
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowRefundModal(false);
                    setRefundReason("");
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRefund}
                  disabled={!refundReason}
                  className={`px-4 py-2 rounded-md ${
                    refundReason
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  Confirm Refund
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ... (Keep all your existing component functions: ClientInfo, AdvancePayment, PaymentHistory)

  const tabItems = [
    { key: "info", label: "Info", content: <ClientInfo client={client} /> },
    {
      key: "Merge_client",
      label: "Merge Client",
      content: <MergeInfo client={client} />,
    },
    {
      key: "appointments",
      label: "All Appointments",
      content: <PaymentHistory client={client} />,
    },
    {
      key: "Item Wise All All Appointments",
      label: "Item Wise All Appointments",
      content: <PaymentHistory client={client} />,
    },
    {
      key: "NoshowCancelAppointment",
      label: "No-show/Cancel",
      content: <PaymentHistory client={client} />,
    },
    {
      key: "products",
      label: "Products",
      content: <p>Purchased products will be shown here.</p>,
    },
    {
      key: "membership",
      label: "Membership",
      content: <p>Membership details.</p>,
    },
    {
      key: "package sale",
      label: "Package Sale",
      content: <PackageSale client={client} />,
    },
    {
      key: "package balance",
      label: "Package Balance",
      content: <p>Package Balance.</p>,
    },
    {
      key: "outstanding invoice",
      label: "Outstanding Invoice",
      content: <Outstanding client={client} />,
    },
    {
      key: "add prepaid card",
      label: "Add prepaid Card",
      content: <p>Add Prepaid card.</p>,
    },
    { key: "gift card", label: "Gift Card", content: <p>Gift Card.</p> },
    {
      key: "gift card redeem",
      label: "Gift Card Redeem",
      content: <p>gift card redeem</p>,
    },
    {
      key: "pre-paid card",
      label: "Prepaid Card",
      content: <p>Prepaid Card.</p>,
    },
    {
      key: "rewards point",
      label: "Rewards Point",
      content: <p>Rewards point</p>,
    },
    {
      key: "advance_amount",
      label: "Advance Amount",
      content: <AdvancePayment client={client} />,
    },
    {
      key: "New Visit Discount",
      label: "New Visit Discount",
      content: <NewVisitDiscount client={client} />,
    },
    {
      key: "Secondary Client",
      label: "Secondary Client",
      content: <SecondaryClient client={client} />,
    },
  ];

  return (
    <SAAdminLayout>
      <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Client Details
          </h1>

          <div className="flex justify-center">
            <div className="w-full">
              <style>{tabsStyle}</style>

              <Tabs
                defaultActiveKey="info"
                tabPosition="top"
                className="custom-rc-tabs"
                items={tabItems.map(({ key, label, content }) => ({
                  key,
                  label,
                  children: content,
                }))}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">
              Save
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-500 text-white ml-4 px-4 py-2 rounded-md"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </SAAdminLayout>
  );
}

export default ClientDetails;
