import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SettingsActions = ({ onSave, onReset, hasUnsavedChanges }) => {
  const [isResetting, setIsResetting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
      // Show success notification
      if (window.showNotification) {
        window.showNotification('success', 'Settings saved successfully');
      }
    } catch (error) {
      // Show error notification
      if (window.showNotification) {
        window.showNotification('error', 'Failed to save settings');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.showModalNotification) {
      window.showModalNotification(
        'warning',
        'Reset Settings',
        'Are you sure you want to reset all settings to their default values? This action cannot be undone.',
        [
          {
            label: 'Reset Settings',
            variant: 'destructive',
            onClick: async () => {
              setIsResetting(true);
              try {
                await onReset();
                if (window.showNotification) {
                  window.showNotification('success', 'Settings reset to defaults');
                }
              } catch (error) {
                if (window.showNotification) {
                  window.showNotification('error', 'Failed to reset settings');
                }
              } finally {
                setIsResetting(false);
              }
            }
          }
        ]
      );
    }
  };

  const handleExportSettings = () => {
    try {
      const settings = JSON.parse(localStorage.getItem('reelsmith_settings') || '{}');
      const dataStr = JSON.stringify(settings, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `reelsmith_settings_${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      link?.click();
      
      if (window.showNotification) {
        window.showNotification('success', 'Settings exported successfully');
      }
    } catch (error) {
      if (window.showNotification) {
        window.showNotification('error', 'Failed to export settings');
      }
    }
  };

  const handleImportSettings = (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e?.target?.result);
        localStorage.setItem('reelsmith_settings', JSON.stringify(importedSettings));
        
        if (window.showNotification) {
          window.showNotification('success', 'Settings imported successfully. Please refresh the page.');
        }
        
        // Refresh page after a short delay
        setTimeout(() => {
          window.location?.reload();
        }, 2000);
      } catch (error) {
        if (window.showNotification) {
          window.showNotification('error', 'Invalid settings file format');
        }
      }
    };
    reader?.readAsText(file);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Save" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Settings Management</h3>
      </div>
      <div className="space-y-4">
        {/* Save and Reset Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
            loading={isSaving}
            disabled={!hasUnsavedChanges}
            className="flex-1"
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>

          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleReset}
            loading={isResetting}
            className="flex-1"
          >
            {isResetting ? 'Resetting...' : 'Reset to Defaults'}
          </Button>
        </div>

        {/* Import/Export Actions */}
        <div className="border-t border-border pt-4">
          <p className="text-sm font-medium text-text-primary mb-3">Backup & Restore</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="ghost"
              iconName="Download"
              iconPosition="left"
              onClick={handleExportSettings}
              className="flex-1"
            >
              Export Settings
            </Button>

            <div className="flex-1">
              <input
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="hidden"
                id="import-settings"
              />
              <Button
                variant="ghost"
                iconName="Upload"
                iconPosition="left"
                onClick={() => document.getElementById('import-settings')?.click()}
                fullWidth
              >
                Import Settings
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Export your settings as a backup or import previously saved settings
          </p>
        </div>

        {/* Status Indicator */}
        {hasUnsavedChanges && (
          <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="AlertCircle" size={16} className="text-warning" />
            <p className="text-sm text-warning">
              You have unsaved changes. Don't forget to save your settings.
            </p>
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">Settings Storage</p>
              <p className="text-xs text-muted-foreground">
                Settings are stored locally in your browser. They will persist across sessions 
                but won't sync between different devices or browsers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsActions;