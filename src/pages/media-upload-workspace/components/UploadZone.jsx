import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFilesUpload, isUploading, acceptedFormats = ['JPG', 'PNG', 'MP4', 'MOV'] }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files?.filter(file => {
      const extension = file?.name?.split('.')?.pop()?.toUpperCase();
      return acceptedFormats?.includes(extension);
    });

    if (validFiles?.length !== files?.length) {
      window.showWarningNotification?.('Some files were skipped due to unsupported format');
    }

    if (validFiles?.length > 0) {
      onFilesUpload(validFiles);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const formatFileTypes = acceptedFormats?.join(', ');

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
        } ${isUploading ? 'pointer-events-none opacity-60' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {/* Upload Icon */}
        <div className={`mx-auto w-16 h-16 mb-4 rounded-full flex items-center justify-center transition-colors ${
          isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}>
          <Icon 
            name={isUploading ? "Loader2" : "Upload"} 
            size={32} 
            className={isUploading ? "animate-spin" : ""}
          />
        </div>

        {/* Upload Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">
            {isUploading ? 'Uploading files...' : 'Drop your media files here'}
          </h3>
          <p className="text-sm text-text-secondary">
            {isUploading 
              ? 'Please wait while we process your files'
              : `or click to browse • Supports ${formatFileTypes}`
            }
          </p>
        </div>

        {/* File Size Limit */}
        <div className="mt-4 text-xs text-muted-foreground">
          Maximum file size: 100MB per file
        </div>

        {/* Browse Button */}
        {!isUploading && (
          <div className="mt-6">
            <Button
              variant="outline"
              iconName="FolderOpen"
              iconPosition="left"
              onClick={(e) => {
                e?.stopPropagation();
                openFileDialog();
              }}
            >
              Browse Files
            </Button>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.mp4,.mov"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Drag Overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-lg flex items-center justify-center">
            <div className="text-primary font-semibold">
              <Icon name="Download" size={24} className="mx-auto mb-2" />
              Drop files here
            </div>
          </div>
        )}
      </div>
      {/* Supported Formats */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {acceptedFormats?.map((format) => (
          <span
            key={format}
            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium"
          >
            {format}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UploadZone;