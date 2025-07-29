import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnhancedNavbar from './components/EnhancedNavbar';
import Footer from './components/Footer';
import SkipLink from './components/SkipLink';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AccessibilityDemo from './pages/AccessibilityDemo';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

function App() {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <Router>
              <div className="min-h-screen">
                <SkipLink />
                <EnhancedNavbar />
                <main id="main-content" className="pt-16" role="main">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:category" element={<Products />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/accessibility" element={<AccessibilityDemo />} />
                  </Routes>
                </main>
                <Footer />
                <AccessibilityToolbar />
              </div>
            </Router>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
}

export default App;