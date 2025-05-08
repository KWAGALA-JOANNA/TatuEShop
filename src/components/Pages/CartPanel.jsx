// components/Cart/CartPanel.jsx
import { useContext } from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { ThemeContext } from "../../Theme/ThemeProvider";

const CartPanel = ({ isOpen, onClose, cartItems, total }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } shadow-xl`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:text-blue-500 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <p className="font-medium">${item.price * item.quantity}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-semibold">${total}</span>
            </div>
            <NavLink
              to="/cart"
              onClick={onClose}
              className="block w-full text-center bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors"
            >
              View Full Cart
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
CartPanel.propTypes = {
    /** Controls visibility of the cart panel */
    isOpen: PropTypes.bool.isRequired,
    /** Callback function to close the cart panel */
    onClose: PropTypes.func.isRequired,
    /** Array of cart items with required properties */
    cartItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    /** Total amount of all items in cart */
    total: PropTypes.number.isRequired,
  };
  

export default CartPanel;