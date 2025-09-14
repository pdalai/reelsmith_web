import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const UrlInputSection = ({ onAnalyze, isAnalyzing, analysisError }) => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const validateInstagramUrl = (inputUrl) => {
    const instagramUrlPattern = /^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\/(reel|p)\/[A-Za-z0-9_-]+/;
    return instagramUrlPattern?.test(inputUrl);
  };

  const handleUrlChange = (e) => {
    const inputUrl = e?.target?.value;
    setUrl(inputUrl);
    
    if (inputUrl && !validateInstagramUrl(inputUrl)) {
      setUrlError('Please enter a valid Instagram Reel URL');
    } else {
      setUrlError('');
    }
  };

  const handleAnalyze = () => {
    if (!url?.trim()) {
      setUrlError('Please enter an Instagram Reel URL');
      return;
    }

    if (!validateInstagramUrl(url)) {
      setUrlError('Please enter a valid Instagram Reel URL');
      return;
    }

    onAnalyze(url);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !isAnalyzing && url?.trim() && !urlError) {
      handleAnalyze();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-lg border border-border p-8 shadow-soft">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Analyze Instagram Reel
          </h1>
          <p className="text-text-secondary">
            Paste an Instagram Reel URL to analyze its style and get AI-powered insights
          </p>
        </div>

        <div className="space-y-6">
          <Input
            type="url"
            label="Instagram Reel URL"
            placeholder="Paste Instagram Reel URL here"
            value={url}
            onChange={handleUrlChange}
            onKeyPress={handleKeyPress}
            error={urlError || analysisError}
            disabled={isAnalyzing}
            className="text-center"
          />

          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleAnalyze}
            disabled={isAnalyzing || !url?.trim() || !!urlError}
            loading={isAnalyzing}
            iconName={isAnalyzing ? undefined : "Search"}
            iconPosition="left"
          >
            {isAnalyzing ? 'Analyzing Reel...' : 'Analyze Reel'}
          </Button>

          {isAnalyzing && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-text-secondary">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Processing with Gemini AI...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlInputSection;