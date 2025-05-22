import React from 'react';

const ServiceTable = ({ title, data, columns, onServiceSelect }) => {
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
        overflow: 'hidden'
      }}>
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
            {data.map((item) => (
              <tr 
                key={item.id} 
                style={{ 
                  borderBottom: '1px solid #dee2e6',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f8f9fa'
                  }
                }}
                onClick={() => onServiceSelect && onServiceSelect(item)}
              >
                {Object.values(item).map((value, index) => (
                  <td key={index} style={{ 
                    padding: '12px 15px', 
                    borderBottom: '1px solid #dee2e6'
                  }}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ServiceSection = ({ onServiceSelect }) => {
  const frequentServices = [
    { id: 1, name: "Hair Cut", duration: "30 mins", price: "₹300", frequency: "Daily" },
    { id: 2, name: "Hair Color", duration: "60 mins", price: "₹800", frequency: "Weekly" },
    { id: 3, name: "Hair Spa", duration: "45 mins", price: "₹600", frequency: "Daily" }
  ];

  const allServices = [
    { id: 1, name: "Hair Cut",  price: "₹300" },
    { id: 2, name: "Hair Color", price: "₹800" },
    { id: 3, name: "Hair Spa",  price: "₹600" }
  ];

  const previousVisits = [
    { id: 1, date: "15/05/2023", services: "Hair Cut", status: "Completed" },
    { id: 2, date: "10/05/2023", services: "Hair Color",status: "Completed" },
    { id: 3, date: "05/05/2023", services: "Facial", status: "Completed" },
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
        columns={['Sr. No','Service', 'Duration', 'Price','Frequency']}
        onServiceSelect={onServiceSelect}
      />
      <ServiceTable 
        title="All Services" 
        data={allServices} 
        columns={['Sr. No','Service Name','Price']}
        onServiceSelect={onServiceSelect}
      />
      <ServiceTable 
        title="Previous Visits" 
        data={previousVisits} 
        columns={['Sr. No','Date', 'Services', 'Status']}
      />
    </div>
  );
};

export default ServiceSection;