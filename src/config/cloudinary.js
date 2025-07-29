// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || 'your-api-key',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'bakerz-bite',
};

// Helper function to generate Cloudinary URLs
export const getCloudinaryUrl = (publicId, options = {}) => {
  const defaultOptions = {
    width: 500,
    height: 500,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    ...options
  };
  
  const transformations = Object.entries(defaultOptions)
    .map(([key, value]) => `${key[0]}_${value}`)
    .join(',');
  
  const resourceType = options.resource_type === 'video' ? 'video' : 'image';
  
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/${resourceType}/upload/${transformations}/${publicId}`;
};

// Product image mappings using Cloudinary demo images for immediate testing
// Replace these with your own uploaded images for production
export const productImages = {
  // Using sample food images from Cloudinary's demo account
  'red-velvet-cupcake': 'samples/food/dessert',
  'chocolate-croissant': 'samples/food/fish-vegetables',
  'mixed-fruit-tart': 'samples/food/pot-mussels',
  'pistachio-cake': 'samples/food/dessert',
  'black-cupcake': 'samples/food/spices',
  'blueberry-cupcake': 'samples/food/dessert',
  'double-chocolate': 'samples/food/spices',
  'fruit-nuts-cupcake': 'samples/food/fish-vegetables',
  'honey-cake': 'samples/food/dessert',
  'jam-cupcake': 'samples/food/pot-mussels',
  'lemon-cake': 'samples/food/dessert',
  'oreo-cake': 'samples/food/spices',
  'vanilla-icing-cupcake': 'samples/food/dessert',
  'walnut-cake': 'samples/food/fish-vegetables',
  
  // Pastries using various sample images
  'blueberry-pastry': 'samples/food/pot-mussels',
  'fruit-pastry': 'samples/food/dessert',
  'mixed-baklava': 'samples/food/spices',
  'sweet-croissant': 'samples/food/fish-vegetables',
  'sweet-puff': 'samples/food/dessert',
  
  // Gallery and other images using landscape samples
  'hero-banner': 'samples/landscapes/beach-boat',
  'logo': 'samples/food/dessert',
  'gallery-1': 'samples/landscapes/architecture-signs',
  'gallery-2': 'samples/landscapes/beach-boat',
  'gallery-3': 'samples/landscapes/girl-urban-view',
  'gallery-4': 'samples/food/dessert',
  'gallery-5': 'samples/food/pot-mussels',
  'gallery-6': 'samples/food/spices',
};