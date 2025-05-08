import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '/src/components/Hooks/UseAuth.jsx';
import LoadingSpinner from '/src/components/Common/LoadingSpinner'; // Import a loading spinner component

const ProtectedRoute = ({ 
  children, 
  adminOnly = false, 
  redirectTo = '/login', 
  loadingComponent = <LoadingSpinner /> 
}) => {
  const { user, isLoggedIn, isAdmin, loading } = useAuth();

  // Show loading state if authentication is being initialized
  if (loading) {
    return loadingComponent;
  }

  // Redirect conditions
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  // Check for admin-only routes
  if (adminOnly && !isAdmin()) {
    return <Navigate to="/not-authorized" replace />;
  }

  // Check if user exists (additional safeguard)
  if (!user) {
    console.warn('Auth state inconsistent: isLoggedIn true but user null');
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
  redirectTo: PropTypes.string,
  loadingComponent: PropTypes.element,
};

ProtectedRoute.defaultProps = {
  adminOnly: false,
  redirectTo: '/login',
  loadingComponent: <div className="flex items-center justify-center h-screen">Loading...</div>,
};

export default ProtectedRoute;