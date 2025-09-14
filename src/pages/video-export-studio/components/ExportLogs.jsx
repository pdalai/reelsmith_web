import React, { useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const ExportLogs = ({ logs = [], isCollapsed = false, onToggleCollapse }) => {
  const logsEndRef = useRef(null);

  const scrollToBottom = () => {
    logsEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const getLogIcon = (type) => {
    switch (type) {
      case 'success':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'error':
        return { icon: 'XCircle', color: 'text-error' };
      case 'warning':
        return { icon: 'AlertTriangle', color: 'text-warning' };
      case 'info':
      default:
        return { icon: 'Info', color: 'text-primary' };
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Terminal" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Export Logs</h3>
          <span className="text-sm text-muted-foreground">({logs?.length})</span>
        </div>
        
        {/* Mobile collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="md:hidden flex items-center space-x-1 text-sm text-muted-foreground hover:text-text-primary transition-smooth"
        >
          <span>{isCollapsed ? 'Show' : 'Hide'}</span>
          <Icon 
            name={isCollapsed ? 'ChevronDown' : 'ChevronUp'} 
            size={16} 
          />
        </button>
      </div>
      {/* Logs Content */}
      <div className={`${isCollapsed ? 'hidden md:block' : 'block'}`}>
        <div className="h-64 overflow-y-auto p-4 bg-muted/30 font-mono text-sm">
          {logs?.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Icon name="FileText" size={32} className="mx-auto mb-2 opacity-50" />
                <p>Export logs will appear here</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {logs?.map((log, index) => {
                const logStyle = getLogIcon(log?.type);
                return (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-xs text-muted-foreground mt-0.5 min-w-[60px]">
                      {formatTimestamp(log?.timestamp)}
                    </span>
                    <Icon 
                      name={logStyle?.icon} 
                      size={14} 
                      className={`${logStyle?.color} mt-0.5 flex-shrink-0`}
                    />
                    <span className={`flex-1 ${
                      log?.type === 'error' ? 'text-error' : 
                      log?.type === 'success' ? 'text-success' : 
                      log?.type === 'warning'? 'text-warning' : 'text-text-primary'
                    }`}>
                      {log?.message}
                    </span>
                  </div>
                );
              })}
              <div ref={logsEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportLogs;