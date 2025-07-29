import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCloudinaryUrl } from '../config/cloudinary';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Logo URL with Cloudinary fallback
  const logoUrl = getCloudinaryUrl('bakerz-bite/logo/croissant-logo', {
    width: 48,
    height: 48,
    format: 'png'
  });

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About us' },
    { path: '/contact', label: 'Contact us' },
  ];

  return (
    <header className="fixed z-40 w-full">
      <nav className="flex items-center justify-between h-16 px-16 align-middle bg-bg-pattern opacity-95 hover:opacity-100 drop-shadow-md">
        <div className="flex items-center justify-between logo">
          <img 
            src={logoUrl} 
            onError={(e) => { e.target.src = "/Images/CROISSANT LOGO (1).png"; }}
            className="w-12" 
            alt="Logo" 
          />
          <div className="logotext">
            <Link to="/">
              <p className="text-2xl text-gray font-Pacifico">Bakerz Bite</p>
            </Link>
          </div>
        </div>
        
        <div className="mx-4 navlist text-gray">
          <ul className="hidden lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mx-4 hover:underline underline-offset-8 decoration-[#D65A31] decoration-4 hover:scale-105 ease-in-out duration-500 ${
                  isActive(link.path) ? 'underline' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/cart"
              className="mx-4 hover:underline underline-offset-8 decoration-[#D65A31] decoration-4 hover:scale-105 ease-in-out duration-500"
            >
              Cart
            </Link>
          </ul>
        </div>
        
        <div className="rounded-full bg-slate-200 hover:bg-slate-300 lg:hidden">
          <button 
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="text-gray" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>
      
      {isMobileMenuOpen && (
        <nav className="mobile-navbar animate-fadein bg-[#D65A31] h-60 text-white font-Oxygen text-2xl justify-center align-middle items-center text-justify rounded-lg w-full">
          <ul className="flex flex-col items-center justify-center h-full gap-2 align-middle">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;