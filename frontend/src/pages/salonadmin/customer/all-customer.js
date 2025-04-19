import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaSearch, FaEdit, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useRef } from "react"; // ✅ Add this import

// Inside your AllProducts function:

// Add these scroll handlers:


const dummyData = [
    { id: 1, name: "Priya Sharma", number: "9876543210", email: "priya.sharma@example.com", gender: "Female", address: "Delhi, India" },
    { id: 2, name: "Rohit Kumar", number: "8765432109", email: "rohit.kumar@example.com", gender: "Male", address: "Mumbai, India" },
    { id: 3, name: "Anjali Verma", number: "7654321098", email: "anjali.verma@example.com", gender: "Female", address: "Bangalore, India" },
    { id: 4, name: "Amit Singh", number: "6543210987", email: "amit.singh@example.com", gender: "Male", address: "Kolkata, India" },

];

function AllProducts() {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();
    const scrollRef = useRef(null); // ✅ Create a reference to scrollable div
    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value) {
            const results = dummyData.filter(
                (item) => item.name.toLowerCase().includes(value.toLowerCase()) || item.number.includes(value)
            );
            setFilteredData(results.length > 0 ? results : []);
        } else {
            setFilteredData([]);
        }
    };

    const handleSelect = (client) => {
        navigate(`/salonadmin/client-info/${client.id}`, { state: { client } }); // ✅ Correctly pass client data
    };

    return (
        <SAAdminLayout>
            <div className="flex justify-center items-center bg-gray-100 p-4">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full space-y-6">
                    <h1 className="text-2xl font-bold text-center text-gray-800">Search Client</h1>
                    <div className="w-full">
                        <div>
                            <input
                                type="text"
                                placeholder="Search by Name or Number"
                                value={search}
                                onChange={handleSearch}
                                className="w-full p-3 border rounded-md"
                            />
                            <FaSearch className="absolute right-3 top-4 text-gray-400" />

                        </div>
                        {search && (
                            <div ref={scrollRef}
                                className="border rounded-md bg-white shadow-md max-h-60 overflow-y-auto mt-2">
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-3 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                                            onClick={() => handleSelect(item)}
                                        >
                                            <span>{item.name} - {item.number}</span>
                                            <FaEdit className="text-blue-500 cursor-pointer" />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-red-500 p-3">No Data Found</p>
                                )}
                            </div>
                        )}
                        <div className="flex justify-center space-x-4 mt-2">
                            <button
                                onClick={scrollToTop}
                                className="bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600"
                                title="Scroll to Top"
                            >
                                <FaArrowUp />
                            </button>
                            <button
                                onClick={scrollToBottom}
                                className="bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600"
                                title="Scroll to Bottom"
                            >
                                <FaArrowDown />
                            </button>
                        </div>


                    </div>

                </div>
            </div>
        </SAAdminLayout>
    );
}

export default AllProducts;