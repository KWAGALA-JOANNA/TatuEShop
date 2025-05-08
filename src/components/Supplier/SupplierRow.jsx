import PropTypes from 'prop-types';

const SupplierRow = ({ supplier, onApprove, onReject }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{supplier.name}</div>
      </td>
      {/* Add other cells here */}
      
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {supplier.status === 'pending' ? (
          <div className="flex space-x-2">
            <button
              onClick={() => onApprove(supplier.id)}
              className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => onReject(supplier.id)}
              className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded"
            >
              View
            </button>
            <button
              className="text-yellow-600 hover:text-yellow-900 bg-yellow-50 px-3 py-1 rounded"
            >
              Edit
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

SupplierRow.propTypes = {
  supplier: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default SupplierRow;
