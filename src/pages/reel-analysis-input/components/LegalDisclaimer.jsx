import React from 'react';
import Icon from '../../../components/AppIcon';

const LegalDisclaimer = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="bg-muted/50 rounded-lg border border-border p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Icon name="Info" size={20} className="text-text-secondary mt-0.5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-text-primary mb-2">
              Legal Disclaimer & Privacy Notice
            </h3>
            <div className="text-xs text-text-secondary space-y-2">
              <p>
                <strong>Instagram Terms Compliance:</strong> This tool analyzes publicly available Instagram Reel content for style inspiration only. Users are responsible for ensuring compliance with Instagram's Terms of Service and respecting content creators' intellectual property rights.
              </p>
              <p>
                <strong>Data Privacy:</strong> All analysis is performed client-side using AI processing. No Instagram content is stored on our servers. Reel URLs and analysis results are saved locally in your browser's storage only.
              </p>
              <p>
                <strong>Content Usage:</strong> Generated style insights are for inspiration purposes. Users must create original content and obtain proper permissions for any copyrighted material used in their videos.
              </p>
              <p>
                <strong>AI Processing:</strong> Analysis is powered by Gemini AI and may not be 100% accurate. Results should be used as creative guidance rather than definitive style rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDisclaimer;