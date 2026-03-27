/**
 * Gallery Image Card Component
 * 
 * Displays before/after image pairs with hover effects and click handling.
 * Requirements: 4.3
 */

import React, { useState } from 'react';
import { GalleryImage } from '../../types';

interface GalleryImageCardProps {
  image: GalleryImage;
  onImageClick: (image: GalleryImage) => void;
}

const GalleryImageCard: React.FC<GalleryImageCardProps> = ({ image, onImageClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onImageClick(image);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onImageClick(image);
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${image.title} in lightbox`}
    >
      {/* Before/After Image Container */}
      <div className="relative aspect-[4/3] bg-gray-200">
        {/* Before Image */}
        <div className="absolute inset-0 w-1/2 left-0 overflow-hidden">
          <img
            src={image.beforeUrl}
            alt={`Before: ${image.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            Before
          </div>
        </div>

        {/* After Image */}
        <div className="absolute inset-0 w-1/2 right-0 overflow-hidden">
          <img
            src={image.afterUrl}
            alt={`After: ${image.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            After
          </div>
        </div>

        {/* Center Divider */}
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white shadow-lg transform -translate-x-1/2 z-10" />
      </div>

      {/* Hover Overlay with Description */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-white font-semibold text-base md:text-lg mb-1">
          {image.title}
        </h3>
        {image.description && (
          <p className="text-white/90 text-sm line-clamp-2">
            {image.description}
          </p>
        )}
        {image.isInfluencer && (
          <span className="inline-flex items-center gap-1 mt-2 text-xs text-yellow-300 font-medium">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Influencer Feature
          </span>
        )}
      </div>

      {/* Mobile: Always show title */}
      <div className="md:hidden bg-white p-3 border-t border-gray-200">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
          {image.title}
        </h3>
        {image.isInfluencer && (
          <span className="inline-flex items-center gap-1 mt-1 text-xs text-yellow-600 font-medium">
            <svg
              className="w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Influencer
          </span>
        )}
      </div>
    </div>
  );
};

export default GalleryImageCard;
