import React, { useState } from 'react';
import './LoginScreen.css';

interface LoginScreenProps {
  onLogin: (mobileNumber: string, otp: string) => void;
  onRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onRegister }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

      {/* Main Login Card */}
      <div className="login-card">
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
                'Send OTP'
              )}
            </button>

                         <div className="action-links">
               <button
                 onClick={onRegister}
                 className="link-button"
               >
                 New User? Register Here
               </button>
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
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit OTP"
                className="otp-input"
                maxLength={6}
              />
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
                'Verify OTP'
              )}
            </button>

            <div className="action-links">
              <button
                onClick={handleResendOtp}
                disabled={isLoading}
                className="link-button"
              >
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