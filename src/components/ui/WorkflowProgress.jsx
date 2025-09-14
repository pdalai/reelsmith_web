import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const WorkflowProgress = () => {
  const location = useLocation();

  const workflowSteps = [
    {
      id: 'analysis',
      name: 'Reel Analysis',
      path: '/reel-analysis-input',
      icon: 'Search',
      description: 'Analyze Instagram Reel'
    },
    {
      id: 'template',
      name: 'Template Selection',
      path: '/template-selection',
      icon: 'Layout',
      description: 'Choose template'
    },
    {
      id: 'upload',
      name: 'Media Upload',
      path: '/media-upload-workspace',
      icon: 'Upload',
      description: 'Upload your media'
    },
    {
      id: 'export',
      name: 'Video Export',
      path: '/video-export-studio',
      icon: 'Download',
      description: 'Export final video'
    }
  ];

  const getCurrentStepIndex = () => {
    const currentStep = workflowSteps?.findIndex(step => step?.path === location?.pathname);
    return currentStep >= 0 ? currentStep : -1;
  };

  const currentStepIndex = getCurrentStepIndex();
  const isWorkflowActive = currentStepIndex >= 0;

  if (!isWorkflowActive) {
    return null;
  }

  const getStepStatus = (index) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Desktop Progress */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between">
              {workflowSteps?.map((step, index) => {
                const status = getStepStatus(index);
                const isClickable = index <= currentStepIndex;

                return (
                  <div key={step?.id} className="flex items-center">
                    {/* Step */}
                    <div className="flex flex-col items-center">
                      <a
                        href={isClickable ? step?.path : '#'}
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-smooth ${
                          status === 'completed'
                            ? 'bg-success border-success text-success-foreground cursor-pointer hover:bg-success/90'
                            : status === 'current' ?'bg-primary border-primary text-primary-foreground cursor-pointer' :'bg-muted border-border text-muted-foreground cursor-not-allowed'
                        } ${isClickable && status !== 'current' ? 'hover:scale-105' : ''}`}
                        onClick={!isClickable ? (e) => e?.preventDefault() : undefined}
                      >
                        {status === 'completed' ? (
                          <Icon name="Check" size={20} />
                        ) : (
                          <Icon name={step?.icon} size={20} />
                        )}
                      </a>
                      <div className="mt-2 text-center">
                        <div className={`text-sm font-medium ${
                          status === 'current' ? 'text-primary' : 
                          status === 'completed' ? 'text-success' : 'text-muted-foreground'
                        }`}>
                          {step?.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {step?.description}
                        </div>
                      </div>
                    </div>
                    {/* Connector */}
                    {index < workflowSteps?.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 ${
                        index < currentStepIndex ? 'bg-success' : 'bg-border'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-text-primary">
                Step {currentStepIndex + 1} of {workflowSteps?.length}
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round(((currentStepIndex + 1) / workflowSteps?.length) * 100)}% Complete
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / workflowSteps?.length) * 100}%` }}
              />
            </div>

            {/* Current step info */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                <Icon name={workflowSteps?.[currentStepIndex]?.icon} size={16} />
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {workflowSteps?.[currentStepIndex]?.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {workflowSteps?.[currentStepIndex]?.description}
                </div>
              </div>
            </div>

            {/* Step navigation */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  if (currentStepIndex > 0) {
                    window.location.href = workflowSteps?.[currentStepIndex - 1]?.path;
                  }
                }}
                disabled={currentStepIndex === 0}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  currentStepIndex === 0
                    ? 'text-muted-foreground cursor-not-allowed'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name="ChevronLeft" size={16} />
                <span>Previous</span>
              </button>

              <button
                onClick={() => {
                  if (currentStepIndex < workflowSteps?.length - 1) {
                    window.location.href = workflowSteps?.[currentStepIndex + 1]?.path;
                  }
                }}
                disabled={currentStepIndex === workflowSteps?.length - 1}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  currentStepIndex === workflowSteps?.length - 1
                    ? 'text-muted-foreground cursor-not-allowed'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <span>Next</span>
                <Icon name="ChevronRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowProgress;