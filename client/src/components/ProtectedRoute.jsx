// client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait until loading is complete to avoid redirect flicker
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900">Loading...</div>;
  }

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the protected component
  return children;
};

export default ProtectedRoute;