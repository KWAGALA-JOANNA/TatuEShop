
import PropTypes from 'prop-types';

const RecentOrderRow = ({ id, customer, date, amount, status }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="border-b hover:bg-gray-100 transition-colors duration-200">
      <td className="py-3 px-4 text-blue-600 font-medium">{id}</td>
      <td className="py-3 px-4 text-gray-700 font-medium">{customer}</td>
      <td className="py-3 px-4 text-gray-500">{date}</td>
      <td className="py-3 px-4 text-gray-800 font-semibold">{amount}</td>
      <td className="py-3 px-4">
        <span 
          className={`px-2 py-1 text-xs rounded-full transition-colors duration-200 ${getStatusClass(status)}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>
    </tr>
  );
};

RecentOrderRow.propTypes = {
  id: PropTypes.string.isRequired,
  customer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default RecentOrderRow;
