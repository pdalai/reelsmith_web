import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplatePreview = ({ template, isOpen, onClose, onSelect }) => {
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  if (!isOpen || !template) return null;

  const handlePrevPreview = () => {
    setCurrentPreviewIndex(prev => 
      prev === 0 ? template?.previewImages?.length - 1 : prev - 1
    );
  };

  const handleNextPreview = () => {
    setCurrentPreviewIndex(prev => 
      prev === template?.previewImages?.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="fixed inset-0 z-critical flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-surface rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              {template?.name} Preview
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {template?.description}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          >
            <span className="sr-only">Close preview</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview Gallery */}
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-4">
                Template Examples
              </h3>
              
              {/* Main Preview */}
              <div className="relative aspect-[9/16] bg-muted rounded-lg overflow-hidden mb-4">
                <Image
                  src={template?.previewImages?.[currentPreviewIndex]}
                  alt={`${template?.name} preview ${currentPreviewIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Controls */}
                {template?.previewImages?.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPreview}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-smooth"
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </button>
                    <button
                      onClick={handleNextPreview}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-smooth"
                    >
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </>
                )}
                
                {/* Preview Indicators */}
                {template?.previewImages?.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                    {template?.previewImages?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPreviewIndex(index)}
                        className={`w-2 h-2 rounded-full transition-smooth ${
                          index === currentPreviewIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Template Details */}
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-4">
                Template Details
              </h3>
              
              {/* Effects */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  Effects & Features
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {template?.effects?.map((effect, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-muted rounded-md"
                    >
                      <Icon name="Sparkles" size={16} className="text-primary" />
                      <span className="text-sm text-text-primary">{effect}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  Perfect For
                </h4>
                <ul className="space-y-2">
                  {template?.useCases?.map((useCase, index) => (
                    <li key={index} className="flex items-start">
                      <Icon name="Check" size={16} className="text-success mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specs */}
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Supported Formats:</span>
                    <span className="font-medium text-text-primary">
                      {template?.supportedFormats?.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Output Resolution:</span>
                    <span className="font-medium text-text-primary">
                      {template?.outputSpecs?.resolution}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Frame Rate:</span>
                    <span className="font-medium text-text-primary">
                      {template?.outputSpecs?.fps}fps
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Duration:</span>
                    <span className="font-medium text-text-primary">
                      {template?.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Transitions:</span>
                    <span className="font-medium text-text-primary">
                      {template?.transitions}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Close Preview
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    onSelect(template);
                    onClose();
                  }}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="flex-1"
                >
                  Select Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;