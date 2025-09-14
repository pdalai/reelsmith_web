import React from 'react';
import Icon from '../../../components/AppIcon';

const ExportSettings = ({ 
  template = 'Travel_KenBurns',
  mediaCount = 0,
  outputFormat = '1080x1920 MP4',
  codec = 'H.264',
  frameRate = '30fps',
  estimatedSize = '15-25 MB',
  watermark = 'ReelSmith',
  backgroundMusic = true
}) => {
  const settingsData = [
    {
      label: 'Template',
      value: template,
      icon: 'Layout'
    },
    {
      label: 'Media Files',
      value: `${mediaCount} files`,
      icon: 'FileImage'
    },
    {
      label: 'Output Format',
      value: outputFormat,
      icon: 'Monitor'
    },
    {
      label: 'Video Codec',
      value: codec,
      icon: 'Video'
    },
    {
      label: 'Frame Rate',
      value: frameRate,
      icon: 'Zap'
    },
    {
      label: 'Estimated Size',
      value: estimatedSize,
      icon: 'HardDrive'
    },
    {
      label: 'Watermark',
      value: watermark,
      icon: 'Type'
    },
    {
      label: 'Background Music',
      value: backgroundMusic ? 'Enabled' : 'Disabled',
      icon: backgroundMusic ? 'Volume2' : 'VolumeX'
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Settings" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Export Settings</h3>
      </div>
      <div className="space-y-4">
        {settingsData?.map((setting, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Icon 
                name={setting?.icon} 
                size={16} 
                className="text-muted-foreground" 
              />
              <span className="text-sm font-medium text-text-secondary">
                {setting?.label}
              </span>
            </div>
            <span className="text-sm font-medium text-text-primary">
              {setting?.value}
            </span>
          </div>
        ))}
      </div>
      {/* Quality Settings */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-sm font-medium text-text-primary mb-3">Quality Settings</div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>CRF Quality:</span>
            <span className="text-text-primary">22 (High)</span>
          </div>
          <div className="flex justify-between">
            <span>Pixel Format:</span>
            <span className="text-text-primary">yuv420p</span>
          </div>
          <div className="flex justify-between">
            <span>Audio Codec:</span>
            <span className="text-text-primary">AAC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportSettings;