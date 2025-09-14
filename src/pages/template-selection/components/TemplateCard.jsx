import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplateCard = ({ template, onSelect, isSelected = false }) => {
  const getSupportedFormatsText = (formats) => {
    return formats?.join(', ');
  };

  const getOutputSpecsText = (specs) => {
    return `${specs?.resolution} • ${specs?.fps}fps`;
  };

  return (
    <div className={`bg-card border rounded-lg shadow-soft transition-smooth hover:shadow-elevated ${
      isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
    }`}>
      {/* Preview Thumbnail */}
      <div className="relative h-48 overflow-hidden rounded-t-lg bg-muted">
        <Image
          src={template?.thumbnail}
          alt={`${template?.name} template preview`}
          className="w-full h-full object-cover"
        />
        {template?.isNew && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
            New
          </div>
        )}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <div className="bg-primary text-primary-foreground rounded-full p-2">
              <Icon name="Check" size={20} />
            </div>
          </div>
        )}
      </div>
      {/* Template Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {template?.name}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {template?.description}
          </p>
        </div>

        {/* Effects & Capabilities */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">Effects & Features</h4>
          <div className="flex flex-wrap gap-2">
            {template?.effects?.map((effect, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
              >
                {effect}
              </span>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">Best For</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            {template?.useCases?.map((useCase, index) => (
              <li key={index} className="flex items-start">
                <Icon name="Check" size={14} className="text-success mt-0.5 mr-2 flex-shrink-0" />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Specifications */}
        <div className="mb-6 p-3 bg-muted rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-text-secondary">Supported Formats:</span>
              <div className="font-medium text-text-primary">
                {getSupportedFormatsText(template?.supportedFormats)}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Output:</span>
              <div className="font-medium text-text-primary">
                {getOutputSpecsText(template?.outputSpecs)}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Duration:</span>
              <div className="font-medium text-text-primary">
                {template?.duration}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Transitions:</span>
              <div className="font-medium text-text-primary">
                {template?.transitions}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          fullWidth
          iconName={isSelected ? "Check" : "ArrowRight"}
          iconPosition="right"
          onClick={() => onSelect(template)}
          className="transition-smooth"
        >
          {isSelected ? "Selected" : "Select Template"}
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard;