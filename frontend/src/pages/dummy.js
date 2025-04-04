import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaMapMarkerAlt } from "react-icons/fa";
import Tabs from "rc-tabs";
import "rc-tabs/assets/index.css";
function AllProducts() {
  return (
    <SAAdminLayout>
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl space-y-6">
          <div className="flex justify-center mb-6">
            <FaMapMarkerAlt className="text-5xl text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Office Location Details
          </h1>
          <Tabs
            defaultActiveKey="1"
            className="custom-tabs gap-5" // Add this
            items={[
              {
                key: "1",
                label: "Info",
                children: (
                  <>
                    <h2 className="text-xl font-bold mt-9">brancd name </h2>
                  </>
                ),
              },
              {
                key: "2",
                className: "ml-4",
                label: "Location",
                children: (
                  <div>
                    <div>
                      <div>
                        <h2 className="text-xl font-bold mt-9">
                          Location name{" "}
                        </h2>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </SAAdminLayout>
  );
}

export default AllProducts;
