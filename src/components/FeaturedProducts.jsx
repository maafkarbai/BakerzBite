import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { productsAPI, handleAPIError } from '../services/api';

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsAPI.getFeatured();
        setFeaturedProducts(response.data || []);
      } catch (err) {
        console.error('Failed to fetch featured products:', err);
        setError(handleAPIError(err));
        
        // Fallback to mock data if API fails
        const mockProducts = [
          {
            id: 1,
            name: 'Red Velvet Cupcake',
            price: 4.99,
            image: '/Cakes/RedVelvetCCResize.png',
            cloudinaryId: 'bakerz-bite/cakes/red-velvet-cupcake',
            category: 'cakes',
            featured: true
          },
          {
            id: 2,
            name: 'Sweet Croissant',
            price: 3.49,
            image: '/Pastries/SweetCroissantResize.png',
            cloudinaryId: 'bakerz-bite/pastries/sweet-croissant',
            category: 'pastries',
            featured: true
          },
          {
            id: 3,
            name: 'Mixed Fruit Tart',
            price: 5.99,
            image: '/Cakes/MixedFruitResized.png',
            cloudinaryId: 'bakerz-bite/cakes/mixed-fruit-tart',
            category: 'cakes',
            featured: true
          },
          {
            id: 4,
            name: 'Pistachio Delight Cake',
            price: 6.49,
            image: '/Cakes/PistachioResize.png',
            cloudinaryId: 'bakerz-bite/cakes/pistachio-cake',
            category: 'cakes',
            featured: true
          }
        ];
        setFeaturedProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-Oxygen text-gray-800">
          Featured Products
        </h2>
        
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 text-center">
            <p className="text-sm">API temporarily unavailable. Showing cached products.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 bg-[#D65A31] text-white rounded-full font-semibold hover:bg-[#C54A21] transition-all duration-300 transform hover:scale-105"
          >
            View All Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;