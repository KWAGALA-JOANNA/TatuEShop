import PropTypes from 'prop-types';
import { useSuppliers } from '../../hooks/useSuppliers';
import { useState } from 'react';


const NewSupplierCard = ({ supplier }) => {
  const { id, name, products, status: initialStatus } = supplier;
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const { approve, reject } = useSuppliers();
  
  const handleApprove = async () => {
    try {
      setIsLoading(true);
      await approve(id);
      setStatus('approved');
    } catch (error) {
      console.error('Error approving supplier:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsLoading(true);
      await reject(id);
      setStatus('rejected');
    } catch (error) {
      console.error('Error rejecting supplier:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between border-b pb-4 transition-transform transform hover:scale-105">
      <div>
        <h3 className="font-medium text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm">{products} products</p>
      </div>
      {status === 'pending' ? (
        <div className="flex space-x-2">
          <button 
            onClick={handleApprove}
            disabled={isLoading}
            className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded text-sm disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Loading...' : 'Approve'}
          </button>
          <button 
            onClick={handleReject}
            disabled={isLoading}
            className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded text-sm disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Loading...' : 'Reject'}
          </button>
        </div>
      ) : (
        <span 
          className={`px-2 py-1 text-xs rounded-full transition-colors
            ${status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )}
    </div>
  );
};

// Define PropTypes for the component
NewSupplierCard.propTypes = {
  supplier: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    products: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};

export default NewSupplierCard;
