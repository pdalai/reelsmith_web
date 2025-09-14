import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AnalysisResults = ({ analysisData, onSaveAnalysis, onProceedToTemplate, isSaving }) => {
  if (!analysisData) return null;

  const { styleDescription, styleTags, reelUrl, timestamp } = analysisData;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              Analysis Complete
            </h2>
            <p className="text-sm text-text-secondary">
              AI-powered style analysis results
            </p>
          </div>
        </div>

        {/* Style Tags */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            Style Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {styleTags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Style Description */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            Style Description
          </h3>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-text-secondary leading-relaxed">
              {styleDescription}
            </p>
          </div>
        </div>

        {/* Reel URL */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-primary mb-2">
            Source Reel
          </h3>
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
            <Icon name="Link" size={16} className="text-text-secondary flex-shrink-0" />
            <span className="text-sm text-text-secondary truncate">
              {reelUrl}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(reelUrl, '_blank')}
              iconName="ExternalLink"
              iconSize={16}
            >
              <span className="sr-only">Open reel</span>
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onSaveAnalysis}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
            fullWidth
          >
            {isSaving ? 'Saving...' : 'Save to Ideas'}
          </Button>
          <Button
            variant="default"
            onClick={onProceedToTemplate}
            iconName="ArrowRight"
            iconPosition="right"
            fullWidth
          >
            Create Video
          </Button>
        </div>

        {/* Timestamp */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-text-secondary text-center">
            Analyzed on {new Date(timestamp)?.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;