import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductCategories from '../components/ProductCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';

function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Welcome Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white" aria-labelledby="welcome-heading">
        <div className="max-w-7xl mx-auto text-center">
          <h1 id="welcome-heading" className="text-4xl md:text-5xl font-Pacifico text-[#D65A31] mb-6">
            Welcome to Bakerz Bite
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-Oxygen">
            Indulge in our handcrafted delights made with love and the finest ingredients. 
            From artisanal breads to decadent desserts, we bring you the taste of happiness.
          </p>
        </div>
      </section>

      <ProductCategories />
      
      <FeaturedProducts />
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-[#D65A31] to-[#E97451] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-Oxygen">
            Ready to Taste the Difference?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Visit us today or order online for a delightful experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="px-8 py-3 bg-white text-[#D65A31] rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Browse Menu
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-[#D65A31] transition-all duration-300"
            >
              Visit Store
            </Link>
          </div>
        </div>
      </section>
      
      <Testimonials />
    </div>
  );
}

export default Home;