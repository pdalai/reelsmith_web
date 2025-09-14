import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import ActionContextPanel from '../../components/ui/ActionContextPanel';
import StatusNotification, { 
  showSuccessNotification, 
  showErrorNotification, 
  showInfoNotification 
} from '../../components/ui/StatusNotification';
import ReelIdeaCard from './components/ReelIdeaCard';
import EmptyState from './components/EmptyState';
import CollectionHeader from './components/CollectionHeader';
import SearchAndFilter from './components/SearchAndFilter';

const IdeasCollection = () => {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const mockIdeas = [
    {
      id: 1,
      url: "https://www.instagram.com/reel/CyXYZ123abc/",
      thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop",
      styleTags: ["Travel", "Cinematic", "Sunset", "Adventure", "Wanderlust"],
      description: `A breathtaking travel reel showcasing golden hour cinematography with smooth transitions and inspiring adventure footage.\nPerfect for travel content creators looking to capture wanderlust moments.`,
      timestamp: Date.now() - 3600000 // 1 hour ago
    },
    {
      id: 2,
      url: "https://www.instagram.com/reel/CzABC456def/",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=600&fit=crop",
      styleTags: ["Food", "Recipe", "Quick", "Healthy", "Cooking"],
      description: `Fast-paced cooking reel with quick cuts and vibrant food styling.\nGreat for recipe content with engaging visual storytelling.`,
      timestamp: Date.now() - 7200000 // 2 hours ago
    },
    {
      id: 3,
      url: "https://www.instagram.com/reel/CaBCD789ghi/",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
      styleTags: ["Fitness", "Workout", "Motivation", "Gym", "Strength"],
      description: `High-energy fitness reel with motivational music and dynamic workout demonstrations.\nIdeal for fitness influencers and personal trainers.`,
      timestamp: Date.now() - 10800000 // 3 hours ago
    },
    {
      id: 4,
      url: "https://www.instagram.com/reel/CbCDE012jkl/",
      thumbnail: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=600&fit=crop",
      styleTags: ["Fashion", "Style", "Outfit", "Trendy", "OOTD"],
      description: `Stylish fashion reel featuring outfit transitions and trendy styling tips.\nPerfect for fashion bloggers and style enthusiasts.`,
      timestamp: Date.now() - 86400000 // 1 day ago
    },
    {
      id: 5,
      url: "https://www.instagram.com/reel/CcDEF345mno/",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop",
      styleTags: ["Tech", "Review", "Gadget", "Innovation", "Tutorial"],
      description: `Tech review reel with clean product shots and informative content delivery.\nGreat for tech reviewers and gadget enthusiasts.`,
      timestamp: Date.now() - 172800000 // 2 days ago
    }
  ];

  // Load ideas from localStorage on component mount
  useEffect(() => {
    const loadIdeas = () => {
      try {
        const savedIdeas = localStorage.getItem('reelIdeas');
        if (savedIdeas) {
          const parsedIdeas = JSON.parse(savedIdeas);
          setIdeas(parsedIdeas);
        } else {
          // Use mock data for demonstration
          setIdeas(mockIdeas);
          localStorage.setItem('reelIdeas', JSON.stringify(mockIdeas));
        }
      } catch (error) {
        console.error('Error loading ideas:', error);
        setIdeas(mockIdeas);
      } finally {
        setIsLoading(false);
      }
    };

    loadIdeas();
  }, []);

  // Filter and sort ideas
  useEffect(() => {
    let filtered = [...ideas];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(idea =>
        idea?.url?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        idea?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        idea?.styleTags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply tag filter
    if (selectedTags?.length > 0) {
      filtered = filtered?.filter(idea =>
        selectedTags?.every(tag => idea?.styleTags?.includes(tag))
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a?.timestamp - b?.timestamp;
        case 'alphabetical':
          return a?.url?.localeCompare(b?.url);
        case 'mostTags':
          return b?.styleTags?.length - a?.styleTags?.length;
        case 'newest':
        default:
          return b?.timestamp - a?.timestamp;
      }
    });

    setFilteredIdeas(filtered);
  }, [ideas, searchQuery, selectedTags, sortBy]);

  // Get all available tags
  const availableTags = [...new Set(ideas.flatMap(idea => idea.styleTags))]?.sort();

  // Save ideas to localStorage
  const saveIdeas = (newIdeas) => {
    try {
      localStorage.setItem('reelIdeas', JSON.stringify(newIdeas));
      setIdeas(newIdeas);
    } catch (error) {
      console.error('Error saving ideas:', error);
      showErrorNotification('Failed to save ideas');
    }
  };

  // Handle actions
  const handleCopyUrl = async (url) => {
    try {
      await navigator.clipboard?.writeText(url);
      showSuccessNotification('URL copied to clipboard');
    } catch (error) {
      console.error('Error copying URL:', error);
      showErrorNotification('Failed to copy URL');
    }
  };

  const handleOpenReel = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    showInfoNotification('Opening Instagram Reel');
  };

  const handleReanalyze = (idea) => {
    // Navigate to analysis page with pre-filled URL
    navigate('/reel-analysis-input', { 
      state: { 
        prefilledUrl: idea?.url,
        isReanalysis: true,
        originalId: idea?.id 
      } 
    });
  };

  const handleRemake = (idea) => {
    // Store selected idea for template selection
    localStorage.setItem('selectedReelIdea', JSON.stringify(idea));
    navigate('/template-selection');
    showInfoNotification('Proceeding to template selection');
  };

  const handleDeleteIdea = (ideaId) => {
    const updatedIdeas = ideas?.filter(idea => idea?.id !== ideaId);
    saveIdeas(updatedIdeas);
    showSuccessNotification('Idea deleted successfully');
  };

  const handleAnalyzeNew = () => {
    navigate('/reel-analysis-input');
  };

  const handleImportIdeas = () => {
    // Mock import functionality
    showInfoNotification('Import feature coming soon');
  };

  const handleExportCollection = () => {
    try {
      const dataStr = JSON.stringify(ideas, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reel-ideas-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      link?.click();
      URL.revokeObjectURL(url);
      showSuccessNotification('Collection exported successfully');
    } catch (error) {
      console.error('Error exporting collection:', error);
      showErrorNotification('Failed to export collection');
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev?.includes(tag)
        ? prev?.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <WorkflowProgress />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading your ideas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress />
      <main className="pt-4">
        <CollectionHeader
          totalIdeas={ideas?.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onAnalyzeNew={handleAnalyzeNew}
          onImportIdeas={handleImportIdeas}
          onExportCollection={handleExportCollection}
        />

        {ideas?.length > 0 && (
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            availableTags={availableTags}
            onClearFilters={handleClearFilters}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {ideas?.length === 0 ? (
            <EmptyState onAnalyzeFirst={handleAnalyzeNew} />
          ) : filteredIdeas?.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">
                No ideas match your filters
              </h3>
              <p className="text-text-secondary mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={handleClearFilters}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredIdeas?.map((idea) => (
                <ReelIdeaCard
                  key={idea?.id}
                  idea={idea}
                  onCopy={handleCopyUrl}
                  onOpen={handleOpenReel}
                  onReanalyze={handleReanalyze}
                  onRemake={handleRemake}
                  onDelete={handleDeleteIdea}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile spacing for bottom actions */}
        <div className="h-20 sm:hidden" />
      </main>
      <ActionContextPanel className="fixed bottom-4 right-4 sm:relative sm:bottom-auto sm:right-auto" />
      <StatusNotification />
    </div>
  );
};

export default IdeasCollection;