import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CollectionHeader = ({ 
  totalIdeas, 
  sortBy, 
  onSortChange, 
  onAnalyzeNew, 
  onImportIdeas, 
  onExportCollection 
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'mostTags', label: 'Most Tags' }
  ];

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Title and Stats */}
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">
                Ideas Collection
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                {totalIdeas === 0 
                  ? 'No saved ideas yet' 
                  : `${totalIdeas} saved ${totalIdeas === 1 ? 'idea' : 'ideas'}`
                }
              </p>
            </div>
            
            {totalIdeas > 0 && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                <Icon name="TrendingUp" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  {totalIdeas} Analyzed
                </span>
              </div>
            )}
          </div>

          {/* Actions and Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Sort Control */}
            {totalIdeas > 1 && (
              <div className="min-w-0 sm:min-w-[160px]">
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={onSortChange}
                  placeholder="Sort by..."
                  className="w-full"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={onAnalyzeNew}
                className="flex-1 sm:flex-none"
              >
                <span className="sm:hidden">New Analysis</span>
                <span className="hidden sm:inline">Analyze New Reel</span>
              </Button>

              {/* Secondary Actions - Desktop Only */}
              <div className="hidden lg:flex gap-2">
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  onClick={onImportIdeas}
                >
                  Import
                </Button>
                
                {totalIdeas > 0 && (
                  <Button
                    variant="ghost"
                    iconName="Download"
                    iconPosition="left"
                    onClick={onExportCollection}
                  >
                    Export
                  </Button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  iconName="MoreVertical"
                  size="icon"
                  onClick={() => {
                    // Show mobile menu
                    console.log('Show mobile menu');
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        {totalIdeas > 0 && (
          <div className="sm:hidden mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <Icon name="TrendingUp" size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary">
                {totalIdeas} Analyzed
              </span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Last updated: {new Date()?.toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionHeader;