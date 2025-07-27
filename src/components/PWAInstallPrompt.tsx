import React, { useState, useEffect } from 'react';
import './PWAInstallPrompt.css';

interface PWAInstallPromptProps {
  onClose: () => void;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        // App is already installed
        setShowInstallPrompt(false);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    checkIfInstalled();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
      onClose();
    }
  };

  const handleManualInstall = () => {
    // Show manual installation instructions
    const instructions = `
📱 Install BloodApp on your device:

🔸 iPhone/iPad:
1. Tap the Share button (square with arrow)
2. Tap "Add to Home Screen"
3. Tap "Add"

🔸 Android:
1. Tap the menu (three dots)
2. Tap "Add to Home screen"
3. Tap "Add"

🔸 Desktop:
1. Click the install icon in the address bar
2. Click "Install"
    `;
    alert(instructions);
    onClose();
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="pwa-install-overlay">
      <div className="pwa-install-prompt">
        <div className="pwa-install-header">
          <div className="pwa-app-icon">
            <img src="/logo.jpeg" alt="BloodApp" />
          </div>
          <div className="pwa-app-info">
            <h3>Install BloodApp</h3>
            <p>Get quick access to blood donation services</p>
          </div>
          <button className="pwa-close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="pwa-install-features">
          <div className="pwa-feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>Works offline</span>
          </div>
          <div className="pwa-feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Fast loading</span>
          </div>
          <div className="pwa-feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Save lives</span>
          </div>
        </div>

        <div className="pwa-install-actions">
          <button className="pwa-install-btn" onClick={handleInstallClick}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Install App
          </button>
          <button className="pwa-manual-btn" onClick={handleManualInstall}>
            Manual Install
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt; 