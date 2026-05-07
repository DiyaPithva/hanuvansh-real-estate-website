import { Navigate } from 'react-router-dom';

// Feature: hanuvansh-mern-estate
// ProtectedRoute: guards admin routes by checking for a valid adminToken in localStorage.
// Requirements: 15.4

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
