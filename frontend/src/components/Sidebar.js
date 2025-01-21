import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/clients"
              className="block py-2 px-4 rounded hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              Manage Clients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/bookings"
              className="block py-2 px-4 rounded hover:bg-gray-700"
              activeClassName="bg-gray-700"
            >
              Manage Bookings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
