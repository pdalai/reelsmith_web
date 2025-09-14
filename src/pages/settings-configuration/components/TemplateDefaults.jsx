import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TemplateDefaults = ({ settings, onSettingsChange }) => {
  const templateOptions = [
    { value: 'Travel_KenBurns', label: 'Travel Ken Burns', description: 'Perfect for travel photos with zoom effects' },
    { value: 'Talking_Captions', label: 'Talking Captions', description: 'Ideal for talking head videos with captions' },
    { value: 'none', label: 'No Default', description: 'Always ask for template selection' }
  ];

  const transitionOptions = [
    { value: 0.3, label: 'Quick (0.3s)', description: 'Fast transitions' },
    { value: 0.5, label: 'Standard (0.5s)', description: 'Balanced timing' },
    { value: 0.8, label: 'Smooth (0.8s)', description: 'Slower, smoother transitions' },
    { value: 1.0, label: 'Cinematic (1.0s)', description: 'Dramatic, slow transitions' }
  ];

  const handleTemplateChange = (field, value) => {
    onSettingsChange('templateDefaults', {
      ...settings?.templateDefaults,
      [field]: value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Layout" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Template Defaults</h3>
      </div>
      <div className="space-y-6">
        <Select
          label="Default Template"
          description="Template to use automatically for new projects"
          options={templateOptions}
          value={settings?.templateDefaults?.preferredTemplate}
          onChange={(value) => handleTemplateChange('preferredTemplate', value)}
          className="mb-4"
        />

        <Select
          label="Transition Duration"
          description="Default duration for crossfade transitions between clips"
          options={transitionOptions}
          value={settings?.templateDefaults?.transitionDuration}
          onChange={(value) => handleTemplateChange('transitionDuration', value)}
          className="mb-4"
        />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Ken Burns Zoom Intensity: {settings?.templateDefaults?.kenBurnsZoom}x
          </label>
          <input
            type="range"
            min="1.05"
            max="1.3"
            step="0.05"
            value={settings?.templateDefaults?.kenBurnsZoom}
            onChange={(e) => handleTemplateChange('kenBurnsZoom', parseFloat(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1.05x (Subtle)</span>
            <span>1.15x (Standard)</span>
            <span>1.3x (Dramatic)</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Controls how much images zoom during Ken Burns effect
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Default Clip Duration: {settings?.templateDefaults?.clipDuration}s
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={settings?.templateDefaults?.clipDuration}
            onChange={(e) => handleTemplateChange('clipDuration', parseFloat(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1s</span>
            <span>2s</span>
            <span>3s</span>
            <span>5s</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            How long each image or video clip appears by default
          </p>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Auto-crop to vertical format"
            description="Automatically crop media to 9:16 aspect ratio"
            checked={settings?.templateDefaults?.autoCropVertical}
            onChange={(e) => handleTemplateChange('autoCropVertical', e?.target?.checked)}
          />

          <Checkbox
            label="Smart content detection"
            description="Automatically detect faces and important content for better cropping"
            checked={settings?.templateDefaults?.smartContentDetection}
            onChange={(e) => handleTemplateChange('smartContentDetection', e?.target?.checked)}
          />

          <Checkbox
            label="Auto-enhance colors"
            description="Apply automatic color correction and enhancement"
            checked={settings?.templateDefaults?.autoEnhanceColors}
            onChange={(e) => handleTemplateChange('autoEnhanceColors', e?.target?.checked)}
          />

          <Checkbox
            label="Generate captions automatically"
            description="Create captions from video audio when available"
            checked={settings?.templateDefaults?.autoGenerateCaptions}
            onChange={(e) => handleTemplateChange('autoGenerateCaptions', e?.target?.checked)}
          />
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">Template Processing</p>
              <p className="text-xs text-muted-foreground">
                These settings apply to new projects. Existing projects retain their original settings. 
                Smart features may increase processing time but improve output quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDefaults;