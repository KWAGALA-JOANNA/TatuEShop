import PropTypes from 'prop-types';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingSpinner = ({ message, size, thickness, color }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2
      }}
    >
      <CircularProgress 
        size={size}
        thickness={thickness}
        sx={{ color }}
      />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

LoadingSpinner.propTypes = {
  /** Message to display below the spinner */
  message: PropTypes.string,
  /** Size of the spinner in pixels */
  size: PropTypes.number,
  /** Thickness of the spinner circle */
  thickness: PropTypes.number,
  /** Color of the spinner */
  color: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  message: '',
  size: 80,
  thickness: 4,
  color: 'primary.main',
};

export default LoadingSpinner;