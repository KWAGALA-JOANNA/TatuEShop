import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SidebarLink = ({ Icon, label, to, active, onClick }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors duration-200 ${
        active ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {Icon && (
        <Icon className={`${active ? 'text-purple-700' : 'text-gray-500'} w-5 h-5`} />
      )}
      <span className="ml-3 font-medium">{label}</span>
    </Link>
  );
};

// Define PropTypes for the component
SidebarLink.propTypes = {
  Icon: PropTypes.elementType, // Changed from icon string to Icon component
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SidebarLink;