import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingSteps = ({ currentStep = '', completedSteps = [] }) => {
  const steps = [
    {
      id: 'initialization',
      name: 'Initialization',
      description: 'Loading ffmpeg.wasm and preparing workspace',
      icon: 'Loader'
    },
    {
      id: 'media_processing',
      name: 'Media Processing',
      description: 'Processing uploaded images and videos',
      icon: 'FileImage'
    },
    {
      id: 'ken_burns',
      name: 'Ken Burns Effect',
      description: 'Applying zoom effects to images (2s duration, 1.1x zoom)',
      icon: 'ZoomIn'
    },
    {
      id: 'video_trimming',
      name: 'Video Trimming',
      description: 'Trimming videos to 3-second clips and scaling to vertical',
      icon: 'Scissors'
    },
    {
      id: 'transitions',
      name: 'Crossfade Transitions',
      description: 'Adding 0.5s crossfade transitions between clips',
      icon: 'Shuffle'
    },
    {
      id: 'watermark',
      name: 'Watermark Overlay',
      description: 'Adding watermark text overlay',
      icon: 'Type'
    },
    {
      id: 'audio_processing',
      name: 'Audio Processing',
      description: 'Processing background music and audio encoding',
      icon: 'Volume2'
    },
    {
      id: 'final_encoding',
      name: 'Final Encoding',
      description: 'Encoding final video (H.264, CRF 22, yuv420p)',
      icon: 'Video'
    }
  ];

  const getStepStatus = (stepId) => {
    if (completedSteps?.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'current') return step?.icon;
    return step?.icon;
  };

  const getStepStyles = (status) => {
    switch (status) {
      case 'completed':
        return {
          container: 'bg-success/10 border-success/20',
          icon: 'text-success bg-success/20',
          title: 'text-success',
          description: 'text-success/70'
        };
      case 'current':
        return {
          container: 'bg-primary/10 border-primary/20',
          icon: 'text-primary bg-primary/20 animate-pulse',
          title: 'text-primary',
          description: 'text-primary/70'
        };
      case 'pending':
      default:
        return {
          container: 'bg-muted/30 border-border',
          icon: 'text-muted-foreground bg-muted',
          title: 'text-muted-foreground',
          description: 'text-muted-foreground/70'
        };
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="List" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Processing Steps</h3>
      </div>
      <div className="space-y-3">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const styles = getStepStyles(status);
          const stepIcon = getStepIcon(step, status);

          return (
            <div
              key={step?.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border transition-smooth ${styles?.container}`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${styles?.icon}`}>
                <Icon 
                  name={stepIcon} 
                  size={16} 
                  className={status === 'current' ? 'animate-spin' : ''}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${styles?.title}`}>
                  {step?.name}
                </div>
                <div className={`text-xs mt-1 ${styles?.description}`}>
                  {step?.description}
                </div>
              </div>
              <div className="flex-shrink-0">
                {status === 'completed' && (
                  <Icon name="Check" size={16} className="text-success" />
                )}
                {status === 'current' && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Progress Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Steps completed: {completedSteps?.length} of {steps?.length}
          </span>
          <span className="font-medium text-text-primary">
            {Math.round((completedSteps?.length / steps?.length) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingSteps;