import React, { useState } from 'react';
import './RegisterScreen.css';

interface RegisterScreenProps {
  onBackToLogin: () => void;
  onRegisterSuccess: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBackToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    bloodGroup: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    aadhaarNumber: '',
    aadhaarFile: null as File | null,
  });
  const [otp, setOtp] = useState('');
  const [showOtpDrawer, setShowOtpDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, aadhaarFile: file }));
    }
  };

  const handleSendOtp = async () => {
    // Only validate mobile number since this is called from mobile input
    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      setError('Please enter a valid mobile number');
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
    if (!formData.firstName || !formData.lastName || !formData.bloodGroup || !formData.aadhaarNumber) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.mobileNumber || formData.mobileNumber.length < 10) {
      setError('Please enter a valid mobile number');
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

  const handleVerifyAadhaar = async () => {
    if (!formData.aadhaarNumber || formData.aadhaarNumber.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call for Aadhaar verification
    setTimeout(() => {
      setIsLoading(false);
      setError('');
      // You can add success message or state here
    }, 2000);
  };

  const closeOtpDrawer = () => {
    setShowOtpDrawer(false);
    setOtp('');
    setError('');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="header-text">
              <h1 className="register-title">Create Account</h1>
              <p className="register-subtitle">Join BloodApp to connect with donors and recipients</p>
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
        <div className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile" className="form-label">
              Mobile Number *
            </label>
            <div className="input-wrapper">
              <span className="country-code">+91</span>
              <input
                type="tel"
                id="mobile"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value.replace(/\D/g, ''))}
                placeholder="Enter your mobile number"
                className="form-input"
                maxLength={10}
              />
              <button 
                type="button"
                onClick={handleSendOtp}
                disabled={isLoading || !formData.mobileNumber || formData.mobileNumber.length < 10}
                className="verify-mobile-btn"
              >
                {isLoading ? 'Sending...' : 'Verify'}
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bloodGroup" className="form-label">
                Blood Group *
              </label>
              <select
                id="bloodGroup"
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                className="form-input"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="form-select"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your address"
              className="form-input"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Enter city"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="Enter state"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pincode" className="form-label">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, ''))}
              placeholder="Enter pincode"
              className="form-input"
              maxLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="aadhaarNumber" className="form-label">
              Aadhaar Number *
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={(e) => handleInputChange('aadhaarNumber', e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 12-digit Aadhaar number"
                className="form-input"
                maxLength={12}
              />
              <button 
                type="button"
                onClick={handleVerifyAadhaar}
                disabled={isLoading || !formData.aadhaarNumber || formData.aadhaarNumber.length !== 12}
                className="verify-mobile-btn"
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="aadhaarFile" className="form-label">
              Upload Aadhaar Card (Optional)
            </label>
            <div className="file-upload">
              <input
                type="file"
                id="aadhaarFile"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="aadhaarFile" className="file-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>{formData.aadhaarFile ? formData.aadhaarFile.name : 'Choose file or drag here'}</span>
              </label>
            </div>
            <p className="file-hint">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
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
               'Submit Registration'
             )}
           </button>
         </div>

        {/* Footer */}
        <div className="register-footer">
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
              <h3>Verify Mobile Number</h3>
              <button onClick={closeOtpDrawer} className="close-button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="otp-drawer-content">
              <div className="otp-info">
                <p>We've sent a 6-digit code to</p>
                <strong>+91 {formData.mobileNumber}</strong>
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
                  'Verify & Create Account'
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

export default RegisterScreen; 