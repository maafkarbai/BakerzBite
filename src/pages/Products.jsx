import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productsAPI, handleAPIError } from '../services/api';

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
      <section className="bg-gradient-to-r from-[#D65A31] to-[#E97451] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl md:text-5xl font-bold font-Oxygen mb-4">
            {searchQuery ? 'Search Results' : 'Our Products'}
          </h1>
          <p className="text-lg opacity-90">
            {searchQuery 
              ? `Found ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : 'Handcrafted with love, baked to perfection'
            }
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <p className="text-sm">API temporarily unavailable. Showing cached products.</p>
          </div>
        )}
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === cat.id
                  ? 'bg-[#D65A31] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-t-lg"></div>
                <div className="bg-white p-6 rounded-b-lg">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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