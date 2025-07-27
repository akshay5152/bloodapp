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
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const severityLevels = [
    { 
      value: 'emergency', 
      label: 'Emergency', 
      description: 'Immediate attention required', 
      color: '#e74c3c',
      icon: '🚨',
      bgColor: '#fef2f2'
    },
    { 
      value: 'urgent', 
      label: 'Urgent', 
      description: 'Required within 24 hours', 
      color: '#f39c12',
      icon: '⚡',
      bgColor: '#fffbeb'
    },
    { 
      value: 'normal', 
      label: 'Normal', 
      description: 'Scheduled procedure', 
      color: '#27ae60',
      icon: '📋',
      bgColor: '#f0fdf4'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = async () => {
    // Validate all required fields
    if (!formData.bloodGroup || !formData.severity || !formData.hospitalLocation || !formData.bloodbankLocation || 
        !formData.patientName || !formData.gender || !formData.date || !formData.time || 
        !formData.patientAge || !formData.bloodUnits) {
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
    <div className="blood-request-page-container">
      <div className="blood-request-page-card">
        {/* Enhanced Header with Background Pattern */}
        <div className="blood-request-page-header">
          <div className="header-background-pattern"></div>
          <div className="header-content">
            <button onClick={onBackToDashboard} className="back-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="header-text">
              <div className="title-wrapper">
                <div className="title-icon">🩸</div>
                <h1 className="blood-request-page-title">Request Blood</h1>
              </div>
              <p className="blood-request-page-subtitle">Complete the form below to submit your blood request. We'll help you find donors quickly.</p>
            </div>
          </div>
        </div>

        {/* Enhanced Error Message */}
        {error && (
          <div className="error-message">
            <div className="error-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="error-content">
              <span className="error-title">Please check your input</span>
              <span className="error-text">{error}</span>
            </div>
          </div>
        )}

        {/* Enhanced Blood Request Form */}
        <div className="blood-request-page-form">
          {/* Progress Indicator */}
          <div className="form-progress">
            <div className="progress-step active">
              <div className="progress-dot"></div>
              <span>Basic Info</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step">
              <div className="progress-dot"></div>
              <span>Details</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step">
              <div className="progress-dot"></div>
              <span>Submit</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bloodGroup" className="form-label">
              <span className="label-icon">🩸</span>
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
                  <span className="blood-group-text">{group}</span>
                  {formData.bloodGroup === group && (
                    <div className="selected-indicator">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="severity" className="form-label">
              <span className="label-icon">⚠️</span>
              Urgency Level
            </label>
            <div className="severity-grid">
              {severityLevels.map(level => (
                <button
                  key={level.value}
                  type="button"
                  className={`severity-btn ${formData.severity === level.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('severity', level.value)}
                  style={{ 
                    borderColor: formData.severity === level.value ? level.color : '#e2e8f0',
                    backgroundColor: formData.severity === level.value ? level.color : level.bgColor,
                    color: formData.severity === level.value ? 'white' : '#1e293b'
                  }}
                >
                  <div className="severity-icon">{level.icon}</div>
                  <div className="severity-content">
                    <div className="severity-label">{level.label}</div>
                    <div className="severity-description">{level.description}</div>
                  </div>
                  {formData.severity === level.value && (
                    <div className="selected-indicator">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">🏥</div>
              <h3 className="section-title">Location Details</h3>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hospitalLocation" className="form-label">
                  Hospital Location
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">🏥</div>
                  <input
                    type="text"
                    id="hospitalLocation"
                    value={formData.hospitalLocation}
                    onChange={(e) => handleInputChange('hospitalLocation', e.target.value)}
                    placeholder="Enter hospital name and address"
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bloodbankLocation" className="form-label">
                  Blood Bank Location
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">🩺</div>
                  <input
                    type="text"
                    id="bloodbankLocation"
                    value={formData.bloodbankLocation}
                    onChange={(e) => handleInputChange('bloodbankLocation', e.target.value)}
                    placeholder="Enter blood bank location"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">👤</div>
              <h3 className="section-title">Patient Information</h3>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientName" className="form-label">
                  Patient Name
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">👤</div>
                  <input
                    type="text"
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => handleInputChange('patientName', e.target.value)}
                    placeholder="Enter patient's full name"
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">⚧</div>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientAge" className="form-label">
                  Patient Age
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">🎂</div>
                  <input
                    type="number"
                    id="patientAge"
                    value={formData.patientAge}
                    onChange={(e) => handleInputChange('patientAge', e.target.value)}
                    placeholder="Enter patient age"
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bloodUnits" className="form-label">
                  Blood Units Required
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">💉</div>
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
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">📅</div>
              <h3 className="section-title">Timing Details</h3>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Required Date
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">📅</div>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  Required Time
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">⏰</div>
                  <input
                    type="time"
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
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
              <>
                <span className="button-icon">🚀</span>
                <span>Submit Blood Request</span>
              </>
            )}
          </button>
        </div>

        {/* Enhanced Footer */}
        <div className="blood-request-page-footer">
          <div className="footer-content">
            <div className="footer-info">
              <div className="info-icon">ℹ️</div>
              <p>
                By submitting this request, you agree to our{' '}
                <a href="#" className="footer-link">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="footer-link">Privacy Policy</a>
              </p>
            </div>
            <div className="footer-stats">
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Secure</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Fast</span>
                <span className="stat-label">Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestPage; 