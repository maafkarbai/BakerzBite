import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCloudinaryUrl } from "../config/cloudinary";
import { useAccessibility } from "../context/AccessibilityContext";

function HeroSection() {
  const [showVideo, setShowVideo] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const { accessibilityEnabled, reducedMotion } = useAccessibility();

  // Use Cloudinary URL if available, otherwise fall back to local image
  const heroImageUrl = getCloudinaryUrl("bakerz-bite/banners/hero-banner", {
    width: 1920,
    height: 1080,
    quality: 80,
  });

  // Use Cloudinary video URL with your actual public ID
  const heroVideoUrl = getCloudinaryUrl("BGVideo_vsnao8", {
    resource_type: "video",
    format: "mp4",
    quality: "auto",
    width: 1920,
    height: 1080,
  });

  useEffect(() => {
    // Disable video if accessibility is enabled and user prefers reduced motion
    if (accessibilityEnabled && reducedMotion) {
      setShowVideo(false);
    }
  }, [accessibilityEnabled, reducedMotion]);

  useEffect(() => {
    // Detect if user prefers reduced motion from system
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches && !accessibilityEnabled) {
      setShowVideo(false);
    }

    const handleMediaChange = (e) => {
      if (e.matches && !accessibilityEnabled) {
        setShowVideo(false);
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [accessibilityEnabled]);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Hero Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Left Side - Content */}
          <div className="flex-1 text-center lg:text-left text-white max-w-2xl lg:max-w-none">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 lg:mb-6 drop-shadow-2xl leading-tight tracking-tight bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">
                Bakerz Bite
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#D65A31] to-[#E97451] mx-auto lg:mx-0 mb-6 rounded-full"></div>
            </div>

            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 lg:mb-8 font-medium leading-relaxed text-orange-100">
              Where Every Bite Tells a Story
            </p>

            <p className="text-base sm:text-lg md:text-xl mb-8 lg:mb-12 opacity-90 leading-relaxed text-gray-200 max-w-lg mx-auto lg:mx-0">
              Freshly baked goods made with passion, served with love.
              Experience the artistry of traditional baking with our handcrafted
              delights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start items-center">
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center px-8 lg:px-10 py-4 lg:py-5 bg-gradient-to-r from-[#D65A31] to-[#E97451] text-white rounded-xl font-semibold text-base lg:text-lg hover:from-[#C54A21] hover:to-[#D65A31] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl min-w-[200px] overflow-hidden"
              >
                <span className="relative z-10">Explore Our Menu</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/gallery"
                className="group inline-flex items-center justify-center px-8 lg:px-10 py-4 lg:py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold text-base lg:text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl min-w-[200px]"
              >
                View Gallery
              </Link>
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            {showVideo && (
              <div className="relative group">
                {/* Video Container */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="relative aspect-video">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      aria-label="Bakerz Bite bakery showcase video"
                    >
                      <source
                        src="https://asset.cloudinary.com/dhtils174/4b199bbe9800419a56779ec19ccf6229"
                        type="video/mp4"
                      />
                      <source src="/videos/BGVideo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Video Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#D65A31]/20 to-[#E97451]/20 rounded-3xl lg:rounded-4xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            )}

            {/* Fallback Image */}
            {(!showVideo || videoError) && (
              <div className="relative group">
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="relative aspect-video">
                    <img
                      src={heroImageUrl || "/Images/Hero1111111111.png"}
                      alt="Bakerz Bite bakery showcase"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-[#D65A31]/20 to-[#E97451]/20 rounded-3xl lg:rounded-4xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/Images/Bakery-BG.jpg')] bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#D65A31]/10 via-transparent to-[#E97451]/10"></div>
    </section>
  );
}

export default HeroSection;
