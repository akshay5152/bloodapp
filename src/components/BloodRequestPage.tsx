import React, { useState } from 'react';
import './BloodRequestPage.css';

interface BloodRequestPageProps {
  onBackToDashboard: () => void;
  onRequestSuccess: () => void;
}

const BloodRequestPage: React.FC<BloodRequestPageProps> = ({ onBackToDashboard, onRequestSuccess }) => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    severity: '',
    hospitalLocation: '',
    bloodbankLocation: '',
    patientName: '',
    gender: '',
    date: '',
    time: '',
    patientAge: '',
    bloodUnits: '',
    contactNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = async () => {
    // Validate all required fields
    if (!formData.bloodGroup || !formData.severity || !formData.hospitalLocation || 
        !formData.patientName || !formData.gender || !formData.date || 
        !formData.patientAge || !formData.bloodUnits || !formData.contactNumber) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onRequestSuccess();
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
          <button 
            onClick={onBackToDashboard}
            className="back-button"
            aria-label="Go back to dashboard"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="header-content-wrapper">
            <div className="header-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="header-text">
              <h1 className="register-title">Blood Request</h1>
              <p className="register-subtitle">Submit your blood request to connect with donors</p>
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

        {/* Blood Request Form */}
        <div className="register-form">
          <div className="form-group">
            <label className="form-label">
              Blood Group Required
            </label>
            <div className="blood-group-grid">
              {bloodGroups.map(group => (
                <button
                  key={group}
                  type="button"
                  className={`blood-group-btn ${formData.bloodGroup === group ? 'selected' : ''}`}
                  onClick={() => handleInputChange('bloodGroup', group)}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="severity" className="form-label">
              Urgency Level
            </label>
            <select
              id="severity"
              value={formData.severity}
              onChange={(e) => handleInputChange('severity', e.target.value)}
              className="form-input"
            >
              <option value="">Select Urgency Level</option>
              <option value="emergency">Emergency - Immediate attention required</option>
              <option value="urgent">Urgent - Required within 24 hours</option>
              <option value="normal">Normal - Scheduled procedure</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientName" className="form-label">
                Patient Name
              </label>
              <input
                type="text"
                id="patientName"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                placeholder="Enter patient's full name"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="form-input"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="patientAge" className="form-label">
                Patient Age
              </label>
              <input
                type="number"
                id="patientAge"
                value={formData.patientAge}
                onChange={(e) => handleInputChange('patientAge', e.target.value)}
                placeholder="Enter patient age"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bloodUnits" className="form-label">
                Blood Units Required
              </label>
              <input
                type="number"
                id="bloodUnits"
                value={formData.bloodUnits}
                onChange={(e) => handleInputChange('bloodUnits', e.target.value)}
                placeholder="Number of units needed"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="hospitalLocation" className="form-label">
              Hospital Location
            </label>
            <input
              type="text"
              id="hospitalLocation"
              value={formData.hospitalLocation}
              onChange={(e) => handleInputChange('hospitalLocation', e.target.value)}
              placeholder="Enter hospital name and address"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bloodbankLocation" className="form-label">
              Blood Bank Location
            </label>
            <input
              type="text"
              id="bloodbankLocation"
              value={formData.bloodbankLocation}
              onChange={(e) => handleInputChange('bloodbankLocation', e.target.value)}
              placeholder="Enter blood bank location"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Required Date
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="time" className="form-label">
                Required Time
              </label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber" className="form-label">
              Contact Number
            </label>
            <div className="input-wrapper">
              <span className="country-code">+91</span>
              <input
                type="tel"
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value.replace(/\D/g, ''))}
                placeholder="Enter contact number"
                className="form-input"
                maxLength={10}
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
              placeholder="Enter email address"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter complete address"
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

          <button
            type="button"
            onClick={handleSubmitForm}
            disabled={isLoading}
            className="primary-button"
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Processing your request...</span>
              </div>
            ) : (
              'Submit Blood Request'
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="register-footer">
          <p>
            By submitting this request, you agree to our{' '}
            <a href="#" className="footer-link">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="footer-link">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestPage; 