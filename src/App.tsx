import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import LoginScreen from './components/LoginScreen';
import AdminLoginScreen from './components/AdminLoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HospitalRegisterScreen from './components/HospitalRegisterScreen';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import BloodRequestPage from './components/BloodRequestPage';
import RequestsScreen from './components/RequestsScreen';
import ProfileScreen from './components/ProfileScreen';
import { Capacitor } from '@capacitor/core';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage on initial load
    const savedLoginState = localStorage.getItem('isLoggedIn');
    const savedMobile = localStorage.getItem('userMobile');
    console.log('App initialization - savedLoginState:', savedLoginState, 'savedMobile:', savedMobile);
    return savedLoginState === 'true' && savedMobile ? true : false;
  });
  const [userMobile, setUserMobile] = useState(() => {
    // Get saved mobile number from localStorage
    const savedMobile = localStorage.getItem('userMobile') || '';
    console.log('App initialization - userMobile:', savedMobile);
    return savedMobile;
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    // Check localStorage for admin login
    const savedAdminLoginState = localStorage.getItem('isAdminLoggedIn');
    const savedAdminUsername = localStorage.getItem('adminUsername');
    console.log('App initialization - savedAdminLoginState:', savedAdminLoginState, 'savedAdminUsername:', savedAdminUsername);
    return savedAdminLoginState === 'true' && savedAdminUsername ? true : false;
  });
  const [adminUsername, setAdminUsername] = useState(() => {
    // Get saved admin username from localStorage
    const savedAdminUsername = localStorage.getItem('adminUsername') || '';
    console.log('App initialization - adminUsername:', savedAdminUsername);
    return savedAdminUsername;
  });

  const isMobileEnvironment = (): boolean => {
    const platform = Capacitor.getPlatform();
    if (platform === 'ios' || platform === 'android') {
      return true;
    }
    const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const isCoarse = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
    return isMobileUA || isCoarse;
  };

  // Save login state to localStorage whenever it changes
  useEffect(() => {
    console.log('Login state changed - isLoggedIn:', isLoggedIn, 'userMobile:', userMobile);
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userMobile', userMobile);
      console.log('Saved to localStorage - isLoggedIn: true, userMobile:', userMobile);
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userMobile');
      console.log('Cleared localStorage');
    }
  }, [isLoggedIn, userMobile]);

  // Save admin login state to localStorage whenever it changes
  useEffect(() => {
    console.log('Admin login state changed - isAdminLoggedIn:', isAdminLoggedIn, 'adminUsername:', adminUsername);
    if (isAdminLoggedIn) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminUsername', adminUsername);
      console.log('Saved to localStorage - isAdminLoggedIn: true, adminUsername:', adminUsername);
    } else {
      localStorage.removeItem('isAdminLoggedIn');
      localStorage.removeItem('adminUsername');
      console.log('Cleared admin localStorage');
    }
  }, [isAdminLoggedIn, adminUsername]);

  // Auto-route based on environment: desktop web -> admin login, mobile/app -> user login
  useEffect(() => {
    if (!isLoggedIn && !isAdminLoggedIn && location.pathname === '/') {
      if (!isMobileEnvironment()) {
        navigate('/admin', { replace: true });
      }
    }
  }, [isLoggedIn, isAdminLoggedIn, location.pathname, navigate]);

  const handleLogin = (mobileNumber: string, otp: string) => {
    // In a real app, you would validate the OTP with your backend
    console.log('Login successful:', { mobileNumber, otp });
    setUserMobile(mobileNumber);
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    // Use React Router navigation instead of window.location
    navigate('/register');
  };

  const handleHospitalRegister = () => {
    // Use React Router navigation instead of window.location
    navigate('/hospital-register');
  };

  const handleRegisterSuccess = () => {
    // Use React Router navigation instead of window.location
    navigate('/');
  };

  const handleLogout = () => {
    console.log('Logout called');
    setIsLoggedIn(false);
    setUserMobile('');
  };

  const handleAdminLogin = (username: string, password: string) => {
    // In a real app, you would validate admin credentials with your backend
    console.log('Admin login successful:', { username, password });
    setAdminUsername(username);
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    console.log('Admin logout called');
    setIsAdminLoggedIn(false);
    setAdminUsername('');
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          isAdminLoggedIn ? (
            <AdminDashboard username={adminUsername} onLogout={handleAdminLogout} />
          ) : isLoggedIn ? (
            <Dashboard mobileNumber={userMobile} onLogout={handleLogout} />
          ) : (
            <LoginScreen onLogin={handleLogin} onRegister={handleRegister} onHospitalRegister={handleHospitalRegister} onAdminLogin={() => navigate('/admin')} />
          )
        } />
        <Route path="/admin" element={
          isAdminLoggedIn ? (
            <AdminDashboard username={adminUsername} onLogout={handleAdminLogout} />
          ) : (
            <AdminLoginScreen onAdminLogin={handleAdminLogin} onBackToUserLogin={() => navigate('/')} />
          )
        } />
        <Route path="/register" element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterScreen 
              onBackToLogin={() => navigate('/')}
              onRegisterSuccess={handleRegisterSuccess}
            />
          )
        } />
        <Route path="/hospital-register" element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <HospitalRegisterScreen 
              onBackToLogin={() => navigate('/')}
              onRegisterSuccess={handleRegisterSuccess}
            />
          )
        } />
        <Route path="/blood-request" element={
          isLoggedIn ? (
            <BloodRequestPage 
              onBackToDashboard={() => navigate(-1)}
              onRequestSuccess={() => {
                alert('Blood request submitted successfully!');
                navigate(-1);
              }}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />
        <Route path="/requests" element={
          isLoggedIn ? (
            <RequestsScreen />
          ) : (
            <Navigate to="/" replace />
          )
        } />
        <Route path="/profile" element={
          isLoggedIn ? (
            <ProfileScreen mobileNumber={userMobile} onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
