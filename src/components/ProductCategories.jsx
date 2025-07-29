import React from 'react';
import { Link } from 'react-router-dom';

function ProductCategories() {
  const categories = [
    {
      id: 'cakes',
      name: 'Cakes',
      icon: '/Icons/CakeFormal.png',
      description: 'Delicious cakes for every occasion',
      color: 'from-[#D65A31] to-[#C54A21]'
    },
    {
      id: 'pastries',
      name: 'Pastries',
      icon: '/Icons/CroissantsFormal.png',
      description: 'Fresh, flaky, and irresistible',
      color: 'from-[#E97451] to-[#D65A31]'
    },
    {
      id: 'cookies',
      name: 'Cookies',
      icon: '/Icons/CookiesFormal.png',
      description: 'Sweet treats for cookie lovers',
      color: 'from-[#C54A21] to-[#B8441E]'
    },
    {
      id: 'drinks',
      name: 'Drinks',
      icon: '/Icons/DrinksFormal.png',
      description: 'Refreshing beverages to complement',
      color: 'from-[#D65A31] to-[#E97451]'
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-Oxygen text-gray-800">
          Our Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products/${category.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`h-64 bg-gradient-to-br ${category.color} p-6 flex flex-col items-center justify-center text-white`}>
                <div className="w-24 h-24 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={category.icon} 
                    alt={category.name} 
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 font-Oxygen">{category.name}</h3>
                <p className="text-sm text-center opacity-90">{category.description}</p>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCategories;