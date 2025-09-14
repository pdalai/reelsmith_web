import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import ActionContextPanel from '../../components/ui/ActionContextPanel';
import StatusNotification, { showSuccessNotification, showErrorNotification } from '../../components/ui/StatusNotification';
import UrlInputSection from './components/UrlInputSection';
import AnalysisResults from './components/AnalysisResults';
import LegalDisclaimer from './components/LegalDisclaimer';
import ErrorDisplay from './components/ErrorDisplay';
import { analyzeInstagramReel } from '../../utils/geminiClient';

const ReelAnalysisInput = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleAnalyze = async (url) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisData(null);

    try {
      const result = await analyzeInstagramReel(url);
      setAnalysisData(result);
      showSuccessNotification('Reel analysis completed successfully!');
    } catch (error) {
      console.error('Analysis failed:', error);
      
      // Provide specific error messages based on error type
      let errorMessage = 'Failed to analyze the Instagram Reel. Please try again.';
      
      if (error?.message?.includes('VITE_GEMINI_API_KEY')) {
        errorMessage = 'Gemini API key is not configured. Please check your environment settings.';
      } else if (error?.message?.includes('quota')) {
        errorMessage = 'API quota exceeded. Please try again later.';
      } else if (error?.message?.includes('blocked')) {
        errorMessage = 'Content analysis was blocked by safety filters. Please try a different URL.';
      }
      
      setAnalysisError({
        type: 'api',
        message: errorMessage,
        details: error
      });
      showErrorNotification(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveAnalysis = async () => {
    if (!analysisData) return;

    setIsSaving(true);
    
    try {
      // Get existing ideas from localStorage
      const existingIdeas = JSON.parse(localStorage.getItem('reelIdeas') || '[]');
      
      // Create new idea object
      const newIdea = {
        id: `reel_${Date.now()}`,
        url: analysisData?.reelUrl,
        styleDescription: analysisData?.styleDescription,
        styleTags: analysisData?.styleTags,
        timestamp: analysisData?.timestamp,
        createdAt: new Date()?.toISOString()
      };
      
      // Add to existing ideas
      const updatedIdeas = [newIdea, ...existingIdeas];
      
      // Save to localStorage
      localStorage.setItem('reelIdeas', JSON.stringify(updatedIdeas));
      
      showSuccessNotification('Analysis saved to your ideas collection!');
      
      // Navigate to ideas collection after a short delay
      setTimeout(() => {
        navigate('/ideas-collection');
      }, 1500);
      
    } catch (error) {
      console.error('Failed to save analysis:', error);
      showErrorNotification('Failed to save analysis. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleProceedToTemplate = () => {
    if (analysisData) {
      // Store current analysis in sessionStorage for template selection
      sessionStorage.setItem('currentAnalysis', JSON.stringify(analysisData));
      navigate('/template-selection');
    }
  };

  const handleRetryAnalysis = () => {
    setAnalysisError(null);
    setAnalysisData(null);
  };

  const handleClearError = () => {
    setAnalysisError(null);
  };

  // Clear any previous analysis data on component mount
  useEffect(() => {
    sessionStorage.removeItem('currentAnalysis');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Content */}
          <div className="flex flex-col items-center">
            <UrlInputSection
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              analysisError={analysisError?.message}
            />

            {/* Error Display */}
            <ErrorDisplay
              error={analysisError}
              onRetry={handleRetryAnalysis}
              onClearError={handleClearError}
            />

            {/* Analysis Results */}
            <AnalysisResults
              analysisData={analysisData}
              onSaveAnalysis={handleSaveAnalysis}
              onProceedToTemplate={handleProceedToTemplate}
              isSaving={isSaving}
            />

            {/* Legal Disclaimer */}
            <LegalDisclaimer />
          </div>
        </div>

        {/* Mobile Action Panel */}
        <div className="pb-20 sm:pb-0">
          <ActionContextPanel className="fixed bottom-0 left-0 right-0 sm:hidden" />
        </div>
      </main>

      <StatusNotification />
    </div>
  );
};

export default ReelAnalysisInput;