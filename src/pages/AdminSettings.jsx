import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

function AdminSettings() {
  const { isAdmin } = useAuth();
  const [settings, setSettings] = useState({
    storeName: 'BakerzBite',
    storeAddress: '123 Bakery Lane, Sweet City, SC 12345',
    storePhone: '+1 (555) 123-4567',
    storeEmail: 'info@bakerzbite.com',
    storeHours: {
      monday: { open: '08:00', close: '18:00', closed: false },
      tuesday: { open: '08:00', close: '18:00', closed: false },
      wednesday: { open: '08:00', close: '18:00', closed: false },
      thursday: { open: '08:00', close: '18:00', closed: false },
      friday: { open: '08:00', close: '20:00', closed: false },
      saturday: { open: '09:00', close: '20:00', closed: false },
      sunday: { open: '10:00', close: '16:00', closed: false }
    },
    taxRate: 8.5,
    deliveryFee: 5.99,
    freeDeliveryThreshold: 50.00,
    paymentMethods: {
      stripe: true,
      paypal: true,
      cashOnDelivery: true
    },
    emailNotifications: true,
    smsNotifications: false
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHoursChange = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      storeHours: {
        ...prev.storeHours,
        [day]: {
          ...prev.storeHours[day],
          [field]: value
        }
      }
    }));
  };

  const handlePaymentMethodChange = (method, enabled) => {
    setSettings(prev => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        [method]: enabled
      }
    }));
  };

  const handleSave = () => {
    // Mock save function
    alert('Settings saved successfully!');
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

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/admin" className="hover:text-gray-700">Admin</Link>
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>Settings</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-gray-600">Configure your store settings and preferences</p>
        </div>

        <div className="space-y-8">
          {/* Store Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Store Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={settings.storePhone}
                  onChange={(e) => handleInputChange('storePhone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) => handleInputChange('storeEmail', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={settings.storeAddress}
                  onChange={(e) => handleInputChange('storeAddress', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Store Hours */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Store Hours</h3>
            <div className="space-y-4">
              {Object.entries(settings.storeHours).map(([day, hours]) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-24">
                    <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={!hours.closed}
                      onChange={(e) => handleHoursChange(day, 'closed', !e.target.checked)}
                      className="rounded border-gray-300 text-[#D65A31] focus:ring-[#D65A31]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Open</span>
                  </label>
                  {!hours.closed && (
                    <>
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D65A31] focus:border-transparent"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D65A31] focus:border-transparent"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Delivery */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Pricing & Delivery</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Fee ($)</label>
                <input
                  type="number"
                  value={settings.deliveryFee}
                  onChange={(e) => handleInputChange('deliveryFee', parseFloat(e.target.value))}
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Free Delivery Threshold ($)</label>
                <input
                  type="number"
                  value={settings.freeDeliveryThreshold}
                  onChange={(e) => handleInputChange('freeDeliveryThreshold', parseFloat(e.target.value))}
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Payment Methods</h3>
            <div className="space-y-4">
              {Object.entries(settings.paymentMethods).map(([method, enabled]) => (
                <label key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => handlePaymentMethodChange(method, e.target.checked)}
                    className="rounded border-gray-300 text-[#D65A31] focus:ring-[#D65A31]"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 capitalize">
                    {method.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Notifications</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                  className="rounded border-gray-300 text-[#D65A31] focus:ring-[#D65A31]"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">Email Notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                  className="rounded border-gray-300 text-[#D65A31] focus:ring-[#D65A31]"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">SMS Notifications</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#D65A31] text-white rounded-md hover:bg-[#C54A21] transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;