import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import ActionContextPanel from '../../components/ui/ActionContextPanel';
import StatusNotification from '../../components/ui/StatusNotification';
import TemplateCard from './components/TemplateCard';
import TemplatePreview from './components/TemplatePreview';
import TemplateFilters from './components/TemplateFilters';
import TemplateLoadingState from './components/TemplateLoadingState';
import EmptyTemplateState from './components/EmptyTemplateState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TemplateSelection = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMediaType, setSelectedMediaType] = useState('all');

  // Mock template data
  const mockTemplates = [
    {
      id: 'travel_kenburns',
      name: 'Travel KenBurns',
      description: 'Perfect for travel photos and scenic content with smooth zoom effects and elegant transitions.',
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop',
      previewImages: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop'
      ],
      category: 'travel',
      mediaType: 'image',
      effects: ['Ken Burns Zoom', 'Crossfade Transitions', 'Auto Crop', 'Color Enhancement'],
      useCases: [
        'Travel photography showcases',
        'Landscape and nature content',
        'Instagram story highlights',
        'Tourism and destination marketing'
      ],
      supportedFormats: ['JPG', 'PNG'],
      outputSpecs: {
        resolution: '1080x1920',
        fps: 30
      },
      duration: '2s per image',
      transitions: 'Crossfade (0.5s)',
      isNew: true
    },
    {
      id: 'talking_captions',
      name: 'Talking Captions',
      description: 'Ideal for video content with dynamic text overlays, perfect for tutorials and speaking content.',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
      previewImages: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop'
      ],
      category: 'business',
      mediaType: 'video',
      effects: ['Dynamic Captions', 'Auto Trim', 'Vertical Crop', 'Audio Enhancement'],
      useCases: [
        'Tutorial and educational content',
        'Business presentations',
        'Speaking and interview clips',
        'Social media announcements'
      ],
      supportedFormats: ['MP4', 'MOV'],
      outputSpecs: {
        resolution: '1080x1920',
        fps: 30
      },
      duration: '3s per clip',
      transitions: 'Cut transitions',
      isNew: false
    },
    {
      id: 'creative_slideshow',
      name: 'Creative Slideshow',
      description: 'Modern slideshow template with creative transitions and effects for mixed media content.',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop',
      previewImages: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&fit=crop'
      ],
      category: 'creative',
      mediaType: 'mixed',
      effects: ['Slide Transitions', 'Parallax Effect', 'Color Grading', 'Motion Graphics'],
      useCases: [
        'Portfolio presentations',
        'Brand storytelling',
        'Product showcases',
        'Creative projects'
      ],
      supportedFormats: ['JPG', 'PNG', 'MP4', 'MOV'],
      outputSpecs: {
        resolution: '1080x1920',
        fps: 30
      },
      duration: '2-3s per item',
      transitions: 'Slide & Fade',
      isNew: true
    },
    {
      id: 'social_stories',
      name: 'Social Stories',
      description: 'Optimized for social media stories with trendy effects and mobile-first design.',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop',
      previewImages: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=600&fit=crop'
      ],
      category: 'social',
      mediaType: 'mixed',
      effects: ['Trendy Filters', 'Text Animations', 'Stickers', 'Music Sync'],
      useCases: [
        'Instagram and Facebook stories',
        'TikTok content',
        'Snapchat stories',
        'Social media campaigns'
      ],
      supportedFormats: ['JPG', 'PNG', 'MP4', 'MOV'],
      outputSpecs: {
        resolution: '1080x1920',
        fps: 30
      },
      duration: '1-2s per item',
      transitions: 'Quick cuts',
      isNew: false
    },
    {
      id: 'business_promo',
      name: 'Business Promo',
      description: 'Professional template for business promotions and corporate content with clean aesthetics.',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      previewImages: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop'
      ],
      category: 'business',
      mediaType: 'mixed',
      effects: ['Corporate Branding', 'Clean Transitions', 'Logo Integration', 'Professional Fonts'],
      useCases: [
        'Business promotions',
        'Corporate announcements',
        'Service showcases',
        'Professional branding'
      ],
      supportedFormats: ['JPG', 'PNG', 'MP4', 'MOV'],
      outputSpecs: {
        resolution: '1080x1920',
        fps: 30
      },
      duration: '2-4s per item',
      transitions: 'Professional fades',
      isNew: false
    },
    {
      id: 'artistic_gallery',
      name: 'Artistic Gallery',
      description: 'Showcase your artistic work with elegant gallery-style presentation and creative effects.',
      thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
      previewImages: [
        'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop'
      ],
      category: 'creative',
      mediaType: 'image',
      effects: ['Gallery Frames', 'Artistic Filters', 'Soft Transitions', 'Color Harmony'],
      useCases: [
        'Art portfolio displays',
        'Photography exhibitions',
        'Creative showcases',
        'Artistic presentations'
      ],
      supportedFormats: ['JPG', 'PNG'],
      outputSpecs: {
        resolution: '1080x1920',
        fps: 30
      },
      duration: '3s per image',
      transitions: 'Artistic wipes',
      isNew: true
    }
  ];

  // Load templates
  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setTemplates(mockTemplates);
        setFilteredTemplates(mockTemplates);
      } catch (err) {
        setError('Failed to load templates');
        console.error('Template loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTemplates();
  }, []);

  // Filter templates
  useEffect(() => {
    let filtered = templates;

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(template =>
        template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        template?.effects?.some(effect => effect?.toLowerCase()?.includes(searchQuery?.toLowerCase())) ||
        template?.useCases?.some(useCase => useCase?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(template => template?.category === selectedCategory);
    }

    // Media type filter
    if (selectedMediaType !== 'all') {
      filtered = filtered?.filter(template => template?.mediaType === selectedMediaType);
    }

    setFilteredTemplates(filtered);
  }, [templates, searchQuery, selectedCategory, selectedMediaType]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    
    // Save selected template to localStorage
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
    
    // Show success notification
    if (window.showNotification) {
      window.showNotification('success', `${template?.name} template selected successfully!`);
    }
    
    // Navigate to media upload after a brief delay
    setTimeout(() => {
      window.location.href = '/media-upload-workspace';
    }, 1000);
  };

  const handlePreviewTemplate = (template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMediaType('all');
  };

  const handleRetry = () => {
    window.location?.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <StatusNotification />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-4">
              Choose Your Template
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Select a video creation template that matches your content style and goals. Each template is optimized for vertical video format and includes professional effects.
            </p>
          </div>

          {/* Filters */}
          {!isLoading && templates?.length > 0 && (
            <TemplateFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedMediaType={selectedMediaType}
              onMediaTypeChange={setSelectedMediaType}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
            />
          )}

          {/* Content */}
          {isLoading ? (
            <TemplateLoadingState />
          ) : error || filteredTemplates?.length === 0 ? (
            <EmptyTemplateState
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedMediaType={selectedMediaType}
              onClearFilters={handleClearFilters}
              onRetry={handleRetry}
            />
          ) : (
            <>
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-text-secondary">
                  {filteredTemplates?.length} template{filteredTemplates?.length !== 1 ? 's' : ''} available
                </p>
                
                {/* View Toggle (Future Enhancement) */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">View:</span>
                  <div className="flex border border-border rounded-md">
                    <button className="px-3 py-1 bg-primary text-primary-foreground rounded-l-md">
                      <Icon name="Grid3X3" size={16} />
                    </button>
                    <button className="px-3 py-1 text-text-secondary hover:text-text-primary">
                      <Icon name="List" size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Template Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredTemplates?.map((template) => (
                  <TemplateCard
                    key={template?.id}
                    template={template}
                    onSelect={handleTemplateSelect}
                    isSelected={selectedTemplate?.id === template?.id}
                  />
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-surface border border-border rounded-lg p-6 text-center">
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  Need Help Choosing?
                </h3>
                <p className="text-text-secondary mb-4">
                  Not sure which template fits your content? Preview templates or get recommendations based on your media type.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/reel-analysis-input'}
                    iconName="Search"
                    iconPosition="left"
                  >
                    Analyze Another Reel
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => window.location.href = '/ideas-collection'}
                    iconName="Lightbulb"
                    iconPosition="left"
                  >
                    Browse Ideas
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Action Context Panel */}
          <div className="mt-8">
            <ActionContextPanel />
          </div>
        </div>
      </main>
      {/* Template Preview Modal */}
      <TemplatePreview
        template={previewTemplate}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onSelect={handleTemplateSelect}
      />
    </div>
  );
};

export default TemplateSelection;