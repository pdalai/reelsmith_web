import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';

const ActionContextPanel = ({ className = '' }) => {
  const location = useLocation();

  const getContextActions = () => {
    switch (location?.pathname) {
      case '/reel-analysis-input':
        return [
          { label: 'Analyze Reel', variant: 'default', iconName: 'Search', action: 'analyze' },
          { label: 'Save Draft', variant: 'outline', iconName: 'Save', action: 'save' }
        ];
      
      case '/ideas-collection':
        return [
          { label: 'New Analysis', variant: 'default', iconName: 'Plus', action: 'create' },
          { label: 'Import Ideas', variant: 'outline', iconName: 'Upload', action: 'import' },
          { label: 'Export Collection', variant: 'ghost', iconName: 'Download', action: 'export' }
        ];
      
      case '/template-selection':
        return [
          { label: 'Use Template', variant: 'default', iconName: 'Check', action: 'select' },
          { label: 'Preview', variant: 'outline', iconName: 'Eye', action: 'preview' },
          { label: 'Customize', variant: 'secondary', iconName: 'Edit', action: 'customize' }
        ];
      
      case '/media-upload-workspace':
        return [
          { label: 'Upload Media', variant: 'default', iconName: 'Upload', action: 'upload' },
          { label: 'Record Video', variant: 'outline', iconName: 'Video', action: 'record' },
          { label: 'Continue to Export', variant: 'success', iconName: 'ArrowRight', action: 'continue' }
        ];
      
      case '/video-export-studio':
        return [
          { label: 'Export Video', variant: 'success', iconName: 'Download', action: 'export' },
          { label: 'Preview Final', variant: 'outline', iconName: 'Play', action: 'preview' },
          { label: 'Save Project', variant: 'ghost', iconName: 'Save', action: 'save' }
        ];
      
      case '/settings-configuration':
        return [
          { label: 'Save Settings', variant: 'default', iconName: 'Save', action: 'save' },
          { label: 'Reset to Default', variant: 'outline', iconName: 'RotateCcw', action: 'reset' },
          { label: 'Export Config', variant: 'ghost', iconName: 'Download', action: 'export' }
        ];
      
      default:
        return [];
    }
  };

  const actions = getContextActions();

  if (actions?.length === 0) {
    return null;
  }

  const handleAction = (actionType) => {
    // Handle different action types
    switch (actionType) {
      case 'analyze': console.log('Analyzing reel...');
        break;
      case 'save': console.log('Saving...');
        break;
      case 'create':
        window.location.href = '/reel-analysis-input';
        break;
      case 'import': console.log('Importing ideas...');
        break;
      case 'export':
        console.log('Exporting...');
        break;
      case 'select': console.log('Template selected');
        break;
      case 'preview': console.log('Previewing...');
        break;
      case 'customize': console.log('Customizing template...');
        break;
      case 'upload': console.log('Uploading media...');
        break;
      case 'record': console.log('Recording video...');
        break;
      case 'continue':
        window.location.href = '/video-export-studio';
        break;
      case 'reset': console.log('Resetting to defaults...');
        break;
      default:
        console.log('Action:', actionType);
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      {/* Desktop: Right-aligned horizontal layout */}
      <div className="hidden sm:flex items-center justify-end space-x-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            iconName={action?.iconName}
            iconPosition="left"
            onClick={() => handleAction(action?.action)}
            className="transition-smooth"
          >
            {action?.label}
          </Button>
        ))}
      </div>
      {/* Mobile: Bottom sheet style */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-dropdown">
        <div className="flex flex-col space-y-2">
          {actions?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              iconName={action?.iconName}
              iconPosition="left"
              onClick={() => handleAction(action?.action)}
              fullWidth
              className="justify-center"
            >
              {action?.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionContextPanel;