import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, BookOpen, MapPin, Calendar, BarChart3, Home, Moon, Sun, Bot } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUser();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'CareerSync Interest Mapper', href: '/quiz', icon: BarChart3 },
    { name: 'Course Mapper', href: '/courses', icon: BookOpen },
    { name: 'Colleges', href: '/colleges', icon: MapPin },
    { name: 'Timeline', href: '/timeline', icon: Calendar },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <BookOpen className="logo-svg" />
            </div>
            <span className="logo-text">CareerSync</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
            </button>

            {/* AI Chatbot Toggle */}
            {/* <button
              className="ai-chat-toggle"
              aria-label="Open AI Chatbot"
              onClick={() => {
                const chatbot = document.querySelector('.ai-chatbot');
                if (chatbot) {
                  chatbot.classList.toggle('active');
                }
              }}
            >
              <Bot className="ai-icon" />
            </button> */}

            {/* User Menu */}
            <div className="navbar-user">
              {isAuthenticated ? (
                <div className="user-menu">
                  <Link to="/profile" className="user-profile">
                    <User className="user-icon" />
                    <span className="user-name">{user?.fullname || user?.name || 'Student'}</span>
                  </Link>
                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="login-btn">
                    Login
                  </Link>
                  <Link to="/signup" className="signup-btn">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`mobile-nav-link ${isActive(item.href) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="mobile-nav-icon" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="mobile-user-section">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="mobile-nav-icon" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="mobile-logout-btn"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="mobile-nav-icon" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="mobile-nav-icon" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`

        .container{
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: var(--navbar-bg);
          border-bottom: 1px solid var(--border-color);
          z-index: 1000;
          box-shadow: 0 1px 12px rgba(0,0,0,0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-left: 0;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.5rem;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 12px;
          display: flex;
          align-items: center;
          margin-left: 5px;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
          transition: transform 0.3s ease;
        }

        .navbar-logo:hover .logo-icon {
          transform: scale(1.08);
        }

        .logo-svg {
          width: 24px;
          height: 24px;
          color: white;
        }

        .logo-text {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.02em;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          border-radius: 0.75rem;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-link:hover {
          color: var(--primary-color);
          background: var(--hover-bg);
        }

        .nav-link.active {
          color: var(--primary-color);
          background: var(--active-bg);
        }

        .nav-icon {
          width: 18px;
          height: 18px;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle {
          width: 40px;
          height: 40px;
          border: none;
          background: var(--card-bg);
          color: var(--text-secondary);
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .theme-toggle:hover {
          background: var(--hover-bg);
          color: var(--primary-color);
        }

        .theme-icon {
          width: 20px;
          height: 20px;
        }

        .ai-chat-toggle {
          width: 40px;
          height: 40px;
          border: none;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .ai-chat-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .ai-icon {
          width: 20px;
          height: 20px;
        }

        .navbar-user {
          display: flex;
          align-items: center;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: var(--text-primary);
          background: var(--card-bg);
          border-radius: 0.75rem;
          transition: all 0.2s ease;
        }

        .user-profile:hover {
          background: var(--hover-bg);
        }

        .user-icon {
          width: 18px;
          height: 18px;
        }

        .user-name {
          font-weight: 500;
        }

        .logout-btn {
          padding: 0.5rem 1rem;
          background: var(--danger-color);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: var(--danger-hover);
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .login-btn {
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .login-btn:hover {
          color: var(--primary-color);
          background: var(--hover-bg);
        }

        .signup-btn {
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: white;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          font-weight: 600;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
        }

        .signup-btn:hover {
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-primary);
          padding: 0.5rem;
        }

        .mobile-nav {
          display: none;
          flex-direction: column;
          padding: 1rem 0;
          border-top: 1px solid var(--border-color);
          background: var(--navbar-bg);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover {
          color: var(--primary-color);
          background: var(--hover-bg);
        }

        .mobile-nav-link.active {
          color: var(--primary-color);
          background: var(--active-bg);
        }

        .mobile-nav-icon {
          width: 20px;
          height: 20px;
        }

        .mobile-user-section {
          border-top: 1px solid var(--border-color);
          margin-top: 0.5rem;
          padding-top: 0.5rem;
        }

        .mobile-logout-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--danger-color);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-nav {
            display: flex;
          }

          .navbar-actions {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;