import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCloudinaryUrl } from "@config/cloudinary";
import { useAccessibility } from "@context/AccessibilityContext";

function HeroSection() {
  const { accessibilityEnabled, reducedMotion } = useAccessibility();
  const [currentPromo, setCurrentPromo] = useState(0);

  // Promotional banners rotation
  const promotions = [
    {
      text: "🎉 20% OFF Custom Cakes - Order Today!",
      bgColor: "from-red-500 to-pink-500"
    },
    {
      text: "🥐 Fresh Croissants Every Morning - Best in Town!",
      bgColor: "from-orange-500 to-yellow-500"
    },
    {
      text: "☕ Free Coffee with Any Pastry Purchase!",
      bgColor: "from-green-500 to-teal-500"
    }
  ];

  // Social proof data
  const socialProof = {
    customers: "10,000+",
    rating: "4.9",
    reviews: "2,500+"
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Use Cloudinary URL for signature cake image
  const signatureCakeUrl = getCloudinaryUrl("bakerz-bite/products/signature-chocolate-cake", {
    width: 800,
    height: 800,
    quality: 90,
    format: "auto"
  }) || "/Cakes/DoubleChocResize.png";

  // Additional bakery ambiance image
  const bakeryAmbianceUrl = getCloudinaryUrl("bakerz-bite/bakery/interior-warm", {
    width: 600,
    height: 400,
    quality: 85,
    format: "auto"
  }) || "/Images/Bakery-BG.jpg";

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-orange-50 to-amber-50 overflow-hidden">
      {/* Promotional Banner */}
      <div className="relative z-20 w-full">
        <div className={`bg-gradient-to-r ${promotions[currentPromo].bgColor} text-white py-3 px-4 text-center transition-all duration-500`}>
          <p className="text-sm md:text-base font-bold tracking-wide uppercase animate-pulse">
            {promotions[currentPromo].text}
          </p>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-100px)]">
            
            {/* Left Column - Content */}
            <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
              {/* Main Headline */}
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-[#D65A31]/10 rounded-full text-[#D65A31] text-sm font-bold tracking-wider uppercase mb-4">
                  <span className="w-2 h-2 bg-[#D65A31] rounded-full mr-2 animate-pulse"></span>
                  Artisanal Bakery & Café
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight font-serif">
                  <span className="block text-gray-900 mb-1 font-light">Taste, remember,</span>
                  <span className="block bg-gradient-to-r from-[#D65A31] via-[#E97451] to-[#D65A31] bg-clip-text text-transparent font-black italic">
                    and fall in love
                  </span>
                  <span className="block text-gray-900 font-medium">with every bite!</span>
                </h1>
                
                <div className="w-24 h-1 bg-gradient-to-r from-[#D65A31] to-[#E97451] mx-auto lg:mx-0 rounded-full"></div>
              </div>

              {/* Subtext */}
              <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium tracking-wide">
                Handcrafted with <em className="text-[#D65A31] font-semibold not-italic">passion</em>, baked with <em className="text-[#D65A31] font-semibold not-italic">love</em>. 
                From custom celebration cakes to daily fresh pastries, we create moments that linger in your heart and memory.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#D65A31] to-[#E97451] text-white rounded-2xl font-bold text-lg tracking-wide hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Order Custom Cakes
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#D65A31] text-[#D65A31] rounded-2xl font-bold text-lg tracking-wide hover:bg-[#D65A31] hover:text-white transition-all duration-300"
                >
                  Browse Menu
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">{socialProof.customers}</div>
                  <div className="text-sm text-gray-600 font-medium tracking-wide uppercase">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <span className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">{socialProof.rating}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium tracking-wide uppercase">{socialProof.reviews} Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">15+</div>
                  <div className="text-sm text-gray-600 font-medium tracking-wide uppercase">Years Experience</div>
                </div>
              </div>

              {/* Special Offers */}
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#D65A31] to-[#E97451] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 tracking-wide">Same-Day Delivery Available</h3>
                    <p className="text-sm text-gray-700 font-medium">Order before 2 PM for same-day delivery in the city</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Images */}
            <div className="relative order-1 lg:order-2">
              <div className="relative h-[600px] lg:h-[700px]">
                {/* Background Highlight Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D65A31]/20 via-[#E97451]/20 to-[#D65A31]/20 rounded-full blur-3xl scale-110"></div>
                
                {/* Main Product Image - Large Circle */}
                <div className="absolute top-0 right-0 z-20 w-80 h-80 lg:w-96 lg:h-96">
                  <div className="relative bg-white rounded-full p-6 shadow-2xl border-4 border-white w-full h-full">
                    <img
                      src={signatureCakeUrl}
                      alt="Signature chocolate cake - BakerzBite specialty"
                      className="w-full h-full rounded-2xl object-cover"
                      loading="lazy"
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      Bestseller!
                    </div>
                    
                    {/* Floating Price Tag */}
                    <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100">
                      <div className="text-center">
                        <div className="text-xl font-bold text-[#D65A31]">$24.99</div>
                        <div className="text-xs text-gray-600">Signature Cake</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Bakery Ambiance Image */}
                <div className="absolute bottom-0 left-0 z-10 w-72 h-48 lg:w-80 lg:h-56">
                  <div className="relative bg-white rounded-3xl p-4 shadow-xl border-2 border-white overflow-hidden group">
                    <img
                      src={bakeryAmbianceUrl}
                      alt="Warm bakery interior with fresh bread and pastries"
                      className="w-full h-full rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Image Overlay */}
                    <div className="absolute inset-4 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
                    
                    {/* Image Text Overlay */}
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="text-sm font-semibold">Fresh Daily</div>
                      <div className="text-xs opacity-90">Artisan Bakery</div>
                    </div>

                    {/* Quality Badge */}
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium text-gray-700">Premium</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Small Product Showcase Circles */}
                <div className="absolute top-32 left-8 z-15 w-24 h-24 bg-white rounded-full shadow-lg border-2 border-orange-200 p-3">
                  <img
                    src="/Pastries/SweetCroissantResize.png"
                    alt="Fresh croissant"
                    className="w-full h-full rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-80 right-20 z-15 w-20 h-20 bg-white rounded-full shadow-lg border-2 border-pink-200 p-2">
                  <img
                    src="/Cakes/RedVelvetCCResize.png"
                    alt="Red velvet cupcake"
                    className="w-full h-full rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>

                {/* Floating Customer Review */}
                <div className="absolute top-20 left-20 z-25 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-48">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      SJ
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900">Sarah J.</div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    "Best chocolate cake in town! 🍰"
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-20 right-10 w-6 h-6 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 -left-4 w-8 h-8 bg-orange-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-10 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D65A31' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className={`${!reducedMotion ? 'animate-bounce' : ''}`}>
          <div className="w-8 h-12 border-2 border-[#D65A31]/30 rounded-full flex justify-center">
            <div className={`w-1 h-3 bg-[#D65A31]/60 rounded-full mt-2 ${!reducedMotion ? 'animate-pulse' : ''}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
