/**
 * Gallery Page Component
 * 
 * Displays categorized photo collections with filtering and sorting.
 * Requirements: 4.1, 4.2, 4.4, 12.4
 */

import React, { useState, useMemo } from 'react';
import { GalleryImage, GalleryCategory } from '../types';
import CategoryFilter from '../components/gallery/CategoryFilter';
import GalleryImageCard from '../components/gallery/GalleryImageCard';
import Lightbox from '../components/gallery/Lightbox';
import galleryData from '../data/gallery.json';

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | 'all'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Filter and sort images
  const filteredAndSortedImages = useMemo(() => {
    // Filter by category
    let filtered = galleryData as GalleryImage[];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((image) => image.category === selectedCategory);
    }

    // Sort by uploadDate (newest first)
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.uploadDate).getTime();
      const dateB = new Date(b.uploadDate).getTime();
      return dateB - dateA; // Descending order (newest first)
    });

    return sorted;
  }, [selectedCategory]);

  // Handle image click to open lightbox
  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  // Handle lightbox close
  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  // Handle next image in lightbox
  const handleNextImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = filteredAndSortedImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    
    if (currentIndex < filteredAndSortedImages.length - 1) {
      setSelectedImage(filteredAndSortedImages[currentIndex + 1]);
    }
  };

  // Handle previous image in lightbox
  const handlePreviousImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = filteredAndSortedImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    
    if (currentIndex > 0) {
      setSelectedImage(filteredAndSortedImages[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            Our Gallery
          </h1>
          <p className="text-lg md:text-xl text-center text-white/90 max-w-2xl mx-auto">
            Explore our stunning transformations across bridal, men's grooming, hair color, and influencer collaborations
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Image Count */}
        <div className="text-center mb-6 text-secondary-600">
          <p className="text-sm md:text-base">
            Showing {filteredAndSortedImages.length} {filteredAndSortedImages.length === 1 ? 'image' : 'images'}
          </p>
        </div>

        {/* Gallery Grid */}
        {filteredAndSortedImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredAndSortedImages.map((image) => (
              <GalleryImageCard
                key={image.id}
                image={image}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary-600 text-lg">
              No images found in this category.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <Lightbox
        image={selectedImage}
        onClose={handleCloseLightbox}
        onNext={handleNextImage}
        onPrevious={handlePreviousImage}
      />
    </div>
  );
};

export default Gallery;
