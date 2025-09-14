import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExportActions = ({ 
  isExporting = false,
  isCompleted = false,
  downloadUrl = null,
  filename = '',
  onStartExport,
  onCancelExport,
  onDownload,
  onShare,
  onStartNew,
  onRetry
}) => {
  const canShare = navigator.share && 'ontouchstart' in window;

  if (isCompleted) {
    return (
      <div className="space-y-4">
        {/* Download and Share */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="success"
            iconName="Download"
            iconPosition="left"
            onClick={onDownload}
            fullWidth
            className="sm:flex-1"
          >
            Download Video
          </Button>
          
          {canShare && (
            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
              onClick={onShare}
              fullWidth
              className="sm:flex-1"
            >
              Share
            </Button>
          )}
        </div>

        {/* File Info */}
        {filename && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="File" size={16} className="text-muted-foreground" />
              <span className="text-text-secondary">File:</span>
              <span className="font-mono text-text-primary">{filename}</span>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={onStartNew}
            fullWidth
            className="sm:flex-1"
          >
            Create New Video
          </Button>
          
          <Button
            variant="ghost"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={() => window.location.href = '/media-upload-workspace'}
            fullWidth
            className="sm:flex-1"
          >
            Back to Upload
          </Button>
        </div>
      </div>
    );
  }

  if (isExporting) {
    return (
      <div className="space-y-4">
        <Button
          variant="destructive"
          iconName="X"
          iconPosition="left"
          onClick={onCancelExport}
          fullWidth
        >
          Cancel Export
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          Export in progress... Please do not close this tab.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Primary Export Action */}
      <Button
        variant="default"
        iconName="Play"
        iconPosition="left"
        onClick={onStartExport}
        fullWidth
        className="h-12 text-lg font-semibold"
      >
        Start Export
      </Button>

      {/* Secondary Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={() => window.location.href = '/media-upload-workspace'}
          fullWidth
          className="sm:flex-1"
        >
          Back to Upload
        </Button>
        
        <Button
          variant="ghost"
          iconName="Settings"
          iconPosition="left"
          onClick={() => window.location.href = '/settings-configuration'}
          fullWidth
          className="sm:flex-1"
        >
          Settings
        </Button>
      </div>

      {/* Retry Option (if there was a previous error) */}
      {onRetry && (
        <Button
          variant="secondary"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onRetry}
          fullWidth
        >
          Retry Last Export
        </Button>
      )}
    </div>
  );
};

export default ExportActions;