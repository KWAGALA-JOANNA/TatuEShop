
import PropTypes from 'prop-types';

const StatCard = ({ icon, title, value, trend, trendUp, color }) => {
  const colors = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-500' },
    green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-500' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-500' },
    red: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500' }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 transition-transform transform hover-scale-105">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <div className={`mt-2 ${trendUp ? 'text-green-500' : 'text-red-500'} text-sm flex items-center`}>
            <i className={`fas fa-arrow-${trendUp ? 'up' : 'down'} mr-1`}></i>
            {trend}
          </div>
        </div>
        <div className={`w-12 h-12 ${colors[color]?.bg} rounded-lg flex items-center justify-center`}>
          <i className={`fas fa-${icon} ${colors[color]?.icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the component
StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trendUp: PropTypes.bool.isRequired,
  color: PropTypes.oneOf(['blue', 'green', 'purple', 'red']).isRequired,
};

export default StatCard;
