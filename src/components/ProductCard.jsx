import React from 'react';
import { useCart } from '../context/CartContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { getCloudinaryUrl } from '../config/cloudinary';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { announceToScreenReader, accessibilityEnabled } = useAccessibility();
  
  // Get Cloudinary URL or fall back to local image
  const imageUrl = product.cloudinaryId 
    ? getCloudinaryUrl(product.cloudinaryId, { width: 400, height: 400 })
    : product.image;

  const handleAddToCart = () => {
    addToCart(product);
    announceToScreenReader(`${product.name} added to cart`);
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
      role="group"
      aria-labelledby={`product-${product.id}-name`}
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={imageUrl}
          alt={`${product.name} - ${product.category} priced at $${product.price.toFixed(2)}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = product.image;
            e.target.onerror = null;
          }}
        />
        {product.featured && (
          <span 
            className="absolute top-4 right-4 bg-[#D65A31] text-white px-3 py-1 rounded-full text-sm font-semibold"
            aria-label="Featured product"
          >
            Featured
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 
          id={`product-${product.id}-name`}
          className="text-xl font-semibold mb-2 font-Oxygen text-gray-800"
        >
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <span 
            className="text-2xl font-bold text-[#D65A31]"
            aria-label={`Price: ${product.price.toFixed(2)} dollars`}
          >
            ${product.price.toFixed(2)}
          </span>
          <span 
            className="text-sm text-gray-500 capitalize"
            aria-label={`Category: ${product.category}`}
          >
            {product.category}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full py-3 bg-[#D65A31] text-white rounded-lg font-semibold hover:bg-[#C54A21] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#D65A31] focus:outline-none focus:ring-2 focus:ring-[#D65A31] focus:ring-offset-2"
          aria-label={`Add ${product.name} to cart for $${product.price.toFixed(2)}`}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;