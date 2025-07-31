import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

function AdminPromotions() {
  const { isAdmin } = useAuth();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    startDate: '',
    endDate: '',
    isActive: true,
    targetAudience: 'all'
  });

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    // Mock promotions data
    const mockPromotions = [
      {
        id: 'PROMO-001',
        title: 'Weekend Special',
        description: '20% off all cakes this weekend',
        discountType: 'percentage',
        discountValue: 20,
        startDate: '2024-01-13',
        endDate: '2024-01-14',
        isActive: true,
        targetAudience: 'all',
        usageCount: 15
      },
      {
        id: 'PROMO-002',
        title: 'New Customer Welcome',
        description: '$5 off your first order',
        discountType: 'fixed',
        discountValue: 5,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        isActive: true,
        targetAudience: 'new-customers',
        usageCount: 8
      }
    ];

    setPromotions(mockPromotions);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPromo) {
      setPromotions(prev => prev.map(promo => 
        promo.id === editingPromo.id ? { ...formData, id: editingPromo.id, usageCount: editingPromo.usageCount } : promo
      ));
    } else {
      const newPromo = {
        ...formData,
        id: `PROMO-${Date.now()}`,
        usageCount: 0
      };
      setPromotions(prev => [...prev, newPromo]);
    }
    
    setShowForm(false);
    setEditingPromo(null);
    setFormData({
      title: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      startDate: '',
      endDate: '',
      isActive: true,
      targetAudience: 'all'
    });
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Link to="/admin" className="hover:text-gray-700">Admin</Link>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>Promotions & Campaigns</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Promotions & Campaigns</h1>
            <p className="text-gray-600">Create and manage promotional campaigns</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-[#D65A31] text-white rounded-md hover:bg-[#C54A21] transition-colors"
          >
            Create Promotion
          </button>
        </div>

        {/* Promotions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {promotions.map((promo) => (
            <div key={promo.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{promo.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{promo.description}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  promo.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {promo.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium">
                    {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `$${promo.discountValue}`} off
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Period:</span>
                  <span className="font-medium">{promo.startDate} to {promo.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target:</span>
                  <span className="font-medium capitalize">{promo.targetAudience.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Usage:</span>
                  <span className="font-medium">{promo.usageCount} times</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {promotions.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No promotions yet</h3>
            <p className="mt-1 text-gray-500">Get started by creating your first promotion.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPromotions;