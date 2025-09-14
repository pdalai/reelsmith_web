import React from 'react';
import Icon from '../../../components/AppIcon';

const TemplateLoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)]?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
          {/* Thumbnail Skeleton */}
          <div className="h-48 bg-muted animate-pulse relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="Image" size={32} className="text-muted-foreground" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-6">
            {/* Title */}
            <div className="h-6 bg-muted rounded animate-pulse mb-2" />
            
            {/* Description */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            </div>

            {/* Effects Tags */}
            <div className="mb-4">
              <div className="h-4 bg-muted rounded animate-pulse w-1/2 mb-2" />
              <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-muted rounded animate-pulse w-16" />
                <div className="h-6 bg-muted rounded animate-pulse w-20" />
                <div className="h-6 bg-muted rounded animate-pulse w-14" />
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-4">
              <div className="h-4 bg-muted rounded animate-pulse w-1/3 mb-2" />
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded animate-pulse" />
                <div className="h-3 bg-muted rounded animate-pulse w-5/6" />
                <div className="h-3 bg-muted rounded animate-pulse w-4/5" />
              </div>
            </div>

            {/* Specs */}
            <div className="mb-6 p-3 bg-muted/50 rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                  <div className="h-3 bg-muted rounded animate-pulse w-3/5" />
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="h-10 bg-muted rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateLoadingState;