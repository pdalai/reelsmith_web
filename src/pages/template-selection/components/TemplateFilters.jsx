import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateFilters = ({ 
  selectedCategory, 
  onCategoryChange, 
  selectedMediaType, 
  onMediaTypeChange,
  searchQuery,
  onSearchChange,
  onClearFilters 
}) => {
  const categories = [
    { id: 'all', label: 'All Templates', icon: 'Grid3X3' },
    { id: 'travel', label: 'Travel & Lifestyle', icon: 'MapPin' },
    { id: 'business', label: 'Business & Marketing', icon: 'Briefcase' },
    { id: 'social', label: 'Social Media', icon: 'Share2' },
    { id: 'creative', label: 'Creative & Artistic', icon: 'Palette' }
  ];

  const mediaTypes = [
    { id: 'all', label: 'All Media', icon: 'FileImage' },
    { id: 'image', label: 'Images Only', icon: 'Image' },
    { id: 'video', label: 'Videos Only', icon: 'Video' },
    { id: 'mixed', label: 'Mixed Media', icon: 'Layers' }
  ];

  const hasActiveFilters = selectedCategory !== 'all' || selectedMediaType !== 'all' || searchQuery?.length > 0;

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-input text-text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-text-primary"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>
      {/* Category Filters */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Media Type Filters */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Media Type</h4>
        <div className="flex flex-wrap gap-2">
          {mediaTypes?.map((mediaType) => (
            <button
              key={mediaType?.id}
              onClick={() => onMediaTypeChange(mediaType?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                selectedMediaType === mediaType?.id
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-muted/80'
              }`}
            >
              <Icon name={mediaType?.icon} size={16} />
              <span>{mediaType?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-text-primary"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default TemplateFilters;