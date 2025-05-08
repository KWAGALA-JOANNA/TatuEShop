import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../Theme/ThemeProvider";

const CartPage = () => {
  const { theme } = useContext(ThemeContext);
  // In a real app, you would fetch cart items from context or API
  const cartItems = [];
  const total = 0;

  return (
    <div className={`min-h-screen p-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl mb-4">Your cart is empty</p>
            <NavLink
              to="/shop"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
            >
              Continue Shopping
            </NavLink>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-6 border-b pb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">${item.price}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        className="w-20 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                      <button className="text-red-500 hover:text-red-600">
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-xl font-semibold">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold">Subtotal:</span>
                <span className="text-xl font-semibold">${total}</span>
              </div>
              <div className="grid gap-4">
                <NavLink
                  to="/checkout"
                  className="bg-blue-500 text-white py-3 text-center rounded hover:bg-blue-600 transition-colors"
                >
                  Proceed to Checkout
                </NavLink>
                <NavLink
                  to="/shop"
                  className="bg-gray-200 dark:bg-gray-700 py-3 text-center rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Continue Shopping
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;