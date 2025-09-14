import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import ActionContextPanel from '../../components/ui/ActionContextPanel';
import StatusNotification from '../../components/ui/StatusNotification';
import UploadZone from './components/UploadZone';
import MediaClipStrip from './components/MediaClipStrip';
import TemplateContextPanel from './components/TemplateContextPanel';
import UploadProgress from './components/UploadProgress';
import MediaPreviewModal from './components/MediaPreviewModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MediaUploadWorkspace = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Travel_KenBurns');
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Mock template from localStorage or default
  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }

    // Load existing media files from localStorage
    const savedMediaFiles = localStorage.getItem('uploadedMediaFiles');
    if (savedMediaFiles) {
      try {
        const parsedFiles = JSON.parse(savedMediaFiles);
        setMediaFiles(parsedFiles);
      } catch (error) {
        console.error('Error loading saved media files:', error);
      }
    }
  }, []);

  // Save media files to localStorage
  useEffect(() => {
    if (mediaFiles?.length > 0) {
      localStorage.setItem('uploadedMediaFiles', JSON.stringify(mediaFiles));
    }
  }, [mediaFiles]);

  const outputSpecs = {
    resolution: '1080x1920',
    frameRate: '30fps',
    format: 'MP4',
    quality: 'High (CRF 22)'
  };

  const handleFilesUpload = async (files) => {
    setIsUploading(true);
    
    // Initialize progress tracking
    const progressData = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      progress: 0,
      status: 'uploading'
    }));
    
    setUploadProgress(progressData);

    // Simulate file processing
    for (let i = 0; i < files?.length; i++) {
      const file = files?.[i];
      const fileId = progressData?.[i]?.id;

      try {
        // Validate file
        const maxSize = 100 * 1024 * 1024; // 100MB
        if (file?.size > maxSize) {
          throw new Error('File size exceeds 100MB limit');
        }

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          
          setUploadProgress(prev => prev?.map(item => 
            item?.id === fileId ? { ...item, progress } : item
          ));
        }

        // Create file object with metadata
        const processedFile = {
          id: fileId,
          name: file?.name,
          size: file?.size,
          type: file?.type,
          lastModified: file?.lastModified,
          url: URL.createObjectURL(file),
          duration: file?.type?.startsWith('video/') ? Math.random() * 30 + 10 : null, // Mock duration
          originalFile: file
        };

        // Add to media files
        setMediaFiles(prev => [...prev, processedFile]);

        // Mark as completed
        setUploadProgress(prev => prev?.map(item => 
          item?.id === fileId ? { ...item, status: 'completed', progress: 100 } : item
        ));

      } catch (error) {
        console.error('Upload error:', error);
        
        setUploadProgress(prev => prev?.map(item => 
          item?.id === fileId ? { 
            ...item, 
            status: 'error', 
            error: error?.message 
          } : item
        ));

        window.showErrorNotification?.(`Failed to upload ${file?.name}: ${error?.message}`);
      }
    }

    setIsUploading(false);
    
    // Clear progress after a delay
    setTimeout(() => {
      setUploadProgress([]);
    }, 3000);

    window.showSuccessNotification?.(`Successfully uploaded ${files?.length} file${files?.length > 1 ? 's' : ''}`);
  };

  const handleReorderFiles = (fromIndex, toIndex) => {
    const newFiles = [...mediaFiles];
    const [movedFile] = newFiles?.splice(fromIndex, 1);
    newFiles?.splice(toIndex, 0, movedFile);
    setMediaFiles(newFiles);
    
    window.showInfoNotification?.('Media files reordered');
  };

  const handleRemoveFile = (fileId) => {
    setMediaFiles(prev => {
      const updatedFiles = prev?.filter(file => file?.id !== fileId);
      
      // Clean up object URLs to prevent memory leaks
      const removedFile = prev?.find(file => file?.id === fileId);
      if (removedFile?.url) {
        URL.revokeObjectURL(removedFile?.url);
      }
      
      return updatedFiles;
    });
    
    window.showInfoNotification?.('File removed from workspace');
  };

  const handlePreviewFile = (file) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const handleContinueToExport = () => {
    if (mediaFiles?.length === 0) {
      window.showWarningNotification?.('Please upload at least one media file before continuing');
      return;
    }

    // Save current state and navigate
    localStorage.setItem('uploadedMediaFiles', JSON.stringify(mediaFiles));
    localStorage.setItem('selectedTemplate', selectedTemplate);
    
    window.location.href = '/video-export-studio';
  };

  const handleClearAll = () => {
    if (mediaFiles?.length === 0) return;

    // Clean up object URLs
    mediaFiles?.forEach(file => {
      if (file?.url) {
        URL.revokeObjectURL(file?.url);
      }
    });

    setMediaFiles([]);
    localStorage.removeItem('uploadedMediaFiles');
    
    window.showInfoNotification?.('All media files cleared');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Upload" size={20} className="text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary">
                Media Upload Workspace
              </h1>
            </div>
            <p className="text-text-secondary">
              Upload and organize your media files for video creation. Drag and drop to reorder clips.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Upload Zone */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Upload Media Files
                </h2>
                <UploadZone
                  onFilesUpload={handleFilesUpload}
                  isUploading={isUploading}
                  acceptedFormats={['JPG', 'PNG', 'MP4', 'MOV']}
                />
              </div>

              {/* Upload Progress */}
              {uploadProgress?.length > 0 && (
                <UploadProgress
                  uploadProgress={uploadProgress}
                  currentFile={uploadProgress?.find(f => f?.status === 'uploading')?.name}
                  totalFiles={uploadProgress?.length}
                />
              )}

              {/* Media Clip Strip */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">
                    Media Timeline
                  </h2>
                  {mediaFiles?.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Trash2"
                      iconPosition="left"
                      onClick={handleClearAll}
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                
                <MediaClipStrip
                  mediaFiles={mediaFiles}
                  onReorder={handleReorderFiles}
                  onRemove={handleRemoveFile}
                  onPreview={handlePreviewFile}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  iconPosition="left"
                  onClick={() => window.location.href = '/template-selection'}
                >
                  Back to Templates
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    iconName="Save"
                    iconPosition="left"
                    onClick={() => {
                      localStorage.setItem('uploadedMediaFiles', JSON.stringify(mediaFiles));
                      window.showSuccessNotification?.('Workspace saved');
                    }}
                  >
                    Save Workspace
                  </Button>
                  
                  <Button
                    variant="success"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={handleContinueToExport}
                    disabled={mediaFiles?.length === 0}
                  >
                    Continue to Export
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Template Context Panel */}
                <TemplateContextPanel
                  selectedTemplate={selectedTemplate}
                  outputSpecs={outputSpecs}
                />

                {/* Quick Stats */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-text-primary mb-3">
                    Workspace Stats
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Files:</span>
                      <span className="font-medium text-text-primary">{mediaFiles?.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Images:</span>
                      <span className="font-medium text-text-primary">
                        {mediaFiles?.filter(f => f?.type?.startsWith('image/'))?.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Videos:</span>
                      <span className="font-medium text-text-primary">
                        {mediaFiles?.filter(f => f?.type?.startsWith('video/'))?.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Size:</span>
                      <span className="font-medium text-text-primary">
                        {(mediaFiles?.reduce((acc, f) => acc + f?.size, 0) / 1024 / 1024)?.toFixed(1)} MB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Action Panel */}
        <div className="lg:hidden">
          <ActionContextPanel className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4" />
        </div>
      </main>
      {/* Media Preview Modal */}
      <MediaPreviewModal
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setPreviewFile(null);
        }}
      />
      <StatusNotification />
    </div>
  );
};

export default MediaUploadWorkspace;