import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ 
  searchQuery, 
  onSearchChange, 
  selectedTags, 
  onTagToggle, 
  availableTags,
  onClearFilters 
}) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const hasActiveFilters = searchQuery || selectedTags?.length > 0;

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search ideas by URL, tags, or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <Button
            variant={isFilterExpanded ? "default" : "outline"}
            iconName="Filter"
            iconPosition="left"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="flex-shrink-0"
          >
            <span className="hidden sm:inline">Filters</span>
            {selectedTags?.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                {selectedTags?.length}
              </span>
            )}
          </Button>
        </div>

        {/* Filter Panel */}
        {isFilterExpanded && (
          <div className="bg-muted rounded-lg p-4 space-y-4">
            {/* Filter Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text-primary">
                Filter by Style Tags
              </h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={onClearFilters}
                  className="text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Tag Filters */}
            {availableTags?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {availableTags?.map((tag) => {
                  const isSelected = selectedTags?.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => onTagToggle(tag)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/50'
                      }`}
                    >
                      {tag}
                      {isSelected && (
                        <Icon name="X" size={12} className="ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="Tag" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No tags available yet. Analyze some Reels to see style tags here.
                </p>
              </div>
            )}

            {/* Filter Stats */}
            {availableTags?.length > 0 && (
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  {availableTags?.length} unique tags available
                </div>
                {selectedTags?.length > 0 && (
                  <div className="text-xs text-primary font-medium">
                    {selectedTags?.length} selected
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && !isFilterExpanded && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                Search: "{searchQuery?.length > 20 ? searchQuery?.substring(0, 20) + '...' : searchQuery}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:text-primary/70"
                >
                  <Icon name="X" size={10} />
                </button>
              </span>
            )}
            {selectedTags?.slice(0, 3)?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md"
              >
                {tag}
                <button
                  onClick={() => onTagToggle(tag)}
                  className="ml-1 hover:text-secondary/70"
                >
                  <Icon name="X" size={10} />
                </button>
              </span>
            ))}
            {selectedTags?.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{selectedTags?.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;