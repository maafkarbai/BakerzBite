import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCloudinaryUrl } from "../config/cloudinary";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Logo URL with Cloudinary fallback
  const logoUrl = getCloudinaryUrl("bakerz-bite/logo/croissant-logo", {
    width: 48,
    height: 48,
    format: "png",
  });

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/gallery", label: "Gallery" },
    { path: "/about", label: "About us" },
    { path: "/contact", label: "Contact us" },
  ];

  return (
    <header className="fixed z-40 w-full bg-white shadow-md">
      <nav className="flex items-center justify-between h-16 px-4 lg:px-16 bg-gradient-to-r from-orange-50 to-white">
        <div className="flex items-center space-x-3 mr-8">
          <img
            src={logoUrl}
            onError={(e) => {
              e.target.src = "/Images/CROISSANT LOGO (1).png";
            }}
            className="w-12 h-12 animate-pulse hover:animate-spin transition-all duration-500 cursor-pointer"
            alt="Bakerz Bite Logo"
          />
        </div>

        <div className="hidden lg:flex">
          <ul className="flex items-center space-x-8 text-gray-700">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`hover:text-[#D65A31] hover:underline underline-offset-4 decoration-2 decoration-[#D65A31] transition-all duration-300 ${
                    isActive(link.path) ? "text-[#D65A31] underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/cart"
                className="bg-[#D65A31] text-white px-4 py-2 rounded-md hover:bg-[#C54A21] transition-colors duration-300 font-medium"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:hidden">
          <button
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-[#D65A31] shadow-lg transition-all duration-300 ease-in-out">
          <ul className="flex flex-col py-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-3 text-white hover:bg-[#C54A21] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-6 py-3 text-white hover:bg-[#C54A21] transition-colors duration-200 border-t border-[#C54A21] mt-2 pt-4"
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
