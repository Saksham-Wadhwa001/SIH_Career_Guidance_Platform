import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();
  const location = useLocation();

  // While checking auth state, show a loading spinner
  if (loading) {
    return (
      <div className="protected-loading">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login and remember where user wanted to go
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
