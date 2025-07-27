import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import Dashboard from './components/Dashboard';
import BloodRequestPage from './components/BloodRequestPage';
import RequestsScreen from './components/RequestsScreen';
import ProfileScreen from './components/ProfileScreen';

function App() {
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

  const handleLogin = (mobileNumber: string, otp: string) => {
    // In a real app, you would validate the OTP with your backend
    console.log('Login successful:', { mobileNumber, otp });
    setUserMobile(mobileNumber);
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    // This will now navigate to the register route
    window.location.href = '/register';
  };

  const handleRegisterSuccess = () => {
    // Redirect to login after successful registration
    window.location.href = '/';
  };

  const handleLogout = () => {
    console.log('Logout called');
    setIsLoggedIn(false);
    setUserMobile('');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            isLoggedIn ? (
              <Dashboard mobileNumber={userMobile} onLogout={handleLogout} />
            ) : (
              <LoginScreen onLogin={handleLogin} onRegister={handleRegister} />
            )
          } />
          <Route path="/register" element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterScreen 
                onBackToLogin={() => window.location.href = '/'}
                onRegisterSuccess={handleRegisterSuccess}
              />
            )
          } />
          <Route path="/blood-request" element={
            isLoggedIn ? (
              <BloodRequestPage 
                onBackToDashboard={() => window.history.back()}
                onRequestSuccess={() => {
                  alert('Blood request submitted successfully!');
                  window.history.back();
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
    </Router>
  );
}

export default App;
