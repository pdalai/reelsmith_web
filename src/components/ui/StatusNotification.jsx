import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const StatusNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [modalNotification, setModalNotification] = useState(null);

  // Example notification types
  const addNotification = (type, message, duration = 5000) => {
    const id = Date.now();
    const notification = {
      id,
      type, // 'success', 'warning', 'error', 'info'
      message,
      duration
    };

    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev?.filter(notif => notif?.id !== id));
  };

  const showModalNotification = (type, title, message, actions = []) => {
    setModalNotification({
      type,
      title,
      message,
      actions
    });
  };

  const closeModalNotification = () => {
    setModalNotification(null);
  };

  // Example usage - you can call these functions from other components
  useEffect(() => {
    // Expose notification functions globally for easy access
    window.showNotification = addNotification;
    window.showModalNotification = showModalNotification;
    
    return () => {
      delete window.showNotification;
      delete window.showModalNotification;
    };
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20 text-success';
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'error':
        return 'bg-error/10 border-error/20 text-error';
      case 'info':
      default:
        return 'bg-primary/10 border-primary/20 text-primary';
    }
  };

  const getModalStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          iconColor: 'text-success',
          borderColor: 'border-success/20'
        };
      case 'warning':
        return {
          iconColor: 'text-warning',
          borderColor: 'border-warning/20'
        };
      case 'error':
        return {
          iconColor: 'text-error',
          borderColor: 'border-error/20'
        };
      case 'info':
      default:
        return {
          iconColor: 'text-primary',
          borderColor: 'border-primary/20'
        };
    }
  };

  return (
    <>
      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 z-critical space-y-2">
        {notifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`max-w-sm w-full bg-surface border rounded-lg shadow-elevated p-4 animate-slide-in ${getNotificationStyles(notification?.type)}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Icon 
                  name={getNotificationIcon(notification?.type)} 
                  size={20} 
                  className="mt-0.5"
                />
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-text-primary">
                  {notification?.message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeNotification(notification?.id)}
                  iconName="X"
                  iconSize={16}
                  className="text-muted-foreground hover:text-text-primary"
                >
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal Notification */}
      {modalNotification && (
        <div className="fixed inset-0 z-critical flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModalNotification}
          />
          
          {/* Modal */}
          <div className={`relative bg-surface rounded-lg shadow-modal max-w-md w-full border ${getModalStyles(modalNotification?.type)?.borderColor}`}>
            <div className="p-6">
              <div className="flex items-start">
                <div className={`flex-shrink-0 ${getModalStyles(modalNotification?.type)?.iconColor}`}>
                  <Icon 
                    name={getNotificationIcon(modalNotification?.type)} 
                    size={24}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {modalNotification?.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {modalNotification?.message}
                  </p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={closeModalNotification}
                >
                  Close
                </Button>
                {modalNotification?.actions?.map((action, index) => (
                  <Button
                    key={index}
                    variant={action?.variant || 'default'}
                    onClick={() => {
                      action?.onClick?.();
                      closeModalNotification();
                    }}
                  >
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Example usage functions that can be called from anywhere in the app
export const showSuccessNotification = (message) => {
  if (window.showNotification) {
    window.showNotification('success', message);
  }
};

export const showErrorNotification = (message) => {
  if (window.showNotification) {
    window.showNotification('error', message);
  }
};

export const showWarningNotification = (message) => {
  if (window.showNotification) {
    window.showNotification('warning', message);
  }
};

export const showInfoNotification = (message) => {
  if (window.showNotification) {
    window.showNotification('info', message);
  }
};

export const showProcessingModal = (title, message, actions = []) => {
  if (window.showModalNotification) {
    window.showModalNotification('info', title, message, actions);
  }
};

export const showExportProgressModal = (progress = 0) => {
  if (window.showModalNotification) {
    window.showModalNotification(
      'info',
      'Exporting Video',
      `Processing your video... ${progress}% complete`,
      []
    );
  }
};

export default StatusNotification;