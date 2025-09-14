import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Create',
      items: [
        { name: 'Reel Analysis', path: '/reel-analysis-input', icon: 'Search' },
        { name: 'Template Selection', path: '/template-selection', icon: 'Layout' }
      ]
    },
    {
      label: 'My Ideas',
      path: '/ideas-collection',
      icon: 'Lightbulb'
    },
    {
      label: 'Studio',
      items: [
        { name: 'Media Upload', path: '/media-upload-workspace', icon: 'Upload' },
        { name: 'Video Export', path: '/video-export-studio', icon: 'Download' }
      ]
    },
    {
      label: 'Settings',
      path: '/settings-configuration',
      icon: 'Settings'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const isActiveGroup = (items) => {
    if (!items) return false;
    return items?.some(item => location?.pathname === item?.path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
        <Icon name="Video" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-text-primary">ReelSmith</span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item, index) => (
              <div key={index} className="relative group">
                {item?.items ? (
                  // Dropdown menu for grouped items
                  (<div className="relative">
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                        isActiveGroup(item?.items)
                          ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }`}
                    >
                      <span>{item?.label}</span>
                      <Icon name="ChevronDown" size={16} />
                    </button>
                    {/* Dropdown content */}
                    <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-smooth z-dropdown">
                      <div className="py-1">
                        {item?.items?.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem?.path}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm transition-smooth ${
                              isActiveRoute(subItem?.path)
                                ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                            }`}
                          >
                            <Icon name={subItem?.icon} size={16} />
                            <span>{subItem?.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>)
                ) : (
                  // Single navigation item
                  (<a
                    href={item?.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                      isActiveRoute(item?.path)
                        ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </a>)
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
            >
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border shadow-elevated">
          <div className="px-4 py-2 space-y-1">
            {navigationItems?.map((item, index) => (
              <div key={index}>
                {item?.items ? (
                  // Grouped items for mobile
                  (<div>
                    <div className="px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      {item?.label}
                    </div>
                    {item?.items?.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem?.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center space-x-3 px-6 py-3 rounded-md text-sm font-medium transition-smooth ${
                          isActiveRoute(subItem?.path)
                            ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                        }`}
                      >
                        <Icon name={subItem?.icon} size={18} />
                        <span>{subItem?.name}</span>
                      </a>
                    ))}
                  </div>)
                ) : (
                  // Single item for mobile
                  (<a
                    href={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                      isActiveRoute(item?.path)
                        ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </a>)
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;