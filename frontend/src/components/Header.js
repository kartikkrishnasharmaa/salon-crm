import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Salon Management</h1>
      <button
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
