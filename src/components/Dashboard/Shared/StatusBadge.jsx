import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

const statusColors = {
  pending: {
    color: '#FFA500', // Orange
    backgroundColor: '#FFF3E0', // Light orange
  },
  approved: {
    color: '#2E7D32', // Dark green
    backgroundColor: '#E8F5E9', // Light green
  },
  rejected: {
    color: '#C62828', // Dark red
    backgroundColor: '#FFEBEE', // Light red
  },
  active: {
    color: '#1565C0', // Dark blue
    backgroundColor: '#E3F2FD', // Light blue
  },
  inactive: {
    color: '#424242', // Dark gray
    backgroundColor: '#EEEEEE', // Light gray
  },
  default: {
    color: '#9E9E9E', // Medium gray
    backgroundColor: '#FAFAFA', // Very light gray
  },
};

const StatusBadge = ({ status, size = 'medium' }) => {
  const statusConfig = statusColors[status.toLowerCase()] || statusColors.default;

  return (
    <Chip
      label={status}
      size={size}
      sx={{
        color: statusConfig.color,
        backgroundColor: statusConfig.backgroundColor,
        fontWeight: 500,
        textTransform: 'capitalize',
        border: `1px solid ${statusConfig.color}`,
      }}
    />
  );
};

StatusBadge.propTypes = {
  /** The status text to display */
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      'pending',
      'approved',
      'rejected',
      'active',
      'inactive',
    ]),
  ]).isRequired,
  
  /** The size of the badge */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

StatusBadge.defaultProps = {
  size: 'medium',
};

export default StatusBadge;