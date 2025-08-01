import React, { useState, useEffect } from 'react';
import './LoginScreen.css';

interface LoginScreenProps {
  onLogin: (mobileNumber: string, otp: string) => void;
  onRegister: () => void;
  onAdminLogin?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister, onAdminLogin }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSendOtp = async () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpInput(true);
      setError('');
    }, 2000);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(mobileNumber, otp);
    }, 2000);
  };

  const handleResendOtp = () => {
    setOtp('');
    setError('');
    handleSendOtp();
  };

  return (
    <div className="login-container">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
        />
      ))}

      {/* Main Login Card */}
      <div className="login-card">
        {/* Shimmer Effect */}
        <div className="card-shimmer"></div>

        {/* Logo and Header */}
        <div className="login-header">
          <div className="logo-container">
            <div className="logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="logo-pulse"></div>
          </div>
          <h1 className="app-title">BloodApp</h1>
          <p className="app-tagline">Connect. Donate. Save Lives.</p>
          <div className="header-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dot"></div>
            <div className="decoration-line"></div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Mobile Number Input */}
        {!showOtpInput ? (
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="mobile" className="input-label">
                Mobile Number
              </label>
              <div className="input-wrapper">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  id="mobile"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter your mobile number"
                  className="mobile-input"
                  maxLength={10}
                />
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={handleSendOtp}
              disabled={isLoading || !mobileNumber || mobileNumber.length < 10}
              className="primary-button"
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Sending OTP...</span>
                </div>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="button-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send OTP
                </>
              )}
            </button>

            <div className="action-links">
              <button
                onClick={onRegister}
                className="link-button"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="link-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                New User? Register Here
              </button>
              {onAdminLogin && (
                <button
                  onClick={onAdminLogin}
                  className="link-button admin-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="link-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Admin Login
                </button>
              )}
            </div>
          </div>
        ) : (
          /* OTP Input */
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="otp" className="input-label">
                Enter OTP
              </label>
              <p className="otp-info">
                We've sent a 6-digit code to <strong>+91 {mobileNumber}</strong>
              </p>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP"
                  className="otp-input"
                  maxLength={6}
                />
                <div className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isLoading || !otp || otp.length !== 6}
              className="primary-button verify-button"
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="button-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verify OTP
                </>
              )}
            </button>

            <div className="action-links">
              <button
                onClick={handleResendOtp}
                disabled={isLoading}
                className="link-button"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="link-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Resend OTP
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="login-footer">
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="footer-link">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="footer-link">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floating-element element-1"></div>
      <div className="floating-element element-2"></div>
      <div className="floating-element element-3"></div>
    </div>
  );
};

export default LoginScreen; 