import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ErrorDisplay = ({ error, onRetry, onClearError }) => {
  if (!error) return null;

  const getErrorIcon = (errorType) => {
    switch (errorType) {
      case 'network':
        return 'Wifi';
      case 'api':
        return 'AlertTriangle';
      case 'validation':
        return 'XCircle';
      default:
        return 'AlertCircle';
    }
  };

  const getErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    
    switch (error?.type) {
      case 'network':
        return 'Network connection failed. Please check your internet connection and try again.';
      case 'api':
        return 'Unable to analyze the reel. The Gemini AI service may be temporarily unavailable.';
      case 'validation':
        return 'Invalid Instagram Reel URL. Please ensure the URL is correct and the reel is publicly accessible.';
      case 'rate_limit':
        return 'Too many requests. Please wait a moment before trying again.';
      default:
        return error?.message || 'An unexpected error occurred. Please try again.';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-error/5 border border-error/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon 
              name={getErrorIcon(error?.type)} 
              size={24} 
              className="text-error mt-0.5" 
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-error mb-2">
              Analysis Failed
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              {getErrorMessage(error)}
            </p>
            
            {/* Error Details (for debugging) */}
            {error?.details && (
              <details className="mb-4">
                <summary className="text-xs text-text-secondary cursor-pointer hover:text-text-primary">
                  Technical Details
                </summary>
                <pre className="text-xs text-text-secondary mt-2 p-2 bg-muted rounded overflow-x-auto">
                  {JSON.stringify(error?.details, null, 2)}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onRetry}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Try Again
              </Button>
              <Button
                variant="ghost"
                onClick={onClearError}
                iconName="X"
                iconPosition="left"
              >
                Clear Error
              </Button>
            </div>
          </div>
        </div>

        {/* Common Solutions */}
        <div className="mt-6 pt-4 border-t border-error/10">
          <h4 className="text-sm font-medium text-text-primary mb-2">
            Common Solutions:
          </h4>
          <ul className="text-xs text-text-secondary space-y-1">
            <li>• Ensure the Instagram Reel URL is correct and publicly accessible</li>
            <li>• Check your internet connection</li>
            <li>• Try copying the URL directly from Instagram</li>
            <li>• Wait a few minutes if you've made multiple requests</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;