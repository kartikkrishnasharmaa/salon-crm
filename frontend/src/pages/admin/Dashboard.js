import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const Dashboard = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>Welcome to the admin panel. Manage all salon activities here.</p>
    </AdminLayout>
  );
};

export default Dashboard;
