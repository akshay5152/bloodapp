import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './RequestsScreen.css';
import Header from './Header';

const RequestsScreen: React.FC = () => {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');
  

  
  const isActive = (path: string) => {
    return location.pathname === path || (path === '/' && location.pathname === '/');
  };

  // Mock data for recent requests and donations
  const recentRequests = [
    {
      id: 1,
      patientName: "Rajesh Kumar",
      bloodGroup: "A+",
      units: 2,
      hospital: "City General Hospital",
      status: "urgent",
      time: "2 hours ago",
      location: "Mumbai, Maharashtra",
      priority: "high",
      mobileNumber: "+91 98765 43210",
      type: "request"
    },
    {
      id: 2,
      patientName: "Meera Patel",
      bloodGroup: "O+",
      units: 1,
      hospital: "Apollo Hospital",
      status: "normal",
      time: "1 day ago",
      location: "Mumbai, Maharashtra",
      priority: "medium",
      mobileNumber: "+91 87654 32109",
      type: "request"
    },
    {
      id: 3,
      patientName: "Amit Singh",
      bloodGroup: "B+",
      units: 3,
      hospital: "Fortis Hospital",
      status: "urgent",
      time: "3 days ago",
      location: "Mumbai, Maharashtra",
      priority: "high",
      mobileNumber: "+91 76543 21098",
      type: "request"
    },
    {
      id: 4,
      patientName: "Priya Sharma",
      bloodGroup: "AB+",
      units: 1,
      hospital: "Kokilaben Hospital",
      status: "normal",
      time: "1 week ago",
      location: "Mumbai, Maharashtra",
      priority: "low",
      mobileNumber: "+91 65432 10987",
      type: "request"
    },
    {
      id: 5,
      donorName: "Arjun Reddy",
      bloodGroup: "O+",
      units: 1,
      hospital: "City General Hospital",
      status: "donated",
      time: "30 minutes ago",
      message: "Successfully donated blood for emergency case",
      type: "donation"
    },
    {
      id: 6,
      donorName: "Sneha Desai",
      bloodGroup: "A-",
      units: 1,
      hospital: "Apollo Hospital",
      status: "donated",
      time: "2 hours ago",
      message: "Blood donation completed for scheduled surgery",
      type: "donation"
    },
    {
      id: 7,
      donorName: "Rahul Verma",
      bloodGroup: "B+",
      units: 1,
      hospital: "Fortis Hospital",
      status: "donated",
      time: "1 day ago",
      message: "Donated blood for trauma patient",
      type: "donation"
    },
    {
      id: 8,
      donorName: "Priya Gupta",
      bloodGroup: "AB+",
      units: 1,
      hospital: "Kokilaben Hospital",
      status: "donated",
      time: "2 days ago",
      message: "Blood donation successful for cancer treatment",
      type: "donation"
    }
  ];

  // Filter requests based on active filter
  const filteredRequests = recentRequests.filter(request => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'urgent') return request.status === 'urgent';
    if (activeFilter === 'normal') return request.status === 'normal';
    return true;
  });

  // Get items for display (first 4 requests + all donations)
  const allItems = filteredRequests.slice(0, 8);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent':
        return '🚨';
      case 'normal':
        return '📋';
      case 'donated':
        return '✅';
      default:
        return '📄';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="requests-screen-container">
      {/* Header */}
      <Header 
        title="Blood Requests" 
      />
      
      <div className="requests-container">
        {/* Enhanced Header */}
        <div className="requests-header">
          <div className="header-content">
            <div className="header-icon">🩸</div>
            <div className="header-text">
              <h2 className="requests-title">Blood Requests</h2>
              <p className="requests-subtitle">View and manage your blood requests</p>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <span className="filter-icon">📋</span>
            <span className="filter-text">All ({recentRequests.length})</span>
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'urgent' ? 'active' : ''}`}
            onClick={() => setActiveFilter('urgent')}
          >
            <span className="filter-icon">🚨</span>
            <span className="filter-text">Urgent ({recentRequests.filter(r => r.status === 'urgent').length})</span>
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'normal' ? 'active' : ''}`}
            onClick={() => setActiveFilter('normal')}
          >
            <span className="filter-icon">📄</span>
            <span className="filter-text">Normal ({recentRequests.filter(r => r.status === 'normal').length})</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="requests-content">
          {/* Enhanced Requests List */}
          <div className="requests-list">
            {allItems.map((item) => (
              <div key={item.id} className={`recent-request-item ${item.status}`}>
                {item.type === 'request' ? (
                  <>
                    <div className="request-header">
                      <div className="request-status-wrapper">
                        <div className={`request-status ${item.status}`}>
                          <span className="status-icon">{getStatusIcon(item.status || 'normal')}</span>
                          <span className="status-text">{item.status === 'urgent' ? 'URGENT' : 'NORMAL'}</span>
                        </div>
                        <div 
                          className="priority-indicator" 
                          style={{ backgroundColor: getPriorityColor(item.priority || 'medium') }}
                        ></div>
                      </div>
                      <div className="request-time-badge">
                        <span className="time-icon">⏰</span>
                        <span className="time-text">{item.time}</span>
                      </div>
                    </div>
                    
                    <div className="request-content">
                      <div className="patient-info">
                        <h4 className="patient-name">{item.patientName}</h4>
                        <div className="blood-info">
                          <span className="blood-group-badge">{item.bloodGroup}</span>
                          <span className="units-info">{item.units} unit{item.units > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      
                      <div className="request-details">
                        <div className="detail-item">
                          <span className="detail-icon">🏥</span>
                          <span className="detail-text">{item.hospital}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">📍</span>
                          <span className="detail-text">{item.location}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">📱</span>
                          <span className="detail-text">{item.mobileNumber}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="request-header">
                      <div className="request-status-wrapper">
                        <div className="request-status donation">
                          <span className="status-icon">✅</span>
                          <span className="status-text">DONATED</span>
                        </div>
                      </div>
                      <div className="request-time-badge">
                        <span className="time-icon">⏰</span>
                        <span className="time-text">{item.time}</span>
                      </div>
                    </div>
                    
                    <div className="request-content">
                      <div className="patient-info">
                        <h4 className="patient-name">{item.donorName}</h4>
                        <div className="blood-info">
                          <span className="blood-group-badge">{item.bloodGroup}</span>
                          <span className="units-info">{item.units} unit</span>
                        </div>
                      </div>
                      
                      <div className="request-details">
                        <div className="detail-item">
                          <span className="detail-icon">🏥</span>
                          <span className="detail-text">{item.hospital}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">💬</span>
                          <span className="detail-text">{item.message}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRequests.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3 className="empty-title">No requests found</h3>
              <p className="empty-description">There are no blood requests matching your current filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Mobile Bottom Navigation */}
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

export default RequestsScreen; 