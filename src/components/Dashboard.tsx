import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Dashboard.css';
import DonorsScreen from './DonorsScreen';
import RequestsScreen from './RequestsScreen';
import DonateScreen from './DonateScreen';
import BloodRequestPage from './BloodRequestPage';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardProps {
  mobileNumber: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ mobileNumber, onLogout }) => {
  return <DashboardContent mobileNumber={mobileNumber} onLogout={onLogout} />;
};

const DashboardContent: React.FC<DashboardProps> = ({ mobileNumber, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRegisteredAsDonor, setIsRegisteredAsDonor] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'urgent',
      title: 'Urgent Blood Request',
      message: 'A+ blood needed urgently at City General Hospital',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'donation',
      title: 'Blood Donation Successful',
      message: 'Thank you for your donation. You helped save a life!',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Donation Reminder',
      message: 'You are eligible to donate blood again. Schedule your next donation.',
      time: '3 hours ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/profile':
        return 'My Profile';
      case '/requests':
        return 'Blood Requests';
      case '/blood-request':
        return 'Request Blood';
      default:
        return 'Dashboard';
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/' && location.pathname === '/');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationItemClick = (notificationId: number) => {
    // Mark notification as read
    console.log('Notification clicked:', notificationId);
    setShowNotifications(false);
  };

  const handleDonorRegistration = () => {
    if (!isRegisteredAsDonor) {
      setIsRegisteredAsDonor(true);
      setShowSuccessModal(true);
    } else {
      // Navigate to request screen when already registered
      navigate('/requests');
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="dashboard-container">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Success!</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4>Successfully registered as donor!</h4>
              <p>You can proceed with helping donors.</p>
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={handleCloseModal}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="app-brand">
            <div className="app-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="app-name">BloodApp</h1>
          </div>
          <div className="header-actions">
            <div className="notification-container">
              <button className="notification-btn" onClick={handleNotificationClick}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>
              
              {showNotifications && (
                <div className="notification-popover">
                  <div className="popover-header">
                    <h3>Notifications</h3>
                    <button className="close-btn" onClick={() => setShowNotifications(false)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="popover-content">
                    {notifications.length === 0 ? (
                      <div className="no-notifications">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`notification-item ${!notification.read ? 'unread' : ''}`}
                          onClick={() => handleNotificationItemClick(notification.id)}
                        >
                          <div className="notification-icon">
                            {notification.type === 'urgent' && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                            )}
                            {notification.type === 'donation' && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            )}
                            {notification.type === 'reminder' && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>
                          <div className="notification-content">
                            <h4 className="notification-title">{notification.title}</h4>
                            <span className="notification-time">{notification.time}</span>
                          </div>
                          {!notification.read && <div className="unread-indicator"></div>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <Routes>
          <Route path="/" element={
            <DashboardHome 
              mobileNumber={mobileNumber} 
              isRegisteredAsDonor={isRegisteredAsDonor}
              onDonorRegistration={handleDonorRegistration}
            />
          } />
          <Route path="/requests" element={<RequestsScreen />} />
          <Route path="/profile" element={<ProfileScreen mobileNumber={mobileNumber} onLogout={onLogout} />} />
          <Route path="/donate" element={<DonateScreen />} />
          <Route path="/blood-request" element={<BloodRequestPage onBackToDashboard={() => window.history.back()} onRequestSuccess={() => {
            alert('Blood request submitted successfully!');
            window.history.back();
          }} />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
          </svg>
          <span>Dashboard</span>
        </Link>
        <Link to="/requests" className={`mobile-nav-item ${isActive('/requests') ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Requests</span>
        </Link>
        <Link to="/profile" className={`mobile-nav-item ${isActive('/profile') ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

const DashboardHome: React.FC<{ 
  mobileNumber: string; 
  isRegisteredAsDonor: boolean; 
  onDonorRegistration: () => void; 
}> = ({ mobileNumber, isRegisteredAsDonor, onDonorRegistration }) => {
  const [selectedArea, setSelectedArea] = useState('all');

  // Mock data for donor statistics by area
  const areaDonorStats = {
    all: {
      totalDonors: 1247,
      bloodGroups: {
        'A+': 312,
        'A-': 45,
        'B+': 298,
        'B-': 38,
        'AB+': 89,
        'AB-': 12,
        'O+': 356,
        'O-': 97
      }
    },
    'Mumbai Central': {
      totalDonors: 456,
      bloodGroups: {
        'A+': 128,
        'A-': 18,
        'B+': 112,
        'B-': 15,
        'AB+': 34,
        'AB-': 5,
        'O+': 124,
        'O-': 20
      }
    },
    'Andheri West': {
      totalDonors: 389,
      bloodGroups: {
        'A+': 98,
        'A-': 12,
        'B+': 95,
        'B-': 10,
        'AB+': 28,
        'AB-': 3,
        'O+': 108,
        'O-': 35
      }
    },
    'Bandra East': {
      totalDonors: 402,
      bloodGroups: {
        'A+': 86,
        'A-': 15,
        'B+': 91,
        'B-': 13,
        'AB+': 27,
        'AB-': 4,
        'O+': 124,
        'O-': 42
      }
    }
  };

  // Available areas for dropdown
  const availableAreas = [
    { value: 'all', label: 'All Areas' },
    { value: 'Mumbai Central', label: 'Mumbai Central' },
    { value: 'Andheri West', label: 'Andheri West' },
    { value: 'Bandra East', label: 'Bandra East' }
  ];

  // Get current donor stats based on selected area
  const donorStats = areaDonorStats[selectedArea as keyof typeof areaDonorStats];

  // Get user's first name from mobile number (for demo purposes)
  const getUserName = (mobile: string) => {
    // In a real app, you'd get this from user profile
    const names = ['Rajesh', 'Priya', 'Amit', 'Neha', 'Suresh', 'Meera', 'Kumar', 'Anjali'];
    const nameIndex = parseInt(mobile.slice(-1)) % names.length;
    return names[nameIndex];
  };

  const userName = getUserName(mobileNumber);

  // Calculate percentages for chart
  const bloodGroupData = Object.entries(donorStats.bloodGroups).map(([group, count]) => ({
    group,
    count,
    percentage: (count / donorStats.totalDonors) * 100
  }));

  // Prepare data for pie chart
  const chartData = {
    labels: bloodGroupData.map(item => item.group),
    datasets: [
      {
        data: bloodGroupData.map(item => item.count),
        backgroundColor: bloodGroupData.map(item => getBloodGroupColor(item.group)),
        borderColor: bloodGroupData.map(item => getBloodGroupColor(item.group)),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: 'bold' as const,
          },
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const percentage = ((value / donorStats.totalDonors) * 100).toFixed(1);
                return {
                  text: `${label}: ${value} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: 2,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 2,
        cornerRadius: 10,
        displayColors: true,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 12
        },
        callbacks: {
          title: function(context: any) {
            return `🩸 Blood Group: ${context[0].label}`;
          },
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = ((value / donorStats.totalDonors) * 100).toFixed(1);
            const totalDonors = donorStats.totalDonors;
            const remaining = totalDonors - value;
            
            return [
              `📊 Count: ${value} donors`,
              `📈 Percentage: ${percentage}%`,
              `📋 Total in ${selectedArea === 'all' ? 'all areas' : selectedArea}: ${totalDonors}`,
              `🔍 Remaining: ${remaining} donors`,
              `🎯 Rank: ${getRank(value, donorStats.bloodGroups)}`,
              `💡 Hover for more details!`
            ];
          }
        }
      }
    },
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
  };

  // Helper function to get rank of a blood group
  const getRank = (value: number, bloodGroups: { [key: string]: number }) => {
    const sortedGroups = Object.values(bloodGroups).sort((a, b) => b - a);
    const rank = sortedGroups.indexOf(value) + 1;
    const total = sortedGroups.length;
    
    if (rank === 1) return '1st (Highest)';
    if (rank === 2) return '2nd';
    if (rank === 3) return '3rd';
    if (rank === total) return `${rank}th (Lowest)`;
    return `${rank}th`;
  };

  return (
    <div className="dashboard-home">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-header">
            <div className="welcome-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="welcome-text">
              <h1 className="welcome-title">Hi {userName}! 👋</h1>
              <p className="welcome-subtitle">Welcome back to BloodApp. Ready to save lives today?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Statistics Section */}
      <div className="stats-section">
        <div className="stats-header">
          <h2 className="stats-title">Request Statistics</h2>
          <p className="stats-subtitle">Overview of blood requests and their status</p>
        </div>
        
        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-number">24</h3>
              <p className="stat-label">Total Requests</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-number">8</h3>
              <p className="stat-label">Pending</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon urgent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-number">3</h3>
              <p className="stat-label">Urgent</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon completed">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3 className="stat-number">16</h3>
              <p className="stat-label">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="cards-grid">
        <div className="dashboard-card featured">
          <div className="card-header">
            <div className="card-icon green-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">{isRegisteredAsDonor ? "Help Donors" : "Donate Blood"}</h3>
              <p className="card-description">
                {isRegisteredAsDonor ? "Click to help donors" : "Register as donor and save lives"}
              </p>
            </div>
          </div>
          <button 
            onClick={onDonorRegistration} 
            className={`donor-button ${isRegisteredAsDonor ? 'help-button' : 'full-screen-button'}`}
          >
            {isRegisteredAsDonor ? "Click to Help Donor" : "Register as Donor"}
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon red-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Create Blood Request</h3>
              <p className="card-description">Request blood for emergency or scheduled needs</p>
            </div>
          </div>
          <Link to="/blood-request" className="card-button emergency-button">
            Create Request
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-icon blue-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Blood Donors</h3>
              <p className="card-description">Find nearby donors</p>
            </div>
          </div>
          <Link to="/donors" className="card-button blue-button">
            Find Donors
          </Link>
        </div>
      </div>

      {/* Donor Statistics Section */}
      <div className="stats-section">
        <div className="stats-header">
          <div className="stats-title-row">
            <h2 className="stats-title">Donor Statistics</h2>
            <div className="area-selector">
              <label htmlFor="area-select" className="area-label">Select Area:</label>
              <select
                id="area-select"
                value={selectedArea}
                onChange={handleAreaChange}
                className="area-dropdown"
              >
                {availableAreas.map(area => (
                  <option key={area.value} value={area.value}>
                    {area.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="stats-subtitle">
            {selectedArea === 'all' 
              ? 'Total registered donors across all areas' 
              : `Total registered donors in ${selectedArea}`
            }
          </p>
        </div>
        
        <div className="stats-grid">
          {/* Blood Group Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Blood Group Distribution</h3>
              <p className="chart-subtitle">
                {selectedArea === 'all' 
                  ? 'Donors by blood type across all areas' 
                  : `Donors by blood type in ${selectedArea}`
                }
              </p>
            </div>
            <div className="chart-container">
              <div className="pie-chart-wrapper">
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get blood group colors (light/pastel shades)
const getBloodGroupColor = (bloodGroup: string): string => {
  const colors: { [key: string]: string } = {
    'A+': '#ffb3b3',  // Light red
    'A-': '#ffcccc',  // Lighter red
    'B+': '#b3d9ff',  // Light blue
    'B-': '#cce5ff',  // Lighter blue
    'AB+': '#e6ccff', // Light purple
    'AB-': '#f0e6ff', // Lighter purple
    'O+': '#b3ffb3',  // Light green
    'O-': '#ccffcc'   // Lighter green
  };
  return colors[bloodGroup] || '#f0f0f0';
};

const ProfileScreen: React.FC<{ mobileNumber: string; onLogout: () => void }> = ({ mobileNumber, onLogout }) => {
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
    </div>
  );
};



export default Dashboard; 