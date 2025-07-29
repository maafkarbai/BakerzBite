import React, { useState } from 'react';
import { getCloudinaryUrl } from '../config/cloudinary';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { id: 1, cloudinaryId: 'bakerz-bite/gallery/gallery-1', local: '/Images/Gallery1.png', caption: 'Our cozy bakery interior' },
    { id: 2, cloudinaryId: 'bakerz-bite/gallery/gallery-2', local: '/Images/Gallery2.png', caption: 'Freshly baked goods display' },
    { id: 3, cloudinaryId: 'bakerz-bite/gallery/gallery-3', local: '/Images/Gallery3.png', caption: 'Artisan bread selection' },
    { id: 4, cloudinaryId: 'bakerz-bite/gallery/gallery-4', local: '/Images/Gallery4.jpg', caption: 'Morning pastries ready' },
    { id: 5, cloudinaryId: 'bakerz-bite/gallery/gallery-5', local: '/Images/Gallery5.jpg', caption: 'Our master bakers at work' },
    { id: 6, cloudinaryId: 'bakerz-bite/gallery/gallery-6', local: '/Images/Gallery6.png', caption: 'Special occasion cakes' },
    { id: 7, cloudinaryId: 'bakerz-bite/cakes/red-velvet-cupcake', local: '/Cakes/RedVelvetCCResize.png', caption: 'Red Velvet Cupcakes' },
    { id: 8, cloudinaryId: 'bakerz-bite/cakes/mixed-fruit-tart', local: '/Cakes/MixedFruitResized.png', caption: 'Fresh Fruit Tarts' },
    { id: 9, cloudinaryId: 'bakerz-bite/pastries/sweet-croissant', local: '/Pastries/SweetCroissantResize.png', caption: 'Buttery Croissants' },
  ];

  const getImageUrl = (image, size = { width: 800, height: 600 }) => {
    return getCloudinaryUrl(image.cloudinaryId, size);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#D65A31] to-[#E97451] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl md:text-5xl font-bold font-Oxygen mb-4">Gallery</h1>
          <p className="text-lg opacity-90">A visual journey through our bakery</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-w-4 aspect-h-3 h-64">
                <img
                  src={getImageUrl(image, { width: 400, height: 300 })}
                  onError={(e) => { e.target.src = image.local; }}
                  alt={image.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={getImageUrl(selectedImage, { width: 1200, height: 800 })}
              onError={(e) => { e.target.src = selectedImage.local; }}
              alt={selectedImage.caption}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="absolute bottom-4 left-4 right-4 text-white text-center bg-black bg-opacity-50 p-2 rounded">
              {selectedImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;