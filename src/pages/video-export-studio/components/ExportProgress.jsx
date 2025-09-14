import React from 'react';
import Icon from '../../../components/AppIcon';

const ExportProgress = ({ 
  progress = 0, 
  currentStep = '', 
  isExporting = false, 
  isCompleted = false,
  estimatedTime = '',
  onCancel 
}) => {
  const getProgressColor = () => {
    if (isCompleted) return 'bg-success';
    if (isExporting) return 'bg-primary';
    return 'bg-muted';
  };

  const getProgressIcon = () => {
    if (isCompleted) return 'CheckCircle';
    if (isExporting) return 'Loader';
    return 'Play';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Export Progress</h3>
        {isExporting && (
          <button
            onClick={onCancel}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-error hover:bg-error/10 rounded-md transition-smooth"
          >
            <Icon name="X" size={16} />
            <span>Cancel</span>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getProgressIcon()} 
              size={20} 
              className={`${isExporting ? 'animate-spin' : ''} ${
                isCompleted ? 'text-success' : isExporting ? 'text-primary' : 'text-muted-foreground'
              }`}
            />
            <span className="text-sm font-medium text-text-primary">
              {isCompleted ? 'Export Complete' : isExporting ? 'Exporting...' : 'Ready to Export'}
            </span>
          </div>
          <span className="text-sm font-medium text-text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      {currentStep && (
        <div className="mb-4">
          <div className="text-sm text-muted-foreground mb-1">Current Step:</div>
          <div className="text-sm font-medium text-text-primary">{currentStep}</div>
        </div>
      )}

      {/* Estimated Time */}
      {estimatedTime && !isCompleted && (
        <div className="text-sm text-muted-foreground">
          Estimated time remaining: {estimatedTime}
        </div>
      )}

      {/* Completion Message */}
      {isCompleted && (
        <div className="flex items-center space-x-2 text-success">
          <Icon name="CheckCircle" size={16} />
          <span className="text-sm font-medium">Video exported successfully!</span>
        </div>
      )}
    </div>
  );
};

export default ExportProgress;