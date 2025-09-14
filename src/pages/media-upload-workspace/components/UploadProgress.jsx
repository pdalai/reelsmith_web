import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadProgress = ({ uploadProgress, currentFile, totalFiles }) => {
  if (!uploadProgress || uploadProgress?.length === 0) {
    return null;
  }

  const overallProgress = uploadProgress?.reduce((acc, file) => acc + file?.progress, 0) / uploadProgress?.length;
  const completedFiles = uploadProgress?.filter(file => file?.status === 'completed')?.length;
  const failedFiles = uploadProgress?.filter(file => file?.status === 'error')?.length;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'uploading':
        return 'Loader2';
      default:
        return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'uploading':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4">
      {/* Overall Progress Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-primary">
          Upload Progress
        </h3>
        <div className="text-sm text-text-secondary">
          {completedFiles} of {totalFiles} completed
        </div>
      </div>
      {/* Overall Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-secondary">Overall Progress</span>
          <span className="text-xs font-medium text-text-primary">
            {Math.round(overallProgress)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
      {/* Individual File Progress */}
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {uploadProgress?.map((file) => (
          <div key={file?.id} className="flex items-center space-x-3">
            {/* Status Icon */}
            <div className={`flex-shrink-0 ${getStatusColor(file?.status)}`}>
              <Icon 
                name={getStatusIcon(file?.status)} 
                size={16} 
                className={file?.status === 'uploading' ? 'animate-spin' : ''}
              />
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-primary truncate">
                {file?.name}
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-muted-foreground">
                  {file?.size ? `${(file?.size / 1024 / 1024)?.toFixed(1)} MB` : ''}
                </div>
                {file?.status === 'uploading' && (
                  <div className="text-xs text-primary">
                    {file?.progress}%
                  </div>
                )}
              </div>
            </div>

            {/* Individual Progress Bar */}
            {file?.status === 'uploading' && (
              <div className="flex-shrink-0 w-16">
                <div className="w-full bg-muted rounded-full h-1">
                  <div
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${file?.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {file?.status === 'error' && file?.error && (
              <div className="flex-shrink-0">
                <div className="text-xs text-error" title={file?.error}>
                  Failed
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Summary */}
      {failedFiles > 0 && (
        <div className="mt-4 p-3 bg-error/5 border border-error/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={14} className="text-error" />
            <div className="text-xs text-error">
              {failedFiles} file{failedFiles > 1 ? 's' : ''} failed to upload
            </div>
          </div>
        </div>
      )}
      {completedFiles === totalFiles && totalFiles > 0 && (
        <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <div className="text-xs text-success">
              All files uploaded successfully!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadProgress;