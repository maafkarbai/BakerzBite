import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

const AdminLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Products', href: '/admin/products', icon: '📦' },
    { name: 'Inventory', href: '/admin/inventory', icon: '📋' },
    { name: 'Orders', href: '/admin/orders', icon: '🛍️' },
    { name: 'Customers', href: '/admin/customers', icon: '👥' },
    { name: 'Promotions', href: '/admin/promotions', icon: '🎯' },
    { name: 'Coupons', href: '/admin/coupons', icon: '🎟️' },
    { name: 'Delivery', href: '/admin/delivery', icon: '🚚' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
          <nav className="mt-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium
                    ${isActive 
                      ? 'bg-[#D65A31] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                    transition-colors duration-200
                  `}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 w-64 p-4 border-t">
            <Link
              to="/"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Store
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;