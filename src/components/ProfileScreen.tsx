import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ProfileScreen.css';

interface ProfileScreenProps {
  mobileNumber?: string;
  onLogout?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ mobileNumber, onLogout }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || (path === '/' && location.pathname === '/');
  };

  return (
    <div className="profile-screen">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div className="edit-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
          </div>
          <h2>My Profile</h2>
        </div>
        
        <div className="profile-details">
          <p>
            <strong>Mobile Number:</strong> +91 {mobileNumber}
            <span className="verified-tick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </p>
          <p>
            <strong>Aadhaar Number:</strong> XXXX-XXXX-1234
            <span className="verified-tick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </p>
          <p><strong>Blood Group:</strong> O+</p>
          <p><strong>Last Donation Date:</strong> 2023-01-15</p>
          <p><strong>Donation History:</strong> 2 donations</p>
        </div>
      </div>
      <button className="logout-button" onClick={onLogout}>Logout</button>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
          <div className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
          </div>
          <span>Dashboard</span>
        </Link>
        <Link to="/requests" className={`mobile-nav-item ${isActive('/requests') ? 'active' : ''}`}>
          <div className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span>Requests</span>
        </Link>
        <Link to="/profile" className={`mobile-nav-item ${isActive('/profile') ? 'active' : ''}`}>
          <div className="nav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default ProfileScreen; 