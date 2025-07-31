import React, { createContext, useContext, useState } from 'react';
import { productsAPI } from '@services/api';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Get all products and filter client-side for now
      const response = await productsAPI.getAll();
      const allProducts = response.data || [];
      
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase())) ||
        (product.ingredients && product.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(query.toLowerCase())
        ))
      );
      
      setSearchResults(filtered);
      
      // Add to search history if not already present
      if (query.trim() && !searchHistory.includes(query.trim())) {
        const newHistory = [query.trim(), ...searchHistory.slice(0, 9)]; // Keep last 10 searches
        setSearchHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      }
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const removeFromHistory = (query) => {
    const newHistory = searchHistory.filter(item => item !== query);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    searchHistory,
    performSearch,
    clearSearch,
    clearSearchHistory,
    removeFromHistory
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};