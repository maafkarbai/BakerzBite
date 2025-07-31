import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductCard from '@components/ProductCard';
import { productsAPI, handleAPIError } from '@services/api';

function Products() {
  const { category } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  
  // Get search query from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const searchQuery = urlParams.get('search');

  // Mock product data - will be replaced with API call
  const allProducts = [
    // Cakes
    { id: 1, name: 'Red Velvet Cupcake', price: 4.99, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/red-velvet-cupcake', image: '/Cakes/RedVelvetCCResize.png' },
    { id: 2, name: 'Black Forest Cupcake', price: 5.49, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/black-cupcake', image: '/Cakes/BlackCupcake.png' },
    { id: 3, name: 'Blueberry Cupcake', price: 4.49, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/blueberry-cupcake', image: '/Cakes/BlueberryCupcake.png' },
    { id: 4, name: 'Double Chocolate Cake', price: 6.99, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/double-chocolate', image: '/Cakes/DoubleChocResize.png' },
    { id: 5, name: 'Fruit & Nuts Cupcake', price: 5.99, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/fruit-nuts-cupcake', image: '/Cakes/FruitNutsCupcakeResize.png' },
    { id: 6, name: 'Honey Cake', price: 7.49, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/honey-cake', image: '/Cakes/HoneyCakeResize.png' },
    { id: 7, name: 'Jam Cupcake', price: 4.29, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/jam-cupcake', image: '/Cakes/JamCupcakeResize.png' },
    { id: 8, name: 'Lemon Drizzle Cake', price: 5.99, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/lemon-cake', image: '/Cakes/LemonCakeResize.png' },
    { id: 9, name: 'Mixed Fruit Tart', price: 5.99, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/mixed-fruit-tart', image: '/Cakes/MixedFruitResized.png' },
    { id: 10, name: 'Oreo Cake', price: 6.49, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/oreo-cake', image: '/Cakes/OreoResize.png' },
    { id: 11, name: 'Pistachio Cake', price: 6.49, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/pistachio-cake', image: '/Cakes/PistachioResize.png' },
    { id: 12, name: 'Vanilla Icing Cupcake', price: 4.49, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/vanilla-icing-cupcake', image: '/Cakes/VanillaIcingCCResize.png' },
    { id: 13, name: 'Walnut Cake', price: 7.99, category: 'cakes', cloudinaryId: 'bakerz-bite/cakes/walnut-cake', image: '/Cakes/WalnutCake.png' },
    
    // Pastries
    { id: 14, name: 'Blueberry Pastry', price: 3.99, category: 'pastries', cloudinaryId: 'bakerz-bite/pastries/blueberry-pastry', image: '/Pastries/BlueberryPastry.png' },
    { id: 15, name: 'Fruit Pastry', price: 4.49, category: 'pastries', cloudinaryId: 'bakerz-bite/pastries/fruit-pastry', image: '/Pastries/FruitPastryResize.png' },
    { id: 16, name: 'Mixed Baklava', price: 5.99, category: 'pastries', cloudinaryId: 'bakerz-bite/pastries/mixed-baklava', image: '/Pastries/MixedBaklavaResize.png' },
    { id: 17, name: 'Sweet Croissant', price: 3.49, category: 'pastries', cloudinaryId: 'bakerz-bite/pastries/sweet-croissant', image: '/Pastries/SweetCroissantResize.png' },
    { id: 18, name: 'Sweet Puff', price: 3.99, category: 'pastries', cloudinaryId: 'bakerz-bite/pastries/sweet-puff', image: '/Pastries/SweetPuffResize.png' },
    
    // Cookies (placeholder data)
    { id: 19, name: 'Chocolate Chip Cookie', price: 2.49, category: 'cookies', image: '/Icons/CookiesFormal.png' },
    { id: 20, name: 'Oatmeal Raisin Cookie', price: 2.49, category: 'cookies', image: '/Icons/CookiesFormal.png' },
    { id: 21, name: 'Sugar Cookie', price: 2.29, category: 'cookies', image: '/Icons/CookiesFormal.png' },
    
    // Drinks (placeholder data)
    { id: 22, name: 'Cappuccino', price: 3.99, category: 'drinks', image: '/Icons/DrinksFormal.png' },
    { id: 23, name: 'Latte', price: 4.49, category: 'drinks', image: '/Icons/DrinksFormal.png' },
    { id: 24, name: 'Fresh Orange Juice', price: 3.49, category: 'drinks', image: '/Icons/DrinksFormal.png' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsAPI.getAll();
        setProducts(response.data || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(handleAPIError(err));
        // Fallback to mock data if API fails
        setProducts(allProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    
    // Apply search filter if search query exists
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, products, searchQuery]);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🍰' },
    { id: 'cakes', name: 'Cakes', icon: '🎂' },
    { id: 'pastries', name: 'Pastries', icon: '🥐' },
    { id: 'cookies', name: 'Cookies', icon: '🍪' },
    { id: 'drinks', name: 'Drinks', icon: '☕' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#D65A31] to-[#E97451] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {searchQuery ? 'Search Results' : 'Our Products'}
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-2xl leading-relaxed">
            {searchQuery 
              ? `Found ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : 'Handcrafted with love, baked to perfection. Each product tells a story of passion and tradition.'
            }
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-6 py-4 rounded-lg mb-8 shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">API temporarily unavailable. Showing cached products.</p>
            </div>
          </div>
        )}
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] text-lg min-h-[56px] ${
                selectedCategory === cat.id
                  ? 'bg-[#D65A31] text-white shadow-lg hover:bg-[#C54A21]'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200'
              }`}
            >
              <span className="mr-3 text-xl">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-200 h-64"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                  {searchQuery 
                    ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search.`
                    : "No products found in this category. Please try another category."
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => window.history.back()}
                    className="mt-6 px-6 py-3 bg-[#D65A31] text-white rounded-lg font-semibold hover:bg-[#C54A21] transition-colors duration-300"
                  >
                    Go Back
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Products;