import React from 'react';
import './DonateScreen.css';
import Header from './Header';

const DonateScreen: React.FC = () => {
  return (
    <div className="donate-container">
      {/* Header */}
      <Header title="Donate Blood" />
      
      <div className="donate-header">
        <h2 className="donate-title">Donate Blood</h2>
        <p className="donate-subtitle">Register as a blood donor and save lives</p>
      </div>
      
      <div className="donate-content">
        <div className="donate-info-section">
          <div className="info-card">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="info-title">Why Donate Blood?</h3>
            <p className="info-description">
              Blood donation is a simple act that can save up to 3 lives. Every 2 seconds, 
              someone needs blood. Your donation can make a difference in emergency situations, 
              surgeries, and treatments for various medical conditions.
            </p>
          </div>
          
          <div className="eligibility-card">
            <h3 className="eligibility-title">Eligibility Criteria</h3>
            <ul className="eligibility-list">
              <li>Age between 18-65 years</li>
              <li>Weight at least 50 kg</li>
              <li>Hemoglobin level 12.5 g/dL or higher</li>
              <li>No recent tattoos or piercings (within 6 months)</li>
              <li>No recent surgery or illness</li>
              <li>Not pregnant or breastfeeding</li>
            </ul>
          </div>
        </div>
        
        <div className="donor-registration-section">
          <div className="registration-card">
            <h3 className="registration-title">Register as Blood Donor</h3>
            <form className="donor-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input type="text" className="form-input" placeholder="Enter first name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input type="text" className="form-input" placeholder="Enter last name" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Blood Group *</label>
                  <select className="form-input">
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Date of Birth *</label>
                  <input type="date" className="form-input" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select className="form-input">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Weight (kg) *</label>
                  <input type="number" className="form-input" placeholder="Enter weight" min="30" max="200" />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" className="form-input" placeholder="Enter email address" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input type="tel" className="form-input" placeholder="Enter phone number" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Address *</label>
                <textarea className="form-input" rows={3} placeholder="Enter complete address"></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input type="text" className="form-input" placeholder="Enter city" />
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input type="text" className="form-input" placeholder="Enter state" />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Pincode *</label>
                <input type="text" className="form-input" placeholder="Enter pincode" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Emergency Contact *</label>
                <input type="text" className="form-input" placeholder="Name of emergency contact" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Emergency Contact Number *</label>
                <input type="tel" className="form-input" placeholder="Emergency contact phone number" />
              </div>
              
              <div className="form-group">
                <label className="form-label">Medical History</label>
                <textarea className="form-input" rows={3} placeholder="Any medical conditions, allergies, or medications (optional)"></textarea>
              </div>
              
              <div className="form-group">
                <label className="form-label">Preferred Donation Center</label>
                <select className="form-input">
                  <option value="">Select Preferred Center</option>
                  <option value="center1">City Blood Bank - Andheri</option>
                  <option value="center2">Apollo Hospital - Bandra</option>
                  <option value="center3">KEM Hospital - Parel</option>
                  <option value="center4">Lilavati Hospital - Bandra</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-text">
                    I agree to donate blood when requested and confirm that I meet all eligibility criteria
                  </span>
                </label>
              </div>
              
              <button type="submit" className="submit-button">
                Register as Donor
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateScreen; 