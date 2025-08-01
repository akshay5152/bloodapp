import React from 'react';
import './DonorsScreen.css';
import Header from './Header';

const DonorsScreen: React.FC = () => {
  return (
    <div className="donors-container">
      {/* Header */}
      <Header title="Blood Donors" />
      
      <div className="donors-header">
        <h2 className="donors-title">Blood Donors</h2>
        <p className="donors-subtitle">Find nearby blood donors in your area</p>
      </div>
      
      <div className="search-section">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search by location, blood group, or name..."
            className="search-input"
          />
          <button className="search-button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="filters-section">
        <div className="filter-group">
          <label className="filter-label">Blood Group</label>
          <select className="filter-select">
            <option value="">All Groups</option>
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
        
        <div className="filter-group">
          <label className="filter-label">Distance</label>
          <select className="filter-select">
            <option value="5">Within 5 km</option>
            <option value="10">Within 10 km</option>
            <option value="25">Within 25 km</option>
            <option value="50">Within 50 km</option>
          </select>
        </div>
      </div>
      
      <div className="donors-list">
        <div className="donor-card">
          <div className="donor-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="donor-info">
            <h3 className="donor-name">Rahul Kumar</h3>
            <p className="donor-details">Blood Group: A+ | Last Donated: 3 months ago</p>
            <p className="donor-location">📍 2.5 km away | Mumbai, Maharashtra</p>
          </div>
          <button className="contact-button">Contact</button>
        </div>
        
        <div className="donor-card">
          <div className="donor-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="donor-info">
            <h3 className="donor-name">Priya Sharma</h3>
            <p className="donor-details">Blood Group: O+ | Last Donated: 1 month ago</p>
            <p className="donor-location">📍 4.2 km away | Mumbai, Maharashtra</p>
          </div>
          <button className="contact-button">Contact</button>
        </div>
        
        <div className="donor-card">
          <div className="donor-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="donor-info">
            <h3 className="donor-name">Amit Patel</h3>
            <p className="donor-details">Blood Group: B+ | Last Donated: 6 months ago</p>
            <p className="donor-location">📍 1.8 km away | Mumbai, Maharashtra</p>
          </div>
          <button className="contact-button">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default DonorsScreen; 