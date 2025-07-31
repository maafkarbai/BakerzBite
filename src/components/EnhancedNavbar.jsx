import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { useCart } from '@context/CartContext';
import { useSearch } from '@context/SearchContext';
import { useAccessibility } from '@context/AccessibilityContext';
import { getCloudinaryUrl } from '@config/cloudinary';
import { useHotkeys } from 'react-hotkeys-hook';
import SearchDropdown from '@components/SearchDropdown';
import UserMenu from '@components/UserMenu';

function EnhancedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  
  const { user, isLoggedIn, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const { searchQuery, setSearchQuery, performSearch, clearSearch } = useSearch();
  const { announceToScreenReader } = useAccessibility();

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
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  // Add admin link if user is admin
  if (isAdmin()) {
    navLinks.push({ path: '/admin', label: 'Admin Panel' });
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      performSearch(searchInput);
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    // Perform real-time search for dropdown
    if (value.trim()) {
      performSearch(value);
      setIsSearchOpen(true);
    } else {
      clearSearch();
      setIsSearchOpen(false);
    }
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed z-50 w-full">
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <img 
                  src={logoUrl} 
                  onError={(e) => { e.target.src = "/static/Images/CROISSANT LOGO (1).png"; }}
                  className="w-10 h-10" 
                  alt="BakerzBite Logo" 
                />
                <div className="text-2xl font-Pacifico text-[#D65A31]">
                  Bakerz Bite
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-2 px-1 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path) 
                      ? 'text-[#D65A31]' 
                      : 'text-gray-700 hover:text-[#D65A31]'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D65A31] rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchRef}>
              <div className="relative w-full">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    onFocus={() => setIsSearchOpen(true)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </form>
                
                {/* Search Dropdown */}
                {isSearchOpen && (
                  <SearchDropdown 
                    searchInput={searchInput}
                    onSelectProduct={() => setIsSearchOpen(false)}
                  />
                )}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-[#D65A31] transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart Button */}
              <Link 
                to="/cart" 
                className="relative p-2 text-gray-400 hover:text-[#D65A31] transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D65A31] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* Authentication */}
              {isLoggedIn() ? (
                <UserMenu />
              ) : (
                <div className="hidden lg:flex items-center space-x-2">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#D65A31] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 text-sm font-medium bg-[#D65A31] text-white rounded-full hover:bg-[#C54A21] transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-[#D65A31] transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-gray-100 p-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-[#D65A31] bg-orange-50'
                      : 'text-gray-700 hover:text-[#D65A31] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {!isLoggedIn() && (
                <div className="pt-4 pb-2 border-t border-gray-100 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#D65A31] hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium bg-[#D65A31] text-white rounded-lg hover:bg-[#C54A21] transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default EnhancedNavbar;