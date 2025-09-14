import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MediaClipStrip = ({ mediaFiles, onReorder, onRemove, onPreview }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetIndex(index);
  };

  const handleDragLeave = () => {
    setDropTargetIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e?.preventDefault();
    
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorder(draggedIndex, dropIndex);
    }
    
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDuration = (duration) => {
    if (!duration) return null;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const getFileIcon = (file) => {
    const extension = file?.name?.split('.')?.pop()?.toLowerCase();
    if (['mp4', 'mov']?.includes(extension)) {
      return 'Video';
    }
    return 'Image';
  };

  if (mediaFiles?.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Icon name="FileImage" size={24} className="text-muted-foreground" />
        </div>
        <p className="text-text-secondary">No media files uploaded yet</p>
        <p className="text-sm text-muted-foreground mt-1">
          Upload some files to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Media Files ({mediaFiles?.length})
        </h3>
        <div className="text-sm text-muted-foreground">
          Drag to reorder
        </div>
      </div>
      {/* Desktop: Horizontal Strip */}
      <div className="hidden md:block">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {mediaFiles?.map((file, index) => (
            <div key={file?.id} className="relative">
              {/* Drop Zone Indicator */}
              {dropTargetIndex === index && draggedIndex !== index && (
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-primary rounded-full z-10" />
              )}
              
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex-shrink-0 w-32 bg-card border border-border rounded-lg overflow-hidden cursor-move transition-all ${
                  draggedIndex === index ? 'opacity-50 scale-95' : 'hover:shadow-elevated'
                }`}
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-muted flex items-center justify-center relative group">
                  <Icon 
                    name={getFileIcon(file)} 
                    size={24} 
                    className="text-muted-foreground" 
                  />
                  
                  {/* Preview Button */}
                  <button
                    onClick={() => onPreview(file)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <Icon name="Eye" size={20} className="text-white" />
                  </button>

                  {/* Duration Badge for Videos */}
                  {file?.duration && (
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                      {formatDuration(file?.duration)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="p-2">
                  <div className="text-xs font-medium text-text-primary truncate" title={file?.name}>
                    {file?.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatFileSize(file?.size)}
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(file?.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground hover:bg-error/90 rounded-full"
                  iconName="X"
                  iconSize={12}
                >
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile: Vertical List */}
      <div className="md:hidden space-y-3">
        {mediaFiles?.map((file, index) => (
          <div key={file?.id} className="relative">
            {/* Drop Zone Indicator */}
            {dropTargetIndex === index && draggedIndex !== index && (
              <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-full z-10" />
            )}
            
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center space-x-3 p-3 bg-card border border-border rounded-lg transition-all ${
                draggedIndex === index ? 'opacity-50 scale-95' : 'hover:shadow-elevated'
              }`}
            >
              {/* Drag Handle */}
              <div className="flex-shrink-0 text-muted-foreground">
                <Icon name="GripVertical" size={16} />
              </div>

              {/* Thumbnail */}
              <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-md flex items-center justify-center relative">
                <Icon 
                  name={getFileIcon(file)} 
                  size={16} 
                  className="text-muted-foreground" 
                />
                {file?.duration && (
                  <div className="absolute -bottom-1 -right-1 bg-black/70 text-white text-xs px-1 rounded">
                    {formatDuration(file?.duration)}
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">
                  {file?.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatFileSize(file?.size)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPreview(file)}
                  iconName="Eye"
                  iconSize={16}
                  className="w-8 h-8"
                >
                  <span className="sr-only">Preview</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(file?.id)}
                  iconName="Trash2"
                  iconSize={16}
                  className="w-8 h-8 text-error hover:text-error hover:bg-error/10"
                >
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaClipStrip;