import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

interface AdminDashboardProps {
  username: string;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ username, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  // Sample notifications data
  const [notifications] = useState([
    {
      id: 1,
      type: 'request',
      message: 'New blood request from City General Hospital',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'donor',
      message: 'Donor registration completed for John Smith',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'emergency',
      message: 'Emergency blood request - O- needed urgently',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'system',
      message: 'System maintenance scheduled for tonight',
      time: '2 hours ago',
      read: true
    }
  ]);

  // Sample admin profile data
  const [adminProfile] = useState({
    name: 'Admin User',
    email: 'admin@bloodbank.com',
    role: 'System Administrator',
    phone: '+1-555-0123',
    department: 'Blood Bank Management',
    lastLogin: '2024-01-15 10:30 AM',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  // Sample data for statistics
  const [stats] = useState({
    totalUsers: 1247,
    totalDonors: 892,
    totalRequests: 156,
    pendingRequests: 23,
    emergencyRequests: 8,
    bloodAvailable: 45,
    recentDonations: 12
  });

  // Sample data for recent requests
  const [recentRequests] = useState([
    {
      id: 'REQ001',
      patientName: 'Sarah Johnson',
      bloodType: 'A+',
      units: 2,
      urgency: 'high',
      status: 'pending',
      hospital: 'City General Hospital',
      date: '2024-01-15',
      contact: '+1-555-0123'
    },
    {
      id: 'REQ002',
      patientName: 'Michael Chen',
      bloodType: 'O-',
      units: 1,
      urgency: 'medium',
      status: 'approved',
      hospital: 'Memorial Medical Center',
      date: '2024-01-14',
      contact: '+1-555-0456'
    },
    {
      id: 'REQ003',
      patientName: 'Emily Rodriguez',
      bloodType: 'B+',
      units: 3,
      urgency: 'high',
      status: 'pending',
      hospital: 'Regional Health Center',
      date: '2024-01-13',
      contact: '+1-555-0789'
    },
    {
      id: 'REQ004',
      patientName: 'David Thompson',
      bloodType: 'AB+',
      units: 1,
      urgency: 'low',
      status: 'completed',
      hospital: 'Community Hospital',
      date: '2024-01-12',
      contact: '+1-555-0321'
    },
    {
      id: 'REQ005',
      patientName: 'Lisa Wang',
      bloodType: 'O+',
      units: 2,
      urgency: 'medium',
      status: 'approved',
      hospital: 'University Medical Center',
      date: '2024-01-11',
      contact: '+1-555-0654'
    }
  ]);

  // Sample data for hospitals
  const [hospitals, setHospitals] = useState([
    {
      id: 'HOS001',
      name: 'City General Hospital',
      type: 'General',
      location: 'Downtown',
      contact: '+1-555-0100',
      email: 'info@citygeneral.com',
      bloodBankStatus: 'active',
      totalRequests: 45,
      pendingRequests: 8,
      lastRequest: '2024-01-15',
      emergencyContact: '+1-555-9111'
    },
    {
      id: 'HOS002',
      name: 'Memorial Medical Center',
      type: 'Specialized',
      location: 'Midtown',
      contact: '+1-555-0200',
      email: 'contact@memorialmc.com',
      bloodBankStatus: 'active',
      totalRequests: 32,
      pendingRequests: 5,
      lastRequest: '2024-01-14',
      emergencyContact: '+1-555-9222'
    },
    {
      id: 'HOS003',
      name: 'Regional Health Center',
      type: 'Community',
      location: 'Suburbs',
      contact: '+1-555-0300',
      email: 'admin@regionalhealth.com',
      bloodBankStatus: 'active',
      totalRequests: 28,
      pendingRequests: 3,
      lastRequest: '2024-01-13',
      emergencyContact: '+1-555-9333'
    },
    {
      id: 'HOS004',
      name: 'University Medical Center',
      type: 'Academic',
      location: 'University District',
      contact: '+1-555-0400',
      email: 'bloodbank@umc.edu',
      bloodBankStatus: 'active',
      totalRequests: 67,
      pendingRequests: 12,
      lastRequest: '2024-01-12',
      emergencyContact: '+1-555-9444'
    },
    {
      id: 'HOS005',
      name: 'Community Hospital',
      type: 'Community',
      location: 'Westside',
      contact: '+1-555-0500',
      email: 'info@communityhospital.com',
      bloodBankStatus: 'inactive',
      totalRequests: 15,
      pendingRequests: 0,
      lastRequest: '2024-01-10',
      emergencyContact: '+1-555-9555'
    }
  ]);

  // Sample data for recent donors
  const [recentDonors] = useState([
    {
      id: 'DON001',
      name: 'James Wilson',
      bloodType: 'A+',
      lastDonation: '2024-01-10',
      lastDonationDuration: '2 months ago',
      totalDonations: 8,
      status: 'available',
      location: 'Downtown Blood Center',
      contact: '+1-555-0987'
    },
    {
      id: 'DON002',
      name: 'Maria Garcia',
      bloodType: 'O-',
      lastDonation: '2024-01-08',
      lastDonationDuration: '2 months ago',
      totalDonations: 12,
      status: 'available',
      location: 'Community Blood Bank',
      contact: '+1-555-0765'
    },
    {
      id: 'DON003',
      name: 'Robert Kim',
      bloodType: 'B+',
      lastDonation: '2024-01-05',
      lastDonationDuration: '3 months ago',
      totalDonations: 5,
      status: 'unavailable',
      location: 'Regional Donation Center',
      contact: '+1-555-0543'
    },
    {
      id: 'DON004',
      name: 'Jennifer Lee',
      bloodType: 'AB+',
      lastDonation: '2024-01-03',
      lastDonationDuration: '1 month ago',
      totalDonations: 15,
      status: 'available',
      location: 'University Blood Center',
      contact: '+1-555-0321'
    },
    {
      id: 'DON005',
      name: 'Thomas Brown',
      bloodType: 'O+',
      lastDonation: '2024-01-01',
      lastDonationDuration: '4 months ago',
      totalDonations: 9,
      status: 'available',
      location: 'Memorial Blood Bank',
      contact: '+1-555-0109'
    },
    {
      id: 'DON006',
      name: 'Sarah Johnson',
      bloodType: 'A-',
      lastDonation: '2023-12-15',
      lastDonationDuration: '6 months ago',
      totalDonations: 11,
      status: 'available',
      location: 'Central Blood Bank',
      contact: '+1-555-0432'
    },
    {
      id: 'DON007',
      name: 'Michael Chen',
      bloodType: 'B-',
      lastDonation: '2023-11-20',
      lastDonationDuration: '7 months ago',
      totalDonations: 6,
      status: 'unavailable',
      location: 'Metro Blood Center',
      contact: '+1-555-0654'
    },
    {
      id: 'DON008',
      name: 'Lisa Rodriguez',
      bloodType: 'O-',
      lastDonation: '2023-10-10',
      lastDonationDuration: '8 months ago',
      totalDonations: 13,
      status: 'available',
      location: 'Community Health Center',
      contact: '+1-555-0876'
    }
  ]);

  // Sample data for users with area information
  const [users] = useState([
    {
      id: 'USR001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-0123',
      role: 'Donor',
      status: 'active',
      joinDate: '2023-06-15',
      lastActive: '2024-01-15',
      area: 'Downtown'
    },
    {
      id: 'USR002',
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      phone: '+1-555-0456',
      role: 'Recipient',
      status: 'active',
      joinDate: '2023-08-22',
      lastActive: '2024-01-14',
      area: 'North District'
    },
    {
      id: 'USR003',
      name: 'Bob Wilson',
      email: 'bob.wilson@email.com',
      phone: '+1-555-0789',
      role: 'Donor',
      status: 'inactive',
      joinDate: '2023-05-10',
      lastActive: '2023-12-20',
      area: 'South District'
    },
    {
      id: 'USR004',
      name: 'Carol Davis',
      email: 'carol.davis@email.com',
      phone: '+1-555-0321',
      role: 'Recipient',
      status: 'active',
      joinDate: '2023-09-05',
      lastActive: '2024-01-13',
      area: 'East District'
    },
    {
      id: 'USR005',
      name: 'David Miller',
      email: 'david.miller@email.com',
      phone: '+1-555-0654',
      role: 'Donor',
      status: 'active',
      joinDate: '2023-07-18',
      lastActive: '2024-01-12',
      area: 'West District'
    },
    {
      id: 'USR006',
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+1-555-0987',
      role: 'Donor',
      status: 'active',
      joinDate: '2023-10-12',
      lastActive: '2024-01-11',
      area: 'Downtown'
    },
    {
      id: 'USR007',
      name: 'Frank Brown',
      email: 'frank.brown@email.com',
      phone: '+1-555-0543',
      role: 'Recipient',
      status: 'active',
      joinDate: '2023-11-08',
      lastActive: '2024-01-10',
      area: 'North District'
    },
    {
      id: 'USR008',
      name: 'Grace Lee',
      email: 'grace.lee@email.com',
      phone: '+1-555-0765',
      role: 'Donor',
      status: 'active',
      joinDate: '2023-12-03',
      lastActive: '2024-01-09',
      area: 'South District'
    }
  ]);

  // Sample data for blood inventory
  const [bloodInventory] = useState([
    { type: 'A+', available: 45, reserved: 12, total: 57 },
    { type: 'A-', available: 23, reserved: 8, total: 31 },
    { type: 'B+', available: 38, reserved: 15, total: 53 },
    { type: 'B-', available: 18, reserved: 6, total: 24 },
    { type: 'AB+', available: 12, reserved: 4, total: 16 },
    { type: 'AB-', available: 8, reserved: 2, total: 10 },
    { type: 'O+', available: 67, reserved: 25, total: 92 },
    { type: 'O-', available: 34, reserved: 12, total: 46 }
  ]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); }, 1000);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
      setUploadStatus('idle');
      setUploadMessage('');
    } else {
      setUploadMessage('Please select a valid CSV file');
      setUploadStatus('error');
    }
  };

  const handleBulkUpload = async () => {
    if (!uploadedFile) return;

    setUploadStatus('uploading');
    setUploadProgress(0);
    setUploadMessage('Processing hospital data...');

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Read and parse the CSV file
      const text = await uploadedFile.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      const newHospitals: Array<{
        id: string;
        name: string;
        type: string;
        location: string;
        contact: string;
        email: string;
        bloodBankStatus: string;
        totalRequests: number;
        pendingRequests: number;
        lastRequest: string;
        emergencyContact: string;
      }> = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const hospitalData: any = {};
        
        headers.forEach((header, index) => {
          const value = values[index] || null;
          hospitalData[header.toLowerCase().replace(/\s+/g, '')] = value;
        });
        
        // Create new hospital object with proper structure
        const newHospital: {
          id: string;
          name: string;
          type: string;
          location: string;
          contact: string;
          email: string;
          bloodBankStatus: string;
          totalRequests: number;
          pendingRequests: number;
          lastRequest: string;
          emergencyContact: string;
        } = {
          id: hospitalData.hospitalid || `HOS${String(hospitals.length + newHospitals.length + 1).padStart(3, '0')}`,
          name: hospitalData.hospitalname || 'Unknown Hospital',
          type: hospitalData.type || 'General',
          location: hospitalData.location || 'Unknown Location',
          contact: hospitalData.contact || 'N/A',
          email: hospitalData.email || 'N/A',
          bloodBankStatus: hospitalData.bloodbankstatus || 'inactive',
          totalRequests: parseInt(hospitalData.totalrequests) || 0,
          pendingRequests: parseInt(hospitalData.pendingrequests) || 0,
          lastRequest: hospitalData.lastrequest || 'N/A',
          emergencyContact: hospitalData.emergencycontact || 'N/A'
        };
        
        newHospitals.push(newHospital);
      }
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new hospitals to the state
      setHospitals(prevHospitals => [...prevHospitals, ...newHospitals]);
      
      clearInterval(interval);
      setUploadProgress(100);
      setUploadStatus('success');
      setUploadMessage(`Successfully added ${newHospitals.length} new hospitals!`);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setShowBulkUpload(false);
        setUploadedFile(null);
        setUploadProgress(0);
        setUploadStatus('idle');
        setUploadMessage('');
      }, 3000);
    } catch (error) {
      clearInterval(interval);
      setUploadStatus('error');
      setUploadMessage('Error processing file. Please check the CSV format and try again.');
    }
  };

  const downloadTemplate = () => {
    // CSV content for hospital registration template
    const csvContent = `Hospital Name,Hospital Type,Hospital Location,Hospital Contact,Hospital Email,Emergency Contact,Hospital Address,Hospital City,Hospital State,Hospital Pincode,Hospital Registration Number,Hospital License Number,Hospital Tax ID,Hospital Website
City General Hospital,General,Downtown,+1-555-0100,info@citygeneral.com,+1-555-9111,123 Main Street Downtown,Hyderabad,Telangana,500001,HOS-REG-2024-001,TS-LIC-2024-001,TAX-ID-2024-001,www.citygeneral.com
Memorial Medical Center,Specialized,Midtown,+1-555-0200,contact@memorialmc.com,+1-555-9222,456 Oak Avenue Midtown,Hyderabad,Telangana,500002,HOS-REG-2024-002,TS-LIC-2024-002,TAX-ID-2024-002,www.memorialmc.com
Regional Health Center,Community,Suburbs,+1-555-0300,info@regionalhealth.com,+1-555-9333,789 Pine Road Suburbs,Hyderabad,Telangana,500003,HOS-REG-2024-003,TS-LIC-2024-003,TAX-ID-2024-003,www.regionalhealth.com
University Medical Center,Academic,University District,+1-555-0400,admin@universitymc.com,+1-555-9444,321 Campus Drive University District,Hyderabad,Telangana,500004,HOS-REG-2024-004,TS-LIC-2024-004,TAX-ID-2024-004,www.universitymc.com
Community Hospital,Community,Westside,+1-555-0500,info@communityhospital.com,+1-555-9555,654 Community Lane Westside,Hyderabad,Telangana,500005,HOS-REG-2024-005,TS-LIC-2024-005,TAX-ID-2024-005,www.communityhospital.com`;

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hospital_registration_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const renderOverview = () => (
    <div className="admin-overview">
      <div className="admin-stats-grid">
        <div className="admin-stat-card requests">
          <div className="admin-stat-icon requests">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <h3>{stats.totalRequests}</h3>
            <p>Total Requests</p>
          </div>
        </div>

        <div className="admin-stat-card donors">
          <div className="admin-stat-icon donors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <h3>{stats.totalDonors}</h3>
            <p>Active Donors</p>
          </div>
        </div>

        <div className="admin-stat-card blood-available">
          <div className="admin-stat-icon blood-available">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <h3>{stats.bloodAvailable}</h3>
            <p>Blood Units Available</p>
          </div>
        </div>

        <div className="admin-stat-card emergency">
          <div className="admin-stat-icon emergency">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="admin-stat-content">
            <h3>{stats.emergencyRequests}</h3>
            <p>Emergency Requests</p>
          </div>
        </div>
      </div>

      <div className="admin-recent-section">
        <div className="admin-recent-requests">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Recent Blood Requests
          </h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Blood Type</th>
                  <th>Units</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Hospital</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.patientName}</td>
                    <td><span className={`blood-type ${request.bloodType.toLowerCase()}`}>{request.bloodType}</span></td>
                    <td>{request.units}</td>
                    <td><span className={`urgency ${request.urgency}`}>{request.urgency}</span></td>
                    <td><span className={`status ${request.status}`}>{request.status}</span></td>
                    <td>{request.hospital}</td>
                    <td>{request.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-recent-donors">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Recent Donors
          </h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Blood Type</th>
                  <th>Last Donation</th>
                  <th>Total Donations</th>
                  <th>Status</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {recentDonors.map((donor) => (
                  <tr key={donor.id}>
                    <td>{donor.id}</td>
                    <td>{donor.name}</td>
                    <td><span className={`blood-type ${donor.bloodType.toLowerCase()}`}>{donor.bloodType}</span></td>
                    <td>{donor.lastDonation}</td>
                    <td>{donor.totalDonations}</td>
                    <td><span className={`status ${donor.status}`}>{donor.status}</span></td>
                    <td>{donor.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => {
    // Get unique areas for dropdown
    const areas = ['all', ...Array.from(new Set(users.map(user => user.area)))];
    
    // Get unique roles for dropdown
    const roles = ['all', ...Array.from(new Set(users.map(user => user.role)))];
    
    // Filter users based on selected area and role
    const filteredUsers = users.filter(user => {
      const areaMatch = selectedArea === 'all' || user.area === selectedArea;
      const roleMatch = selectedRole === 'all' || user.role === selectedRole;
      return areaMatch && roleMatch;
    });

    return (
      <div className="admin-section">
        <h2>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          User Management
        </h2>
        
        <div className="admin-filter-section">
          <div className="admin-filter-group">
            <label htmlFor="area-filter">Filter by Area:</label>
            <select 
              id="area-filter"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="admin-filter-select"
            >
              {areas.map(area => (
                <option key={area} value={area}>
                  {area === 'all' ? 'All Areas' : area}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-filter-group">
            <label htmlFor="role-filter">Filter by Role:</label>
            <select 
              id="role-filter"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="admin-filter-select"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-filter-info">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Area</th>
                <th>Join Date</th>
                <th>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td><span className={`admin-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                  <td><span className={`status ${user.status}`}>{user.status}</span></td>
                  <td><span className="admin-area-badge">{user.area}</span></td>
                  <td>{user.joinDate}</td>
                  <td>{user.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDonors = () => (
    <div className="admin-section">
      <h2>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Donor Management
      </h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Blood Type</th>
              <th>Last Donation</th>
              <th>Duration</th>
              <th>Total Donations</th>
              <th>Status</th>
              <th>Location</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {recentDonors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.id}</td>
                <td>{donor.name}</td>
                <td><span className={`blood-type ${donor.bloodType.toLowerCase()}`}>{donor.bloodType}</span></td>
                <td>{donor.lastDonation}</td>
                <td><span className="donation-duration">{donor.lastDonationDuration}</span></td>
                <td>{donor.totalDonations}</td>
                <td><span className={`status ${donor.status}`}>{donor.status}</span></td>
                <td>{donor.location}</td>
                <td>{donor.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="admin-section">
      <h2>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Request Management
      </h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Blood Type</th>
              <th>Units</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Hospital</th>
              <th>Date</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {recentRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.patientName}</td>
                <td><span className={`blood-type ${request.bloodType.toLowerCase()}`}>{request.bloodType}</span></td>
                <td>{request.units}</td>
                <td><span className={`urgency ${request.urgency}`}>{request.urgency}</span></td>
                <td><span className={`status ${request.status}`}>{request.status}</span></td>
                <td>{request.hospital}</td>
                <td>{request.date}</td>
                <td>{request.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="admin-section">
      <h2>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Blood Inventory
      </h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Available Units</th>
              <th>Reserved Units</th>
              <th>Total Units</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bloodInventory.map((item) => (
              <tr key={item.type}>
                <td><span className={`blood-type ${item.type.toLowerCase()}`}>{item.type}</span></td>
                <td>{item.available}</td>
                <td>{item.reserved}</td>
                <td>{item.total}</td>
                <td>
                  <span className={`status ${item.available > 10 ? 'available' : item.available > 5 ? 'pending' : 'unavailable'}`}>
                    {item.available > 10 ? 'Available' : item.available > 5 ? 'Low' : 'Critical'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="admin-profile">
      <div className="admin-section-header">
        <h3>Admin Profile</h3>
        <p>Manage your account settings and preferences</p>
      </div>
      
      <div className="admin-profile-container">
        <div className="admin-profile-header">
          <div className="admin-profile-avatar">
            <img src={adminProfile.avatar} alt="Admin Avatar" />
          </div>
          <div className="admin-profile-info">
            <h2>{adminProfile.name}</h2>
            <p className="admin-profile-role">{adminProfile.role}</p>
            <p className="admin-profile-department">{adminProfile.department}</p>
          </div>
        </div>
        
        <div className="admin-profile-details">
          <div className="admin-profile-section">
            <h4>Contact Information</h4>
            <div className="admin-profile-grid">
              <div className="admin-profile-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <label>Email</label>
                  <span>{adminProfile.email}</span>
                </div>
              </div>
              <div className="admin-profile-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <label>Phone</label>
                  <span>{adminProfile.phone}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="admin-profile-section">
            <h4>Account Information</h4>
            <div className="admin-profile-grid">
              <div className="admin-profile-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <label>Last Login</label>
                  <span>{adminProfile.lastLogin}</span>
                </div>
              </div>
              <div className="admin-profile-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <label>Account Status</label>
                  <span className="admin-status-active">Active</span>
                </div>
              </div>
            </div>
          </div>
          

        </div>
        
        <div className="admin-profile-actions">
          <button className="admin-profile-btn primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
          <button className="admin-profile-btn secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );

  const renderHospitals = () => (
    <div className="admin-section">
      <h2>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Hospital Management
      </h2>
      
      {/* Bulk Upload Section */}
      <div className="admin-bulk-upload-section">
        <div className="admin-bulk-upload-header">
          <h3>Bulk Upload Hospitals</h3>
          <div className="admin-bulk-upload-actions">
            <button 
              className="admin-template-btn"
              onClick={downloadTemplate}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Template
            </button>
            <button 
              className="admin-upload-btn"
              onClick={() => setShowBulkUpload(!showBulkUpload)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {showBulkUpload ? 'Cancel Upload' : 'Bulk Upload'}
            </button>
          </div>
        </div>

        {showBulkUpload && (
          <div className="admin-bulk-upload-content">
            <div className="admin-upload-area">
              <div className="admin-upload-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h4>Upload Hospital Data</h4>
              <p>Select a CSV file with hospital information</p>
              
              <div className="admin-file-input">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  id="hospital-upload"
                  className="admin-file-input-hidden"
                />
                <label htmlFor="hospital-upload" className="admin-file-input-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Choose CSV File
                </label>
              </div>

              {uploadedFile && (
                <div className="admin-file-info">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{uploadedFile.name}</span>
                  <span className="admin-file-size">({(uploadedFile.size / 1024).toFixed(1)} KB)</span>
                </div>
              )}

              {uploadStatus === 'uploading' && (
                <div className="admin-upload-progress">
                  <div className="admin-progress-bar">
                    <div 
                      className="admin-progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="admin-progress-text">{uploadProgress}%</span>
                </div>
              )}

              {uploadMessage && (
                <div className={`admin-upload-message ${uploadStatus}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {uploadStatus === 'success' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : uploadStatus === 'error' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  {uploadMessage}
                </div>
              )}

              <button
                className="admin-process-btn"
                onClick={handleBulkUpload}
                disabled={!uploadedFile || uploadStatus === 'uploading'}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Process Upload
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hospital Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Blood Bank Status</th>
              <th>Total Requests</th>
              <th>Pending</th>
              <th>Last Request</th>
              <th>Emergency Contact</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital.id}>
                <td>{hospital.id}</td>
                <td>{hospital.name}</td>
                <td><span className={`hospital-type ${hospital.type.toLowerCase()}`}>{hospital.type}</span></td>
                <td>{hospital.location}</td>
                <td>{hospital.contact}</td>
                <td>{hospital.email}</td>
                <td><span className={`status ${hospital.bloodBankStatus}`}>{hospital.bloodBankStatus}</span></td>
                <td>{hospital.totalRequests}</td>
                <td>{hospital.pendingRequests}</td>
                <td>{hospital.lastRequest}</td>
                <td>{hospital.emergencyContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-loading">
          <div className="admin-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-left">
          <div className="admin-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div className="admin-header-info">
            <h1>Blood Bank Admin</h1>
            <p>Management Dashboard</p>
          </div>
        </div>
        <div className="admin-header-right">
          <div className="admin-notifications">
            <button 
              className="admin-notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="admin-notification-badge">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="admin-notifications-dropdown">
                <div className="admin-notifications-header">
                  <h4>Notifications</h4>
                  <button className="admin-mark-all-read">Mark all read</button>
                </div>
                <div className="admin-notifications-list">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`admin-notification-item ${!notification.read ? 'unread' : ''}`}>
                      <div className="admin-notification-icon">
                        {notification.type === 'request' && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {notification.type === 'donor' && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )}
                        {notification.type === 'emergency' && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        )}
                        {notification.type === 'system' && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </div>
                      <div className="admin-notification-content">
                        <p>{notification.message}</p>
                        <span className="admin-notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            className="admin-profile-btn"
            onClick={() => setShowProfileDrawer(!showProfileDrawer)}
          >
            <div className="admin-profile-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </button>
          
          <button onClick={handleLogout} className="admin-logout-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-nav">
        <button
          className={`admin-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => handleTabChange('overview')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
          </svg>
          Overview
        </button>
        <button
          className={`admin-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => handleTabChange('users')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          Users
        </button>
        <button
          className={`admin-nav-btn ${activeTab === 'donors' ? 'active' : ''}`}
          onClick={() => handleTabChange('donors')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Donors
        </button>
        <button
          className={`admin-nav-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => handleTabChange('requests')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Requests
        </button>
        <button
          className={`admin-nav-btn ${activeTab === 'hospitals' ? 'active' : ''}`}
          onClick={() => handleTabChange('hospitals')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Hospitals
        </button>
        <button
          className={`admin-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabChange('settings')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Inventory
        </button>

      </div>

      <div className="admin-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'donors' && renderDonors()}
        {activeTab === 'requests' && renderRequests()}
        {activeTab === 'hospitals' && renderHospitals()}
                {activeTab === 'settings' && renderSettings()}
 
      </div>

      {/* Profile Sidebar Drawer */}
      {showProfileDrawer && (
        <div className="admin-profile-drawer-overlay" onClick={() => setShowProfileDrawer(false)}>
          <div className="admin-profile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="admin-profile-drawer-header">
              <h3>Admin Profile</h3>
              <button 
                className="admin-profile-drawer-close"
                onClick={() => setShowProfileDrawer(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="admin-profile-drawer-content">
              <div className="admin-profile-header">
                <div className="admin-profile-avatar">
                  <img src={adminProfile.avatar} alt="Admin Avatar" />
                </div>
                <div className="admin-profile-info">
                  <h2>{adminProfile.name}</h2>
                  <p className="admin-profile-role">{adminProfile.role}</p>
                  <p className="admin-profile-department">{adminProfile.department}</p>
                </div>
              </div>
              
              <div className="admin-profile-details">
                <div className="admin-profile-section">
                  <h4>Contact Information</h4>
                  <div className="admin-profile-grid">
                    <div className="admin-profile-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <label>Email</label>
                        <span>{adminProfile.email}</span>
                      </div>
                    </div>
                    <div className="admin-profile-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <label>Phone</label>
                        <span>{adminProfile.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="admin-profile-section">
                  <h4>Account Information</h4>
                  <div className="admin-profile-grid">
                    <div className="admin-profile-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <label>Last Login</label>
                        <span>{adminProfile.lastLogin}</span>
                      </div>
                    </div>
                    <div className="admin-profile-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <label>Account Status</label>
                        <span className="admin-status-active">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
                

              </div>
              
              <div className="admin-profile-actions">
                <button className="admin-profile-btn primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
                <button className="admin-profile-btn secondary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 