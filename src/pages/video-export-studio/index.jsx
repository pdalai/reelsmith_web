import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import StatusNotification from '../../components/ui/StatusNotification';
import ExportProgress from './components/ExportProgress';
import ExportSettings from './components/ExportSettings';
import ExportLogs from './components/ExportLogs';
import ExportActions from './components/ExportActions';
import ProcessingSteps from './components/ProcessingSteps';
import Icon from '../../components/AppIcon';

const VideoExportStudio = () => {
  const [exportState, setExportState] = useState({
    isExporting: false,
    isCompleted: false,
    progress: 0,
    currentStep: '',
    completedSteps: [],
    estimatedTime: '',
    downloadUrl: null,
    filename: ''
  });

  const [logs, setLogs] = useState([]);
  const [isLogsCollapsed, setIsLogsCollapsed] = useState(false);
  const [exportSettings, setExportSettings] = useState({
    template: 'Travel_KenBurns',
    mediaCount: 5,
    outputFormat: '1080x1920 MP4',
    codec: 'H.264',
    frameRate: '30fps',
    estimatedSize: '18-25 MB',
    watermark: 'ReelSmith',
    backgroundMusic: true
  });

  // Mock export process simulation
  const simulateExport = async () => {
    const steps = [
      { id: 'initialization', name: 'Initializing ffmpeg.wasm...', duration: 2000 },
      { id: 'media_processing', name: 'Processing media files...', duration: 3000 },
      { id: 'ken_burns', name: 'Applying Ken Burns effects...', duration: 4000 },
      { id: 'video_trimming', name: 'Trimming and scaling videos...', duration: 3500 },
      { id: 'transitions', name: 'Adding crossfade transitions...', duration: 2500 },
      { id: 'watermark', name: 'Adding watermark overlay...', duration: 2000 },
      { id: 'audio_processing', name: 'Processing background audio...', duration: 3000 },
      { id: 'final_encoding', name: 'Final video encoding...', duration: 5000 }
    ];

    let totalProgress = 0;
    const stepProgress = 100 / steps?.length;

    for (let i = 0; i < steps?.length; i++) {
      const step = steps?.[i];
      
      setExportState(prev => ({
        ...prev,
        currentStep: step?.id,
        estimatedTime: `${Math.ceil((steps?.length - i) * 2.5)} minutes`
      }));

      addLog('info', step?.name);

      // Simulate step progress
      const stepDuration = step?.duration;
      const progressIncrement = stepProgress / (stepDuration / 100);

      for (let progress = 0; progress < stepProgress; progress += progressIncrement) {
        if (!exportState?.isExporting) return; // Check if cancelled
        
        totalProgress = Math.min(100, (i * stepProgress) + progress);
        setExportState(prev => ({
          ...prev,
          progress: totalProgress
        }));

        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Complete step
      setExportState(prev => ({
        ...prev,
        completedSteps: [...prev?.completedSteps, step?.id],
        progress: Math.min(100, (i + 1) * stepProgress)
      }));

      addLog('success', `${step?.name} completed`);
    }

    // Export completed
    const filename = `reel_${Date.now()}.mp4`;
    setExportState(prev => ({
      ...prev,
      isExporting: false,
      isCompleted: true,
      progress: 100,
      currentStep: '',
      filename,
      downloadUrl: URL.createObjectURL(new Blob(['mock video data'], { type: 'video/mp4' }))
    }));

    addLog('success', 'Video export completed successfully!');
    
    // Show success notification
    if (window.showNotification) {
      window.showNotification('success', 'Video exported successfully!');
    }
  };

  const addLog = (type, message) => {
    setLogs(prev => [...prev, {
      type,
      message,
      timestamp: Date.now()
    }]);
  };

  const handleStartExport = async () => {
    setExportState(prev => ({
      ...prev,
      isExporting: true,
      isCompleted: false,
      progress: 0,
      currentStep: 'initialization',
      completedSteps: [],
      estimatedTime: '20 minutes'
    }));

    setLogs([]);
    addLog('info', 'Starting video export process...');
    
    try {
      await simulateExport();
    } catch (error) {
      addLog('error', `Export failed: ${error?.message}`);
      setExportState(prev => ({
        ...prev,
        isExporting: false,
        isCompleted: false
      }));
      
      if (window.showNotification) {
        window.showNotification('error', 'Export failed. Please try again.');
      }
    }
  };

  const handleCancelExport = () => {
    setExportState(prev => ({
      ...prev,
      isExporting: false,
      currentStep: '',
      estimatedTime: ''
    }));
    
    addLog('warning', 'Export cancelled by user');
    
    if (window.showNotification) {
      window.showNotification('warning', 'Export cancelled');
    }
  };

  const handleDownload = () => {
    if (exportState?.downloadUrl && exportState?.filename) {
      const link = document.createElement('a');
      link.href = exportState?.downloadUrl;
      link.download = exportState?.filename;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      
      addLog('info', `Downloaded: ${exportState?.filename}`);
    }
  };

  const handleShare = async () => {
    if (navigator.share && exportState?.downloadUrl) {
      try {
        const response = await fetch(exportState?.downloadUrl);
        const blob = await response?.blob();
        const file = new File([blob], exportState.filename, { type: 'video/mp4' });
        
        await navigator.share({
          title: 'My ReelSmith Video',
          text: 'Check out this video I created with ReelSmith!',
          files: [file]
        });
        
        addLog('info', 'Video shared successfully');
      } catch (error) {
        addLog('error', `Share failed: ${error?.message}`);
      }
    }
  };

  const handleStartNew = () => {
    setExportState({
      isExporting: false,
      isCompleted: false,
      progress: 0,
      currentStep: '',
      completedSteps: [],
      estimatedTime: '',
      downloadUrl: null,
      filename: ''
    });
    setLogs([]);
    window.location.href = '/reel-analysis-input';
  };

  const handleRetry = () => {
    setExportState(prev => ({
      ...prev,
      isExporting: false,
      isCompleted: false,
      progress: 0,
      currentStep: '',
      completedSteps: []
    }));
    setLogs([]);
  };

  // Load mock settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('reelsmith_export_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setExportSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to load export settings:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <StatusNotification />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Download" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Video Export Studio</h1>
                <p className="text-text-secondary">
                  Export your video with professional quality settings
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Progress and Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Export Progress */}
              <ExportProgress
                progress={exportState?.progress}
                currentStep={exportState?.currentStep}
                isExporting={exportState?.isExporting}
                isCompleted={exportState?.isCompleted}
                estimatedTime={exportState?.estimatedTime}
                onCancel={handleCancelExport}
              />

              {/* Processing Steps */}
              <ProcessingSteps
                currentStep={exportState?.currentStep}
                completedSteps={exportState?.completedSteps}
              />

              {/* Export Logs */}
              <ExportLogs
                logs={logs}
                isCollapsed={isLogsCollapsed}
                onToggleCollapse={() => setIsLogsCollapsed(!isLogsCollapsed)}
              />
            </div>

            {/* Right Column - Settings and Actions */}
            <div className="space-y-6">
              {/* Export Settings */}
              <ExportSettings
                template={exportSettings?.template}
                mediaCount={exportSettings?.mediaCount}
                outputFormat={exportSettings?.outputFormat}
                codec={exportSettings?.codec}
                frameRate={exportSettings?.frameRate}
                estimatedSize={exportSettings?.estimatedSize}
                watermark={exportSettings?.watermark}
                backgroundMusic={exportSettings?.backgroundMusic}
              />

              {/* Export Actions */}
              <ExportActions
                isExporting={exportState?.isExporting}
                isCompleted={exportState?.isCompleted}
                downloadUrl={exportState?.downloadUrl}
                filename={exportState?.filename}
                onStartExport={handleStartExport}
                onCancelExport={handleCancelExport}
                onDownload={handleDownload}
                onShare={handleShare}
                onStartNew={handleStartNew}
                onRetry={handleRetry}
              />
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Legal Notice</p>
                  <p>
                    By using ReelSmith, you agree to comply with Instagram's Terms of Service and respect intellectual property rights. 
                    Only use content you own or have permission to use. ReelSmith processes all media client-side for privacy protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Bottom Padding for Action Panel */}
      <div className="h-32 md:h-0" />
    </div>
  );
};

export default VideoExportStudio;