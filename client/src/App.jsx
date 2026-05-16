import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import CourseMapper from './components/CourseMapper';
import CollegeDirectory from './components/CollegeDirectory';
import Timeline from './components/Timeline';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                },
              }}
            />
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
                <Route path="/courses" element={<ProtectedRoute><CourseMapper /></ProtectedRoute>} />
                <Route path="/colleges" element={<CollegeDirectory />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
            <Footer />
            <AIChatbot />
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;