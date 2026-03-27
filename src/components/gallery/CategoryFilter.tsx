/**
 * CategoryFilter Component
 * 
 * Displays category tabs/buttons for filtering gallery images.
 * Requirements: 4.2
 */

import { GalleryCategory } from '../../types';

interface CategoryFilterProps {
  selectedCategory: GalleryCategory | 'all';
  onCategoryChange: (category: GalleryCategory | 'all') => void;
}

const CATEGORIES: { value: GalleryCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bridal', label: 'Bridal' },
  { value: 'mens-grooming', label: "Men's Grooming" },
  { value: 'hair-color', label: 'Hair Color' },
  { value: 'influencer', label: 'Influencer' },
];

function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
      {CATEGORIES.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`
            px-4 py-2 md:px-6 md:py-3 
            rounded-lg font-medium 
            transition-all duration-200
            min-h-[44px] min-w-[44px]
            ${
              selectedCategory === category.value
                ? 'bg-primary-600 text-white shadow-md transform scale-105'
                : 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 hover:shadow-sm'
            }
          `}
          aria-pressed={selectedCategory === category.value}
          aria-label={`Filter by ${category.label}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
