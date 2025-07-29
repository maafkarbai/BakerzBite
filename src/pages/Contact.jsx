import React, { useState } from 'react';
import { contactAPI, handleAPIError } from '../services/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await contactAPI.submit(formData);
      if (response.success) {
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage(handleAPIError(error));
    }
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      info: '123 Baker Street, Downtown District, City 12345'
    },
    {
      icon: '📞',
      title: 'Phone',
      info: '+1 (555) 123-4567'
    },
    {
      icon: '📧',
      title: 'Email',
      info: 'hello@bakerzbite.com'
    },
    {
      icon: '🕒',
      title: 'Hours',
      info: 'Mon-Sat: 7AM-8PM, Sun: 8AM-6PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#D65A31] to-[#E97451] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">Contact Us</h1>
          <p className="text-lg md:text-xl opacity-95 max-w-2xl leading-relaxed">
            We'd love to hear from you. Get in touch with any questions, feedback, or just to say hello!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 leading-tight">Get In Touch</h2>
            
            <div className="space-y-8 mb-10">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl mr-6 flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🗺️</div>
                <p>Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 leading-tight">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D65A31] focus:border-transparent transition-all duration-300 text-lg"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D65A31] focus:border-transparent transition-all duration-300 text-lg"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D65A31] focus:border-transparent transition-all duration-300 text-lg"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D65A31] focus:border-transparent transition-all duration-300 text-lg"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="catering">Catering Services</option>
                    <option value="custom-order">Custom Orders</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D65A31] focus:border-transparent transition-all"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[#D65A31] text-white rounded-lg font-semibold text-lg hover:bg-[#C54A21] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg min-h-[60px]"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitMessage && (
                <div className={`p-4 rounded-lg ${submitMessage.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;