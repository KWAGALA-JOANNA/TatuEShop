import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StatCard = ({ title, value, change, icon }) => {
  const theme = useTheme();
  const isPositive = change >= 0;
  
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        height: '100%'
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography variant="h4" sx={{ mr: 1 }}>
          {value}
        </Typography>
        <Typography variant="h5">
          {icon}
        </Typography>
      </Box>
      {change !== undefined && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mt: 1,
          color: isPositive ? theme.palette.success.main : theme.palette.error.main
        }}>
          {isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            {Math.abs(change)}% {isPositive ? 'increase' : 'decrease'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.number,
  icon: PropTypes.string
};

export default StatCard;