import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const WatermarkSettings = ({ settings, onSettingsChange }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const positionOptions = [
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' },
    { value: 'center', label: 'Center' },
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' }
  ];

  const handleWatermarkChange = (field, value) => {
    onSettingsChange('watermark', {
      ...settings?.watermark,
      [field]: value
    });
  };

  const getPreviewPosition = () => {
    const position = settings?.watermark?.position;
    switch (position) {
      case 'top-left':
        return 'top-2 left-2';
      case 'top-right':
        return 'top-2 right-2';
      case 'bottom-left':
        return 'bottom-2 left-2';
      case 'bottom-right':
        return 'bottom-2 right-2';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'bottom-2 right-2';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Type" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Watermark Settings</h3>
        </div>
        <button
          onClick={() => setPreviewVisible(!previewVisible)}
          className="text-sm text-primary hover:text-primary/80 transition-smooth"
        >
          {previewVisible ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>
      <div className="space-y-4">
        <Input
          label="Default Watermark Text"
          type="text"
          placeholder="Enter your watermark text"
          description="This text will appear on all exported videos by default"
          value={settings?.watermark?.text}
          onChange={(e) => handleWatermarkChange('text', e?.target?.value)}
          className="mb-4"
        />

        <Select
          label="Watermark Position"
          description="Choose where the watermark appears on your videos"
          options={positionOptions}
          value={settings?.watermark?.position}
          onChange={(value) => handleWatermarkChange('position', value)}
          className="mb-4"
        />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Opacity: {Math.round(settings?.watermark?.opacity * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={settings?.watermark?.opacity}
            onChange={(e) => handleWatermarkChange('opacity', parseFloat(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>10%</span>
            <span>100%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Lower opacity makes the watermark more subtle
          </p>
        </div>

        {/* Live Preview */}
        {previewVisible && settings?.watermark?.text && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Live Preview
            </label>
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg aspect-[9/16] max-w-48 mx-auto">
              <div
                className={`absolute text-white text-xs font-medium px-2 py-1 bg-black/20 rounded ${getPreviewPosition()}`}
                style={{ opacity: settings?.watermark?.opacity }}
              >
                {settings?.watermark?.text}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatermarkSettings;