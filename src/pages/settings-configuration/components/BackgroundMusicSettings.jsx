import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BackgroundMusicSettings = ({ settings, onSettingsChange }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleMusicChange = (field, value) => {
    onSettingsChange('backgroundMusic', {
      ...settings?.backgroundMusic,
      [field]: value
    });
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      // Validate file format
      const allowedFormats = ['audio/mp3', 'audio/mpeg', 'audio/wav'];
      if (!allowedFormats?.includes(file?.type)) {
        alert('Please upload MP3 or WAV files only');
        return;
      }

      // Check file size (max 10MB)
      if (file?.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      setUploadedFile(file);
      handleMusicChange('customFile', file?.name);
    }
  };

  const removeCustomFile = () => {
    setUploadedFile(null);
    handleMusicChange('customFile', null);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Music" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Background Music Settings</h3>
      </div>
      <div className="space-y-6">
        <Checkbox
          label="Include background music by default"
          description="Automatically add background music to new video projects"
          checked={settings?.backgroundMusic?.enabled}
          onChange={(e) => handleMusicChange('enabled', e?.target?.checked)}
        />

        {settings?.backgroundMusic?.enabled && (
          <>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Volume: {Math.round(settings?.backgroundMusic?.volume * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={settings?.backgroundMusic?.volume}
                onChange={(e) => handleMusicChange('volume', parseFloat(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>10%</span>
                <span>100%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Adjust the background music volume relative to video audio
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Custom Background Music
              </label>
              
              {!settings?.backgroundMusic?.customFile ? (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload your custom background music
                  </p>
                  <input
                    type="file"
                    accept=".mp3,.wav,audio/mp3,audio/mpeg,audio/wav"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="music-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('music-upload')?.click()}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Choose Audio File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supports MP3, WAV files up to 10MB
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Music" size={20} className="text-success" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {settings?.backgroundMusic?.customFile}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Custom background music uploaded
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeCustomFile}
                    iconName="X"
                    iconSize={16}
                  >
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              )}
            </div>

            <Checkbox
              label="Loop background music"
              description="Repeat the background music to match video length"
              checked={settings?.backgroundMusic?.loop}
              onChange={(e) => handleMusicChange('loop', e?.target?.checked)}
            />

            <Checkbox
              label="Fade in/out"
              description="Apply smooth fade effects to background music"
              checked={settings?.backgroundMusic?.fadeEffects}
              onChange={(e) => handleMusicChange('fadeEffects', e?.target?.checked)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BackgroundMusicSettings;