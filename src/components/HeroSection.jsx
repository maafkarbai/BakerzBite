import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCloudinaryUrl } from '../config/cloudinary';
import { useAccessibility } from '../context/AccessibilityContext';

function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const { accessibilityEnabled, reducedMotion } = useAccessibility();

  // Use Cloudinary URL if available, otherwise fall back to local image
  const heroImageUrl = getCloudinaryUrl('bakerz-bite/banners/hero-banner', {
    width: 1920,
    height: 1080,
    quality: 80
  });

  // Use Cloudinary video URL
  const heroVideoUrl = getCloudinaryUrl('bakerz-bite/videos/hero-background', {
    resource_type: 'video',
    format: 'mp4',
    quality: 'auto',
    width: 1920,
    height: 1080
  });

  useEffect(() => {
    // Disable video if accessibility is enabled and user prefers reduced motion
    if (accessibilityEnabled && reducedMotion) {
      setShowVideo(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [accessibilityEnabled, reducedMotion]);

  useEffect(() => {
    // Preload video for better performance
    if (videoRef.current && showVideo) {
      videoRef.current.load();
    }
  }, [showVideo]);

  useEffect(() => {
    // Detect if user prefers reduced motion from system
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && !accessibilityEnabled) {
      setShowVideo(false);
    }

    const handleMediaChange = (e) => {
      if (e.matches && !accessibilityEnabled) {
        setShowVideo(false);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, [accessibilityEnabled]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsVideoLoaded(false);
    setShowVideo(false);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          aria-label="Background video of bakery atmosphere"
          preload="metadata"
        >
          <source src={heroVideoUrl} type="video/mp4" />
          <source src="/videos/BGVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Fallback Background Image */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${showVideo && isVideoLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}
        style={{ 
          backgroundImage: `url('${heroImageUrl}'), url('/Images/Hero1111111111.png')` 
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 md:px-8 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 drop-shadow-2xl leading-tight tracking-tight">
          Bakerz Bite
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-10 opacity-95 font-medium leading-relaxed">
          Where Every Bite Tells a Story
        </p>
        <p className="text-lg md:text-xl mb-14 max-w-2xl mx-auto opacity-90 leading-relaxed">
          Freshly baked goods made with passion, served with love. Experience the artistry of traditional baking.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            to="/products" 
            className="inline-flex items-center justify-center px-10 py-5 bg-[#D65A31] text-white rounded-lg font-semibold text-lg hover:bg-[#C54A21] transition-all duration-300 transform hover:scale-105 shadow-xl min-h-[60px] min-w-[200px]"
          >
            Explore Our Menu
          </Link>
          <Link 
            to="/gallery" 
            className="inline-flex items-center justify-center px-10 py-5 bg-white bg-opacity-90 text-[#D65A31] rounded-lg font-semibold text-lg hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-xl min-h-[60px] min-w-[200px]"
          >
            View Gallery
          </Link>
        </div>
      </div>
      
      {/* Video Controls */}
      {showVideo && (
        <div className="absolute bottom-24 right-8 z-20">
          <button
            onClick={toggleVideo}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label={!isPlaying ? "Play background video" : "Pause background video"}
          >
            {!isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            )}
          </button>
        </div>
      )}
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;