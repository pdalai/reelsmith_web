import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExportPreferences = ({ settings, onSettingsChange }) => {
  const qualityOptions = [
    { value: 18, label: 'High Quality (CRF 18)', description: 'Best quality, larger file size' },
    { value: 22, label: 'Balanced (CRF 22)', description: 'Good quality, moderate file size' },
    { value: 26, label: 'Standard (CRF 26)', description: 'Standard quality, smaller file size' },
    { value: 30, label: 'Low Quality (CRF 30)', description: 'Lower quality, smallest file size' }
  ];

  const pixelFormatOptions = [
    { value: 'yuv420p', label: 'YUV420P (Recommended)', description: 'Best compatibility across devices' },
    { value: 'yuv422p', label: 'YUV422P', description: 'Higher quality, larger file size' },
    { value: 'yuv444p', label: 'YUV444P', description: 'Highest quality, largest file size' }
  ];

  const audioEncodingOptions = [
    { value: 'aac', label: 'AAC (Recommended)', description: 'Best compatibility and quality' },
    { value: 'mp3', label: 'MP3', description: 'Good compatibility' },
    { value: 'opus', label: 'Opus', description: 'High efficiency, modern browsers' }
  ];

  const handleExportChange = (field, value) => {
    onSettingsChange('export', {
      ...settings?.export,
      [field]: value
    });
  };

  const getQualityWarning = () => {
    if (settings?.export?.crfValue <= 18) {
      return {
        type: 'warning',
        message: 'High quality settings may result in longer export times and larger file sizes.'
      };
    }
    if (settings?.export?.crfValue >= 30) {
      return {
        type: 'info',
        message: 'Lower quality settings will export faster but may reduce video clarity.'
      };
    }
    return null;
  };

  const warning = getQualityWarning();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Settings" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Export Preferences</h3>
      </div>
      <div className="space-y-6">
        <Select
          label="Video Quality"
          description="Higher CRF values mean lower quality but smaller file sizes"
          options={qualityOptions}
          value={settings?.export?.crfValue}
          onChange={(value) => handleExportChange('crfValue', value)}
          className="mb-4"
        />

        {warning && (
          <div className={`flex items-start space-x-2 p-3 rounded-lg ${
            warning?.type === 'warning' ? 'bg-warning/10 border border-warning/20' : 'bg-primary/10 border border-primary/20'
          }`}>
            <Icon 
              name={warning?.type === 'warning' ? 'AlertTriangle' : 'Info'} 
              size={16} 
              className={warning?.type === 'warning' ? 'text-warning mt-0.5' : 'text-primary mt-0.5'} 
            />
            <p className={`text-sm ${warning?.type === 'warning' ? 'text-warning' : 'text-primary'}`}>
              {warning?.message}
            </p>
          </div>
        )}

        <Select
          label="Pixel Format"
          description="Determines color sampling and compatibility"
          options={pixelFormatOptions}
          value={settings?.export?.pixelFormat}
          onChange={(value) => handleExportChange('pixelFormat', value)}
          className="mb-4"
        />

        <Select
          label="Audio Encoding"
          description="Audio codec for the exported video"
          options={audioEncodingOptions}
          value={settings?.export?.audioEncoding}
          onChange={(value) => handleExportChange('audioEncoding', value)}
          className="mb-4"
        />

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Frame Rate: {settings?.export?.frameRate} FPS
          </label>
          <input
            type="range"
            min="24"
            max="60"
            step="6"
            value={settings?.export?.frameRate}
            onChange={(e) => handleExportChange('frameRate', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>24 FPS</span>
            <span>30 FPS</span>
            <span>60 FPS</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Higher frame rates create smoother motion but increase file size
          </p>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Hardware acceleration"
            description="Use GPU acceleration for faster exports (when available)"
            checked={settings?.export?.hardwareAcceleration}
            onChange={(e) => handleExportChange('hardwareAcceleration', e?.target?.checked)}
          />

          <Checkbox
            label="Auto-optimize for mobile"
            description="Apply mobile-friendly encoding settings"
            checked={settings?.export?.mobileOptimized}
            onChange={(e) => handleExportChange('mobileOptimized', e?.target?.checked)}
          />

          <Checkbox
            label="Include metadata"
            description="Embed creation date and app information in exported videos"
            checked={settings?.export?.includeMetadata}
            onChange={(e) => handleExportChange('includeMetadata', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExportPreferences;