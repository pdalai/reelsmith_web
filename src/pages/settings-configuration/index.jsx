import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import StatusNotification from '../../components/ui/StatusNotification';
import WatermarkSettings from './components/WatermarkSettings';
import BackgroundMusicSettings from './components/BackgroundMusicSettings';
import ExportPreferences from './components/ExportPreferences';
import TemplateDefaults from './components/TemplateDefaults';
import SettingsActions from './components/SettingsActions';
import Icon from '../../components/AppIcon';

const SettingsConfiguration = () => {
  const [settings, setSettings] = useState({
    watermark: {
      text: 'ReelSmith',
      position: 'bottom-right',
      opacity: 0.7
    },
    backgroundMusic: {
      enabled: true,
      volume: 0.3,
      customFile: null,
      loop: true,
      fadeEffects: true
    },
    export: {
      crfValue: 22,
      pixelFormat: 'yuv420p',
      audioEncoding: 'aac',
      frameRate: 30,
      hardwareAcceleration: true,
      mobileOptimized: true,
      includeMetadata: true
    },
    templateDefaults: {
      preferredTemplate: 'none',
      transitionDuration: 0.5,
      kenBurnsZoom: 1.1,
      clipDuration: 2.0,
      autoCropVertical: true,
      smartContentDetection: false,
      autoEnhanceColors: false,
      autoGenerateCaptions: false
    }
  });

  const [originalSettings, setOriginalSettings] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('reelsmith_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        setOriginalSettings(parsed);
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    } else {
      setOriginalSettings(settings);
    }
  }, []);

  // Check for unsaved changes
  useEffect(() => {
    if (originalSettings) {
      const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);
      setHasUnsavedChanges(hasChanges);
    }
  }, [settings, originalSettings]);

  const handleSettingsChange = (section, newSectionSettings) => {
    setSettings(prev => ({
      ...prev,
      [section]: newSectionSettings
    }));
  };

  const handleSave = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('reelsmith_settings', JSON.stringify(settings));
        setOriginalSettings(settings);
        setHasUnsavedChanges(false);
        resolve();
      }, 1000);
    });
  };

  const handleReset = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const defaultSettings = {
          watermark: {
            text: 'ReelSmith',
            position: 'bottom-right',
            opacity: 0.7
          },
          backgroundMusic: {
            enabled: true,
            volume: 0.3,
            customFile: null,
            loop: true,
            fadeEffects: true
          },
          export: {
            crfValue: 22,
            pixelFormat: 'yuv420p',
            audioEncoding: 'aac',
            frameRate: 30,
            hardwareAcceleration: true,
            mobileOptimized: true,
            includeMetadata: true
          },
          templateDefaults: {
            preferredTemplate: 'none',
            transitionDuration: 0.5,
            kenBurnsZoom: 1.1,
            clipDuration: 2.0,
            autoCropVertical: true,
            smartContentDetection: false,
            autoEnhanceColors: false,
            autoGenerateCaptions: false
          }
        };
        
        setSettings(defaultSettings);
        setOriginalSettings(defaultSettings);
        localStorage.removeItem('reelsmith_settings');
        setHasUnsavedChanges(false);
        resolve();
      }, 1000);
    });
  };

  const settingsSections = [
    { id: 'watermark', name: 'Watermark', icon: 'Type' },
    { id: 'music', name: 'Background Music', icon: 'Music' },
    { id: 'export', name: 'Export Quality', icon: 'Settings' },
    { id: 'templates', name: 'Template Defaults', icon: 'Layout' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setTimeout(() => setActiveSection(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <StatusNotification />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Settings Configuration</h1>
                <p className="text-muted-foreground">
                  Customize your video creation preferences and export settings
                </p>
              </div>
            </div>

            {/* Quick Navigation - Mobile */}
            <div className="lg:hidden mb-6">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {settingsSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => scrollToSection(section?.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth whitespace-nowrap"
                  >
                    <Icon name={section?.icon} size={16} />
                    <span>{section?.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Settings Sections</h3>
                  <nav className="space-y-1">
                    {settingsSections?.map((section) => (
                      <button
                        key={section?.id}
                        onClick={() => scrollToSection(section?.id)}
                        className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-smooth text-left ${
                          activeSection === section?.id
                            ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                        }`}
                      >
                        <Icon name={section?.icon} size={16} />
                        <span>{section?.name}</span>
                      </button>
                    ))}
                  </nav>

                  {hasUnsavedChanges && (
                    <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertCircle" size={16} className="text-warning" />
                        <p className="text-xs text-warning font-medium">Unsaved Changes</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Watermark Settings */}
              <div id="watermark" className={`transition-all duration-300 ${
                activeSection === 'watermark' ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
                <WatermarkSettings
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                />
              </div>

              {/* Background Music Settings */}
              <div id="music" className={`transition-all duration-300 ${
                activeSection === 'music' ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
                <BackgroundMusicSettings
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                />
              </div>

              {/* Export Preferences */}
              <div id="export" className={`transition-all duration-300 ${
                activeSection === 'export' ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
                <ExportPreferences
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                />
              </div>

              {/* Template Defaults */}
              <div id="templates" className={`transition-all duration-300 ${
                activeSection === 'templates' ? 'ring-2 ring-primary/20 rounded-lg' : ''
              }`}>
                <TemplateDefaults
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                />
              </div>

              {/* Settings Actions */}
              <SettingsActions
                onSave={handleSave}
                onReset={handleReset}
                hasUnsavedChanges={hasUnsavedChanges}
              />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Padding */}
        <div className="h-20 sm:hidden" />
      </main>
    </div>
  );
};

export default SettingsConfiguration;