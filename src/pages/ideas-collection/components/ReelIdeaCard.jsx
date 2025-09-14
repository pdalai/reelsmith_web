import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReelIdeaCard = ({ idea, onCopy, onOpen, onReanalyze, onRemake, onDelete }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const truncateUrl = (url, maxLength = 40) => {
    if (url?.length <= maxLength) return url;
    return url?.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-20 h-32 lg:h-20 rounded-lg overflow-hidden bg-muted">
            <Image
              src={idea?.thumbnail}
              alt="Reel thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* URL */}
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Instagram" size={16} className="text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground truncate">
                  {truncateUrl(idea?.url)}
                </span>
              </div>

              {/* Style Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {idea?.styleTags?.slice(0, 4)?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
                {idea?.styleTags?.length > 4 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                    +{idea?.styleTags?.length - 4} more
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                {idea?.description}
              </p>

              {/* Timestamp */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>Analyzed {formatTimestamp(idea?.timestamp)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex lg:flex-col gap-2 lg:gap-1">
              {/* Desktop Actions */}
              <div className="hidden lg:flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Copy"
                  iconPosition="left"
                  onClick={() => onCopy(idea?.url)}
                  className="justify-start text-xs"
                >
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="left"
                  onClick={() => onOpen(idea?.url)}
                  className="justify-start text-xs"
                >
                  Open
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => onReanalyze(idea)}
                  className="justify-start text-xs"
                >
                  Re-analyze
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Video"
                  iconPosition="left"
                  onClick={() => onRemake(idea)}
                  className="justify-start text-xs"
                >
                  Remake
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => onDelete(idea?.id)}
                  className="justify-start text-xs text-destructive hover:text-destructive"
                >
                  Delete
                </Button>
              </div>

              {/* Mobile Actions */}
              <div className="flex lg:hidden gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Copy"
                  onClick={() => onCopy(idea?.url)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ExternalLink"
                  onClick={() => onOpen(idea?.url)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={() => onReanalyze(idea)}
                />
                <Button
                  variant="default"
                  size="sm"
                  iconName="Video"
                  onClick={() => onRemake(idea)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDelete(idea?.id)}
                  className="text-destructive hover:text-destructive"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelIdeaCard;