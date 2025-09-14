import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyTemplateState = ({ 
  searchQuery, 
  selectedCategory, 
  selectedMediaType, 
  onClearFilters,
  onRetry 
}) => {
  const hasFilters = searchQuery || selectedCategory !== 'all' || selectedMediaType !== 'all';

  if (hasFilters) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No templates found
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          We couldn't find any templates matching your current filters. Try adjusting your search criteria or browse all available templates.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
          <Button
            variant="default"
            onClick={() => window.location.href = '/reel-analysis-input'}
            iconName="Search"
            iconPosition="left"
          >
            Analyze New Reel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="AlertCircle" size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-text-primary mb-2">
        Templates not available
      </h3>
      <p className="text-text-secondary mb-6 max-w-md mx-auto">
        We're having trouble loading the template configurations. This might be a temporary issue with the template files.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="outline"
          onClick={onRetry}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Try Again
        </Button>
        <Button
          variant="default"
          onClick={() => window.location.href = '/ideas-collection'}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Ideas
        </Button>
      </div>
    </div>
  );
};

export default EmptyTemplateState;