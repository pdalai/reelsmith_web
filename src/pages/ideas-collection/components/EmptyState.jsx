import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onAnalyzeFirst }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Lightbulb" size={48} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        No Ideas Yet
      </h3>
      
      <p className="text-text-secondary text-center max-w-md mb-8">
        Start building your collection by analyzing Instagram Reels. Each analysis will be saved here for easy access and video creation.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          iconName="Search"
          iconPosition="left"
          onClick={onAnalyzeFirst}
        >
          Analyze Your First Reel
        </Button>
        
        <Button
          variant="outline"
          iconName="HelpCircle"
          iconPosition="left"
          onClick={() => {
            // Show help or tutorial
            console.log('Show help');
          }}
        >
          How It Works
        </Button>
      </div>
      
      <div className="mt-12 max-w-2xl">
        <h4 className="text-sm font-medium text-text-primary mb-4 text-center">
          What you can do with saved ideas:
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Copy" size={16} className="text-primary" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-text-primary">Quick Access</h5>
              <p className="text-xs text-text-secondary">Copy URLs and open original Reels instantly</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="RefreshCw" size={16} className="text-secondary" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-text-primary">Re-analyze</h5>
              <p className="text-xs text-text-secondary">Update analysis with fresh AI insights</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Video" size={16} className="text-success" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-text-primary">Create Videos</h5>
              <p className="text-xs text-text-secondary">Turn ideas into custom vertical videos</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Archive" size={16} className="text-accent" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-text-primary">Organize</h5>
              <p className="text-xs text-text-secondary">Manage your inspiration collection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;