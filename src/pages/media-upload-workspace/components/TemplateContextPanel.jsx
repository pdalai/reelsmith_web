import React from 'react';
import Icon from '../../../components/AppIcon';

const TemplateContextPanel = ({ selectedTemplate, outputSpecs }) => {
  const templateInfo = {
    'Travel_KenBurns': {
      name: 'Travel Ken Burns',
      description: 'Creates cinematic travel videos with smooth zoom effects on images',
      features: [
        'Ken Burns zoom effect (1.1x zoom)',
        '2-second duration per image',
        'Crossfade transitions (0.5s)',
        'Background music support',
        'Watermark overlay'
      ],
      icon: 'Mountain'
    },
    'Talking_Captions': {
      name: 'Talking Captions',
      description: 'Perfect for talking head videos with automatic caption placement',
      features: [
        'Video trimming to 3 seconds',
        'Scale and crop to vertical',
        'Caption overlay zones',
        'Background music support',
        'Professional watermarks'
      ],
      icon: 'MessageSquare'
    }
  };

  const template = templateInfo?.[selectedTemplate] || templateInfo?.['Travel_KenBurns'];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Template Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={template?.icon} size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            {template?.name}
          </h3>
          <p className="text-sm text-text-secondary">
            Selected Template
          </p>
        </div>
      </div>
      {/* Template Description */}
      <p className="text-sm text-text-secondary mb-4">
        {template?.description}
      </p>
      {/* Template Features */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Template Features
        </h4>
        <div className="space-y-2">
          {template?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success flex-shrink-0" />
              <span className="text-xs text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Output Specifications */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">
          Output Specifications
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-md p-3">
            <div className="text-xs text-muted-foreground">Resolution</div>
            <div className="text-sm font-medium text-text-primary">
              {outputSpecs?.resolution}
            </div>
          </div>
          <div className="bg-muted/50 rounded-md p-3">
            <div className="text-xs text-muted-foreground">Frame Rate</div>
            <div className="text-sm font-medium text-text-primary">
              {outputSpecs?.frameRate}
            </div>
          </div>
          <div className="bg-muted/50 rounded-md p-3">
            <div className="text-xs text-muted-foreground">Format</div>
            <div className="text-sm font-medium text-text-primary">
              {outputSpecs?.format}
            </div>
          </div>
          <div className="bg-muted/50 rounded-md p-3">
            <div className="text-xs text-muted-foreground">Quality</div>
            <div className="text-sm font-medium text-text-primary">
              {outputSpecs?.quality}
            </div>
          </div>
        </div>
      </div>
      {/* Template Tips */}
      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={14} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-medium text-primary mb-1">
              Pro Tip
            </div>
            <div className="text-xs text-text-secondary">
              {selectedTemplate === 'Travel_KenBurns' ?'Upload high-resolution images for best Ken Burns effect. Landscape orientation works best.' :'Upload clear talking head videos. Keep important content in the center for vertical cropping.'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateContextPanel;