import { useState } from 'react';
import SidebarLink from './SidebarLink';
import { FaHome, FaShoppingBag, FaUsers, FaChartBar, FaCog, FaUserCheck } from 'react-icons/fa';

const Sidebar = () => {
  const [active, setActive] = useState('dashboard');
  
  return (
    <div className="w-64 bg-white shadow-md h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      
      {/* Sidebar Navigation */}
      <nav className="px-2 py-4">
        <SidebarLink
          Icon={FaHome}
          label="Dashboard"
          to="/dashboard"
          active={active === 'dashboard'}
          onClick={() => setActive('dashboard')}
        />
        <SidebarLink
          Icon={FaShoppingBag}
          label="Products"
          to="/dashboard/products"
          active={active === 'products'}
          onClick={() => setActive('products')}
        />
        <SidebarLink
          Icon={FaUsers}
          label="Customers"
          to="/dashboard/customers"
          active={active === 'customers'}
          onClick={() => setActive('customers')}
        />
        <SidebarLink
          Icon={FaUserCheck}
          label="Suppliers"
          to="/dashboard/suppliers"
          active={active === 'suppliers'}
          onClick={() => setActive('suppliers')}
        />
        <SidebarLink
          Icon={FaChartBar}
          label="Analytics"
          to="/dashboard/analytics"
          active={active === 'analytics'}
          onClick={() => setActive('analytics')}
        />
        <SidebarLink
          Icon={FaCog}
          label="Settings"
          to="/dashboard/settings"
          active={active === 'settings'}
          onClick={() => setActive('settings')}
        />
      </nav>
    </div>
  );
};

export default Sidebar;