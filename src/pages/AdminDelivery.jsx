import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

function AdminDelivery() {
  const { isAdmin } = useAuth();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    const mockDeliveries = [
      {
        id: 'DEL-001',
        orderId: 'ORD-001',
        customerName: 'John Smith',
        address: '123 Main St, City, State 12345',
        deliveryDate: '2024-01-15',
        deliveryTime: '14:00',
        status: 'scheduled',
        driver: 'Mike Johnson',
        estimatedTime: '30 mins'
      },
      {
        id: 'DEL-002',
        orderId: 'ORD-002',
        customerName: 'Sarah Johnson',
        address: '456 Oak Ave, City, State 12345',
        deliveryDate: '2024-01-16',
        deliveryTime: '10:00',
        status: 'in-transit',
        driver: 'Lisa Brown',
        estimatedTime: '15 mins'
      }
    ];

    setDeliveries(mockDeliveries);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/admin" className="hover:text-gray-700">Admin</Link>
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>Delivery Management</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Delivery Management</h1>
          <p className="text-gray-600">Track and manage deliveries</p>
        </div>

        <div className="space-y-6">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{delivery.id}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                      {delivery.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Customer:</span>
                      <p className="font-medium">{delivery.customerName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Address:</span>
                      <p className="font-medium">{delivery.address}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Scheduled:</span>
                      <p className="font-medium">{delivery.deliveryDate} at {delivery.deliveryTime}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Driver:</span>
                      <p className="font-medium">{delivery.driver}</p>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 text-right">
                  <p className="text-sm text-gray-600">ETA</p>
                  <p className="font-medium">{delivery.estimatedTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDelivery;