import React, { useState } from 'react';
import './HospitalRegisterScreen.css';

interface HospitalRegisterScreenProps {
  onBackToLogin: () => void;
  onRegisterSuccess: () => void;
}

const HospitalRegisterScreen: React.FC<HospitalRegisterScreenProps> = ({ onBackToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalType: '',
    hospitalLocation: '',
    hospitalContact: '',
    hospitalEmail: '',
    emergencyContact: '',
    hospitalAddress: '',
    hospitalCity: '',
    hospitalState: '',
    hospitalPincode: '',
    hospitalRegistrationNumber: '',
    hospitalLicenseNumber: '',
    hospitalTaxId: '',
    hospitalWebsite: ''
  });
  const [otp, setOtp] = useState('');
  const [showOtpDrawer, setShowOtpDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const hospitalTypes = ['General', 'Specialized', 'Community', 'Academic', 'Private', 'Government'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.hospitalContact || formData.hospitalContact.length < 10) {
      setError('Please enter a valid contact number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpDrawer(true);
      setError('');
    }, 2000);
  };

  const handleSubmitForm = async () => {
    // Validate all required fields
    if (!formData.hospitalName || !formData.hospitalType || !formData.hospitalContact || 
        !formData.hospitalRegistrationNumber || !formData.hospitalLicenseNumber) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.hospitalContact || formData.hospitalContact.length < 10) {
      setError('Please enter a valid contact number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpDrawer(true);
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
      onRegisterSuccess();
    }, 2000);
  };

  const handleResendOtp = () => {
    setOtp('');
    setError('');
    handleSendOtp();
  };

  const closeOtpDrawer = () => {
    setShowOtpDrawer(false);
    setOtp('');
    setError('');
  };

  return (
    <div className="hospital-register-container">
      <div className="hospital-register-card">
        {/* Header */}
        <div className="hospital-register-header">
          <button 
            onClick={onBackToLogin}
            className="back-button"
            aria-label="Go back to login"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="header-content-wrapper">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="header-text">
              <h1 className="hospital-register-title">Create Hospital Account</h1>
              <p className="hospital-register-subtitle">Join BloodApp to connect with donors and recipients</p>
            </div>
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

        {/* Registration Form */}
        <div className="hospital-register-form">
          <div className="form-group">
            <label htmlFor="hospitalName" className="form-label">
              Hospital Name *
            </label>
            <input
              type="text"
              id="hospitalName"
              value={formData.hospitalName}
              onChange={(e) => handleInputChange('hospitalName', e.target.value)}
              placeholder="Enter hospital name"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hospitalType" className="form-label">
                Hospital Type *
              </label>
              <select
                id="hospitalType"
                value={formData.hospitalType}
                onChange={(e) => handleInputChange('hospitalType', e.target.value)}
                className="form-input"
              >
                <option value="">Select Hospital Type</option>
                {hospitalTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="hospitalLocation" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="hospitalLocation"
                value={formData.hospitalLocation}
                onChange={(e) => handleInputChange('hospitalLocation', e.target.value)}
                placeholder="Enter location"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="hospitalContact" className="form-label">
              Contact Number *
            </label>
            <div className="input-wrapper">
              <span className="country-code">+91</span>
              <input
                type="tel"
                id="hospitalContact"
                value={formData.hospitalContact}
                onChange={(e) => handleInputChange('hospitalContact', e.target.value.replace(/\D/g, ''))}
                placeholder="Enter contact number"
                className="form-input"
                maxLength={10}
              />
              <button 
                type="button"
                onClick={handleSendOtp}
                disabled={isLoading || !formData.hospitalContact || formData.hospitalContact.length < 10}
                className="verify-mobile-btn"
              >
                {isLoading ? 'Sending...' : 'Verify'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="hospitalEmail" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="hospitalEmail"
              value={formData.hospitalEmail}
              onChange={(e) => handleInputChange('hospitalEmail', e.target.value)}
              placeholder="Enter email address"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="emergencyContact" className="form-label">
              Emergency Contact
            </label>
            <input
              type="tel"
              id="emergencyContact"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value.replace(/\D/g, ''))}
              placeholder="Enter emergency contact"
              className="form-input"
              maxLength={10}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hospitalAddress" className="form-label">
              Hospital Address
            </label>
            <textarea
              id="hospitalAddress"
              value={formData.hospitalAddress}
              onChange={(e) => handleInputChange('hospitalAddress', e.target.value)}
              placeholder="Enter hospital address"
              className="form-input"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hospitalCity" className="form-label">
                City
              </label>
              <input
                type="text"
                id="hospitalCity"
                value={formData.hospitalCity}
                onChange={(e) => handleInputChange('hospitalCity', e.target.value)}
                placeholder="Enter city"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="hospitalState" className="form-label">
                State
              </label>
              <input
                type="text"
                id="hospitalState"
                value={formData.hospitalState}
                onChange={(e) => handleInputChange('hospitalState', e.target.value)}
                placeholder="Enter state"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="hospitalPincode" className="form-label">
              Pincode
            </label>
            <input
              type="text"
              id="hospitalPincode"
              value={formData.hospitalPincode}
              onChange={(e) => handleInputChange('hospitalPincode', e.target.value.replace(/\D/g, ''))}
              placeholder="Enter pincode"
              className="form-input"
              maxLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hospitalRegistrationNumber" className="form-label">
              Registration Number *
            </label>
            <input
              type="text"
              id="hospitalRegistrationNumber"
              value={formData.hospitalRegistrationNumber}
              onChange={(e) => handleInputChange('hospitalRegistrationNumber', e.target.value)}
              placeholder="Enter hospital registration number"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hospitalLicenseNumber" className="form-label">
              License Number *
            </label>
            <input
              type="text"
              id="hospitalLicenseNumber"
              value={formData.hospitalLicenseNumber}
              onChange={(e) => handleInputChange('hospitalLicenseNumber', e.target.value)}
              placeholder="Enter hospital license number"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hospitalTaxId" className="form-label">
              Tax ID
            </label>
            <input
              type="text"
              id="hospitalTaxId"
              value={formData.hospitalTaxId}
              onChange={(e) => handleInputChange('hospitalTaxId', e.target.value)}
              placeholder="Enter tax identification number"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hospitalWebsite" className="form-label">
              Website
            </label>
            <input
              type="url"
              id="hospitalWebsite"
              value={formData.hospitalWebsite}
              onChange={(e) => handleInputChange('hospitalWebsite', e.target.value)}
              placeholder="Enter hospital website"
              className="form-input"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmitForm}
            disabled={isLoading}
            className="primary-button"
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Processing...</span>
              </div>
            ) : (
              'Submit Hospital Registration'
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="hospital-register-footer">
          <p>
            By creating an account, you agree to our{' '}
            <a href="#" className="footer-link">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="footer-link">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* OTP Verification Drawer */}
      {showOtpDrawer && (
        <div className="otp-drawer-overlay" onClick={closeOtpDrawer}>
          <div className="otp-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="otp-drawer-header">
              <h3>Verify Contact Number</h3>
              <button onClick={closeOtpDrawer} className="close-button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="otp-drawer-content">
              <div className="otp-info">
                <p>We've sent a 6-digit code to</p>
                <strong>+91 {formData.hospitalContact}</strong>
              </div>

              <div className="form-group">
                <label htmlFor="otp" className="form-label">
                  Enter OTP *
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP"
                  className="form-input otp-input"
                  maxLength={6}
                  autoFocus
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
                  'Verify & Register Hospital'
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
                <button
                  onClick={closeOtpDrawer}
                  className="link-button"
                >
                  Change Number
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalRegisterScreen; 