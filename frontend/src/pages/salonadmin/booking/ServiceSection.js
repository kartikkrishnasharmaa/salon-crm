import React, { useEffect, useState } from 'react';
import axios from '../../../api/axiosConfig';
import { useSelector } from 'react-redux';

const ServiceTable = ({ title, data, columns, onServiceSelect, search, onSearchChange, renderRow }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '10px',
        borderRadius: '5px 5px 0 0',
        margin: 0
      }}>
        {title}
      </h3>
      <div style={{
        border: '1px solid #dee2e6',
        borderRadius: '0 0 5px 5px',
        overflow: 'hidden',
        padding: '10px'
      }}>
        {onSearchChange && (
          <input
            type="text"
            placeholder="Search service name..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              marginBottom: '10px',
              padding: '8px 12px',
              width: '100%',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        )}

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              {columns.map((column, index) => (
                <th key={index} style={{
                  padding: '12px 15px',
                  textAlign: 'left',
                  borderBottom: '1px solid #dee2e6',
                  fontWeight: '600'
                }}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, i) => (
                <tr
                  key={item._id || item.id || i}
                  style={{
                    borderBottom: '1px solid #dee2e6',
                    cursor: onServiceSelect ? 'pointer' : 'default'
                  }}
                  onClick={() => onServiceSelect && onServiceSelect(item)}
                >
                  {renderRow ? renderRow(item, i) : (
                    <>
                      <td style={{ padding: '12px 15px' }}>{i + 1}</td>
                      <td style={{ padding: '12px 15px' }}>{item.serviceName}</td>
                      <td style={{ padding: '12px 15px' }}>₹{item.nonMemberPrice}</td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ padding: '12px', textAlign: 'center' }}>
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const ServiceSection = ({ onServiceSelect }) => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [frequentServices, setFrequentServices] = useState([]);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/service/get-services`, {
        params: { branchId: selectedBranch },
        headers: { Authorization: `Bearer ${token}` },
      });

      const services = response.data.services || [];
      setAllServices(services);
      setFilteredServices(services);

      // Pick up to 4 random services
      const randomServices = [...services]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setFrequentServices(randomServices);
    } catch (err) {
      console.error("Error fetching services", err);
    }
  };

  useEffect(() => {
    if (selectedBranch) {
      fetchServices();
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredServices(allServices);
    } else {
      const filtered = allServices.filter((s) =>
        s.serviceName?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchText, allServices]);

  const previousVisits = [
    { id: 1, date: "2025-06-01", services: "Hair Cut, Beard Trim", status: "Completed" },
    { id: 2, date: "2025-05-25", services: "Facial" },
    { id: 3, date: "2025-05-20", services: "Hair Spa"},
    { id: 4, date: "2025-05-10", services: "Hair Color"},
  ];


  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 2fr 2fr',
      gap: '25px',
      marginBottom: '20px'
    }}>
      <ServiceTable
        title="Frequently Used Services"
        data={frequentServices}
        columns={['Sr. No', 'Service Name', 'Price']}
        onServiceSelect={onServiceSelect}
      />
      <ServiceTable
        title="All Services"
        data={filteredServices}
        columns={['Sr. No', 'Service Name', 'Price']}
        onServiceSelect={onServiceSelect}
        search={searchText}
        onSearchChange={setSearchText}
      />
      <ServiceTable
        title="Previous Visits"
        data={previousVisits}
        columns={['Sr. No', 'Date', 'Services']}
        renderRow={(item, i) => (
          <>
            <td style={{ padding: '12px 15px' }}>{i + 1}</td>
            <td style={{ padding: '12px 15px' }}>{item.date}</td>
            <td style={{ padding: '12px 15px' }}>{item.services}</td>
          </>
        )}
      />


    </div>
  );
};

export default ServiceSection;
