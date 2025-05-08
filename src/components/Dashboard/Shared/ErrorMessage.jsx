import PropTypes from 'prop-types';
import { Alert, Box, Button, Typography } from '@mui/material';

const ErrorMessage = ({ 
  message, 
  severity, 
  onRetry, 
  retryText, 
  fullScreen 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 3,
        ...(fullScreen && {
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          bgcolor: 'background.default',
          zIndex: 9999
        })
      }}
    >
      <Alert severity={severity} sx={{ mb: 2 }}>
        <Typography variant="body1" component="div">
          {message}
        </Typography>
      </Alert>
      
      {onRetry && (
        <Button 
          variant="contained" 
          color={severity} 
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          {retryText}
        </Button>
      )}
    </Box>
  );
};

ErrorMessage.propTypes = {
  /** The error message to display */
  message: PropTypes.string.isRequired,
  /** The severity level (color and icon) */
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  /** Function to call when retry button is clicked */
  onRetry: PropTypes.func,
  /** Text for the retry button */
  retryText: PropTypes.string,
  /** Whether to display full screen overlay */
  fullScreen: PropTypes.bool,
};

ErrorMessage.defaultProps = {
  severity: 'error',
  retryText: 'Try Again',
  fullScreen: false,
};

export default ErrorMessage;