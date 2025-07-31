import React from "react";
import { Link } from "react-router-dom";

function ProductCategories() {
  const categories = [
    {
      id: "cakes",
      name: "Cakes",
      icon: "/Icons/CakeFormal.png",
      description: "Delicious cakes for every occasion",
      color: "from-[#D65A31] to-[#C54A21]",
    },
    {
      id: "pastries",
      name: "Pastries",
      icon: "/Icons/CroissantsFormal.png",
      description: "Fresh, flaky, and irresistible",
      color: "from-[#E97451] to-[#D65A31]",
    },
    {
      id: "cookies",
      name: "Cookies",
      icon: "/Icons/CookiesFormal.png",
      description: "Sweet treats for cookie lovers",
      color: "from-[#C54A21] to-[#B8441E]",
    },
    {
      id: "bread",
      name: "Bread",
      icon: "/Icons/PieFormalICON.png",
      description: "Fresh baked bread and artisan loaves",
      color: "from-[#B8441E] to-[#A63B1A]",
    },
    {
      id: "drinks",
      name: "Drinks",
      icon: "/Icons/DrinksFormal.png",
      description: "Refreshing beverages to complement",
      color: "from-[#D65A31] to-[#E97451]",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D65A31] to-[#C54A21] rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-Oxygen text-gray-800">
            Our Categories
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our delicious selection of freshly baked goods and artisan
            treats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products/${category.id}`}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 bg-white"
            >
              {/* Background gradient card */}
              <div
                className={`h-72 bg-gradient-to-br ${category.color} relative`}
              >
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-white bg-opacity-20 rounded-full"></div>
                <div className="absolute bottom-6 left-6 w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full text-white">
                  <div className="w-28 h-28 mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-center">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-full h-full object-contain filter drop-shadow-2xl"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 font-Oxygen tracking-wide">
                    {category.name}
                  </h3>
                  <p className="text-sm text-center opacity-95 leading-relaxed px-2">
                    {category.description}
                  </p>

                  {/* Call to action */}
                  <div className="mt-4 px-4 py-2 text-orange-400 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    EXPLORE
                  </div>
                </div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-transparent via-50% to-transparent opacity-20"></div>
              </div>

              {/* Enhanced hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-all duration-500"></div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white via-50% to-transparent opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCategories;
