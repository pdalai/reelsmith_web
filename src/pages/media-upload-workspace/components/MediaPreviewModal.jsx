import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MediaPreviewModal = ({ file, isOpen, onClose }) => {
  if (!isOpen || !file) return null;

  const isVideo = file?.type?.startsWith('video/') || ['mp4', 'mov']?.includes(file?.name?.split('.')?.pop()?.toLowerCase());
  const isImage = file?.type?.startsWith('image/') || ['jpg', 'jpeg', 'png']?.includes(file?.name?.split('.')?.pop()?.toLowerCase());

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDuration = (duration) => {
    if (!duration) return 'Unknown';
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-critical flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-surface rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon 
              name={isVideo ? 'Video' : 'Image'} 
              size={20} 
              className="text-primary" 
            />
            <div>
              <h3 className="text-lg font-semibold text-text-primary truncate">
                {file?.name}
              </h3>
              <p className="text-sm text-text-secondary">
                {formatFileSize(file?.size)} • {file?.type || 'Unknown type'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          >
            <span className="sr-only">Close preview</span>
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Media Preview */}
            <div className="flex-1">
              <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                {isVideo ? (
                  <video
                    controls
                    className="max-w-full max-h-full"
                    src={file?.url || URL.createObjectURL(file)}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : isImage ? (
                  <img
                    src={file?.url || URL.createObjectURL(file)}
                    alt={file?.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center text-white">
                    <Icon name="FileQuestion" size={48} className="mx-auto mb-2" />
                    <p>Preview not available</p>
                  </div>
                )}
              </div>
            </div>

            {/* File Details */}
            <div className="lg:w-80">
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-text-primary mb-3">
                  File Details
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Name:</span>
                    <span className="text-xs text-text-primary font-medium truncate ml-2">
                      {file?.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Size:</span>
                    <span className="text-xs text-text-primary font-medium">
                      {formatFileSize(file?.size)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Type:</span>
                    <span className="text-xs text-text-primary font-medium">
                      {file?.type || 'Unknown'}
                    </span>
                  </div>
                  
                  {file?.duration && (
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Duration:</span>
                      <span className="text-xs text-text-primary font-medium">
                        {formatDuration(file?.duration)}
                      </span>
                    </div>
                  )}
                  
                  {file?.lastModified && (
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Modified:</span>
                      <span className="text-xs text-text-primary font-medium">
                        {new Date(file.lastModified)?.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Template Processing Info */}
                <div className="mt-4 pt-4 border-t border-border">
                  <h5 className="text-xs font-medium text-text-primary mb-2">
                    Processing Notes
                  </h5>
                  <div className="text-xs text-text-secondary space-y-1">
                    {isVideo ? (
                      <>
                        <p>• Will be trimmed to 3 seconds</p>
                        <p>• Scaled and cropped to vertical format</p>
                        <p>• Audio will be preserved</p>
                      </>
                    ) : (
                      <>
                        <p>• Ken Burns effect will be applied</p>
                        <p>• 2-second duration per image</p>
                        <p>• Optimized for vertical format</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={() => {
              const link = document.createElement('a');
              link.href = file?.url || URL.createObjectURL(file);
              link.download = file?.name;
              link?.click();
            }}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MediaPreviewModal;