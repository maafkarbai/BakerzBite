import React from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '@context/SearchContext';
import { getCloudinaryUrl } from '@config/cloudinary';

function SearchDropdown({ searchInput, onSelectProduct }) {
  const { searchResults, isSearching, searchHistory, removeFromHistory } = useSearch();

  const getProductImageUrl = (product) => {
    return product.cloudinaryId 
      ? getCloudinaryUrl(product.cloudinaryId, { width: 60, height: 60 })
      : product.image;
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
      {isSearching ? (
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#D65A31] mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Searching...</p>
        </div>
      ) : searchInput.trim() ? (
        searchResults.length > 0 ? (
          <div>
            <div className="p-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">
                Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
              </h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {searchResults.slice(0, 6).map((product) => (
                <Link
                  key={product.id}
                  to={`/products?search=${encodeURIComponent(searchInput)}`}
                  onClick={onSelectProduct}
                  className="flex items-center p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={getProductImageUrl(product)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {product.category}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-[#D65A31]">
                    ${product.price.toFixed(2)}
                  </div>
                </Link>
              ))}
              {searchResults.length > 6 && (
                <Link
                  to={`/products?search=${encodeURIComponent(searchInput)}`}
                  onClick={onSelectProduct}
                  className="block p-3 text-center text-sm text-[#D65A31] hover:bg-orange-50 transition-colors border-t border-gray-100"
                >
                  View all {searchResults.length} results →
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 text-center">
            <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.084-2.291M15.46 5.46a8.1 8.1 0 01-6.92 0M12 3v2.25" />
            </svg>
            <p className="text-sm text-gray-500 mt-2">
              No products found for "{searchInput}"
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Try searching for cakes, pastries, cookies, or drinks
            </p>
          </div>
        )
      ) : (
        searchHistory.length > 0 && (
          <div>
            <div className="p-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">Recent Searches</h3>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {searchHistory.slice(0, 5).map((query, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  <button
                    onClick={() => {
                      // Set search input and trigger search
                      const event = new Event('input', { bubbles: true });
                      const input = document.querySelector('input[placeholder="Search products..."]');
                      if (input) {
                        input.value = query;
                        input.dispatchEvent(event);
                      }
                    }}
                    className="flex items-center flex-1 text-left"
                  >
                    <svg className="h-4 w-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">{query}</span>
                  </button>
                  <button
                    onClick={() => removeFromHistory(query)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default SearchDropdown;