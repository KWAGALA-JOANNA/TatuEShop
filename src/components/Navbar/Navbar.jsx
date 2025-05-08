import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { ThemeContext } from "../../Theme/ThemeProvider";
import { useAuth } from "../Hooks/UseAuth";
import Searchbar from "./SearchBar";
import logo from "../../assets/tatu-logo.png";

// Categories data
const categories = [
  {
    name: "Sports",
    subcategories: [
      {
        name: "Football",
        image: "/images/football.jpg",
        path: "/football",
      },
      {
        name: "Basketball",
        image: "/images/football.jpg",
        path: "/basketball",
      },
      {
        name: "Volleyball",
        image: "/images/basketball.jpg",
        path: "/volleyball",
      },
      {
        name: "Tennis",
        image: "/images/tennis.jpg",
        path: "/tennis",
      },
      {
        name: "Swimming",
        image: "/images/swimming.jpg",
        path: "/swimming",
      },
      {
        name: "Cycling",
        image: "/images/cycling.jpg",
        path: "/cycling",
      },
    ],
  },
  {
    name: "Fashion",
    subcategories: [
      {
        name: "Men's Wear",
        image: "/images/menswear.jpg",
        path: "/MensWear",
      },
      {
        name: "Women's Wear",
        image: "/images/womenswear.jpg",
        path: "/WomensWear",
      },
      {
        name: "Footwear",
        image: "/images/footwear.jpg",
        path: "/Footwear",
      },
      {
        name: "Accessories",
        image: "/images/accessories.jpg",
        path: "/Accessories",
      },
    ],
  },
  {
    name: "Health",
    subcategories: [
      {
        name: "Fitness",
        image: "/images/fitness.jpg",
        path: "/Fitness",
      },
      {
        name: "Nutrition",
        image: "/images/nutrition.jpg",
        path: "/Nutrition",
      },
      {
        name: "Mental Health",
        image: "/images/mentalhealth.jpg",
        path: "/MentalHealth",
      },
      {
        name: "Medical Supplies",
        image: "/images/medicalsupplies.jpg",
        path: "/MedicalSupplies",
      },
    ],
  },
  {
    name: "Electronics",
    subcategories: [
      {
        name: "Mobile Phones",
        image: "/images/mobilephones.jpg",
        path: "/MobilePhones",
      },
      {
        name: "Laptops",
        image: "/images/laptop.jpg",
        path: "/Laptops",
      },
      {
        name: "Cameras",
        image: "/images/cameras.jpg",
        path: "/Cameras",
      },
      {
        name: "Audio Devices",
        image: "/images/audiodevices.jpg",
        path: "/AudioDevices",
      },
    ],
  },
  {
    name: "Kitchenware",
    subcategories: [
      {
        name: "Cookingware",
        image: "/images/cookingware.jpg",
        path: "/cookingware",
      },
      {
        name: "Utensils",
        image: "/images/utensils.jpg",
        path: "/utensils",
      },
      {
        name: "Appliances",
        image: "/images/appliances.jpg",
        path: "/appliances",
      },
      {
        name: "Storage",
        image: "/images/storage.jpg",
        path: "/storage",
      },
    ],
  },
  {
    name: "Furniture",
    subcategories: [
      { name: "Sofas", image: "/images/sofas.jpg", path: "/sofas" },
      {
        name: "Tables",
        image: "/images/tables.jpg",
        path: "/tables",
      },
      {
        name: "Chairs",
        image: "/images/chairs.jpg",
        path: "/chairs",
      },
      { name: "Beds", image: "/images/beds.jpg", path: "/beds" },
      {
        name: "Cabinets",
        image: "/images/cabinets.jpg",
        path: "/cabinets",
      },
    ],
  },
];

const CategoryAccordion = ({ category, isExpanded, onToggle, onClick, theme }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className={`w-full py-3 px-4 flex justify-between items-center ${
          theme === "dark" ? "hover:bg-blue-800" : "hover:bg-blue-100"
        } transition-colors`}
        onClick={() => onToggle(category.name)}
      >
        <span className="font-medium">{category.name}</span>
        <span className="transform transition-transform duration-200">
          {isExpanded ? "▲" : "▼"}
        </span>
      </button>
      {isExpanded && (
        <div className="py-2 px-4">
          <div className="grid grid-cols-1 gap-3">
            {category.subcategories.map((sub, idx) => (
              <NavLink
                key={idx}
                to={sub.path}
                className="flex items-center space-x-3 p-2 rounded hover:bg-blue-800/50 transition-colors"
                onClick={() => onClick()}
              >
                <div className="w-10 h-10 overflow-hidden rounded">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/40";
                    }}
                  />
                </div>
                <span className="text-sm">{sub.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

CategoryAccordion.propTypes = {
  category: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
};

const Navbar = ({
  mobileBreakpoint = "md",
  onCartClick,
  onThemeToggle,
  onMenuToggle,
  className = "",
  logo: customLogo,
  cartItemsCount: initialCartCount = 0,
}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(initialCartCount);
  const [categoriesDrawerOpen, setCategoriesDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState("");
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();

  useEffect(() => {
    const validBreakpoints = ["xs", "sm", "md", "lg", "xl"];
    if (!validBreakpoints.includes(mobileBreakpoint)) {
      console.warn(
        `Invalid mobileBreakpoint prop: ${mobileBreakpoint}. Valid values are: ${validBreakpoints.join(", ")}`
      );
    }
  }, [mobileBreakpoint]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const drawer = document.getElementById("categories-drawer");
      
      if (
        categoriesDrawerOpen &&
        drawer &&
        !drawer.contains(event.target) &&
        !event.target.closest(".categories-trigger")
      ) {
        setCategoriesDrawerOpen(false);
      }
      
      if (
        showSignupOptions &&
        !event.target.closest(".signup-options")
      ) {
        setShowSignupOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [categoriesDrawerOpen, showSignupOptions]);

  useEffect(() => {
    if (isLoggedIn && user) {
      const mockCartItems = user.cart?.length || 0;
      setCartItemsCount(mockCartItems);
    } else {
      setCartItemsCount(0);
    }
  }, [isLoggedIn, user]);

  const handleCartClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    setIsCartPanelOpen(true);
    onCartClick?.(true);
  };

  const closeCartPanel = () => setIsCartPanelOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSignupOption = (option) => {
    setShowSignupOptions(false);
    setMenuOpen(false);
    if (option === "customer") {
      navigate("/register");
    } else if (option === "supplier") {
      navigate("/supplier-form");
    }
  };

  const handleToggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    onMenuToggle?.(newMenuState);
    if (newMenuState === false) {
      setCategoriesDrawerOpen(false);
    }
  };

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    toggleTheme();
    onThemeToggle?.(newTheme);
  };

  const toggleCategoryAccordion = (categoryName) => {
    setExpandedCategory(expandedCategory === categoryName ? "" : categoryName);
  };

  const handleCategoryClick = () => {
    setCategoriesDrawerOpen(false);
    setMenuOpen(false);
  };

  const CartIcon = ({ mobile = false }) => {
    return (
      <div
        className={`relative ${
          mobile ? `flex ${mobileBreakpoint}:hidden` : `hidden ${mobileBreakpoint}:flex`
        }`}
      >
        <button
          onClick={handleCartClick}
          className="hover:text-blue-500 transition-colors"
          aria-label="Cart"
        >
          <FaShoppingCart size={20} />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>
    );
  };

  CartIcon.propTypes = {
    mobile: PropTypes.bool,
  };

  return (
    <nav
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } shadow-md fixed w-full top-0 left-0 z-50 ${className}`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggleMenu}
            className={`${mobileBreakpoint}:hidden mr-2`}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <FaTimes size={24} className="text-gray-500 hover:text-blue-500" />
            ) : (
              <FaBars size={24} className="text-gray-500 hover:text-blue-500" />
            )}
          </button>

          <NavLink
            to="/"
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            {typeof customLogo === "string" ? (
              <img
                src={customLogo || logo}
                alt="TatuEshop Logo"
                className="h-9 w-9 object-contain"
              />
            ) : (
              customLogo || (
                <img
                  src={logo}
                  alt="TatuEshop Logo"
                  className="h-9 w-9 object-contain"
                />
              )
            )}
            <span className="text-2xl font-bold hidden sm:inline-block">
              Tatu<span className="text-blue-500">Eshop</span>
            </span>
          </NavLink>
        </div>

        <div className={`hidden ${mobileBreakpoint}:flex flex-1 max-w-xl mx-4`}>
          <Searchbar />
        </div>

        <ul className={`hidden ${mobileBreakpoint}:flex space-x-6 font-medium`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-blue-500 transition-colors ${
                  isActive ? "text-blue-500 font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `hover:text-blue-500 transition-colors ${
                  isActive ? "text-blue-500 font-semibold" : ""
                }`
              }
            >
              Shop
            </NavLink>
          </li>
          <li className="relative categories-trigger">
            <button
              onClick={() => setCategoriesDrawerOpen(!categoriesDrawerOpen)}
              className={`hover:text-blue-500 transition-colors flex items-center ${
                categoriesDrawerOpen ? "text-blue-500 font-semibold" : ""
              }`}
            >
              <span>Categories</span>
              <span className="ml-1">{categoriesDrawerOpen ? "▲" : "▼"}</span>
            </button>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-blue-500 transition-colors ${
                  isActive ? "text-blue-500 font-semibold" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <div className={`hidden ${mobileBreakpoint}:flex items-center space-x-5`}>
          <CartIcon />
          
          <button
            onClick={handleToggleTheme}
            className="p-1 hover:text-blue-500 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/profile"
                className="hover:text-blue-500 transition-colors"
              >
                <FaUser size={18} />
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-blue-500 transition-colors ${
                    isActive ? "text-blue-500 font-semibold" : ""
                  }`
                }
              >
                Login
              </NavLink>

              <div className="relative signup-options">
                <button
                  onClick={() => setShowSignupOptions(!showSignupOptions)}
                  className="hover:text-blue-500 transition-colors"
                >
                  Signup
                </button>

                {showSignupOptions && (
                  <div
                    className={`absolute top-8 right-0 w-32 ${
                      theme === "dark" ? "bg-gray-700" : "bg-white"
                    } border ${
                      theme === "dark" ? "border-gray-600" : "border-gray-200"
                    } rounded-lg shadow-lg z-50 overflow-hidden`}
                  >
                    <button
                      onClick={() => handleSignupOption("customer")}
                      className={`block w-full px-4 py-2 text-left ${
                        theme === "dark"
                          ? "hover:bg-gray-600 text-white"
                          : "hover:bg-gray-100 text-gray-800"
                      } transition-colors`}
                    >
                      Customer
                    </button>
                    <button
                      onClick={() => handleSignupOption("supplier")}
                      className={`block w-full px-4 py-2 text-left ${
                        theme === "dark"
                          ? "hover:bg-gray-600 text-white"
                          : "hover:bg-gray-100 text-gray-800"
                      } transition-colors`}
                    >
                      Supplier
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <CartIcon mobile />
      </div>

      {menuOpen && (
        <div
          className={`${mobileBreakpoint}:hidden ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } shadow-lg border-t ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="px-4 py-3">
            <Searchbar isMobile />
          </div>

          <ul className="flex flex-col py-2">
            <li>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 ${
                    isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
                  } transition-colors`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 ${
                    isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
                  } transition-colors`
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => setCategoriesDrawerOpen(!categoriesDrawerOpen)}
                className={`w-full text-left px-4 py-3 flex justify-between items-center ${
                  categoriesDrawerOpen ? "text-blue-500 font-semibold" : "hover:text-blue-500"
                } transition-colors`}
              >
                <span>Categories</span>
                <span>{categoriesDrawerOpen ? "▲" : "▼"}</span>
              </button>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 ${
                    isActive ? "text-blue-500 font-semibold" : "hover:text-blue-500"
                  } transition-colors`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={handleToggleTheme}
                className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
              >
                {theme === "dark" ? (
                  <>
                    <FaSun size={18} />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon size={18} />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <NavLink
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-blue-500 transition-colors flex items-center space-x-1"
                  >
                    <FaUser size={16} />
                    <span>Profile</span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `hover:text-blue-500 transition-colors ${
                        isActive ? "text-blue-500 font-semibold" : ""
                      }`
                    }
                  >
                    Login
                  </NavLink>

                  <div className="relative signup-options">
                    <button
                      onClick={() => setShowSignupOptions(!showSignupOptions)}
                      className="hover:text-blue-500 transition-colors"
                    >
                      Signup
                    </button>

                    {showSignupOptions && (
                      <div
                        className={`absolute top-8 right-0 w-32 ${
                          theme === "dark" ? "bg-gray-700" : "bg-white"
                        } border ${
                          theme === "dark" ? "border-gray-600" : "border-gray-200"
                        } rounded-lg shadow-lg z-50 overflow-hidden`}
                      >
                        <button
                          onClick={() => handleSignupOption("customer")}
                          className={`block w-full px-4 py-2 text-left ${
                            theme === "dark"
                              ? "hover:bg-gray-600 text-white"
                              : "hover:bg-gray-100 text-gray-800"
                          } transition-colors`}
                        >
                          Customer
                        </button>
                        <button
                          onClick={() => handleSignupOption("supplier")}
                          className={`block w-full px-4 py-2 text-left ${
                            theme === "dark"
                              ? "hover:bg-gray-600 text-white"
                              : "hover:bg-gray-100 text-gray-800"
                          } transition-colors`}
                        >
                          Supplier
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {categoriesDrawerOpen && (
        <div
          id="categories-drawer"
          className={`fixed inset-0 z-40 ${mobileBreakpoint}:absolute ${mobileBreakpoint}:inset-auto ${mobileBreakpoint}:top-full ${mobileBreakpoint}:left-0 ${mobileBreakpoint}:right-0`}
        >
          <div className={`absolute inset-0 bg-black bg-opacity-50 ${mobileBreakpoint}:hidden`}></div>
          
          <div 
            className={`absolute top-0 left-0 w-full h-full max-w-xs overflow-y-auto shadow-xl transition-transform duration-300 ease-in-out transform translate-x-0
            bg-gray-900 text-white
            ${mobileBreakpoint}:top-0 ${mobileBreakpoint}:h-auto ${mobileBreakpoint}:max-h-96 ${mobileBreakpoint}:mx-auto ${mobileBreakpoint}:max-w-4xl ${mobileBreakpoint}:rounded-b-lg`}
          >
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium">Categories</h3>
              <button
                onClick={() => setCategoriesDrawerOpen(false)}
                className="p-1 hover:text-gray-300 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="p-2">
              {categories.map((category, index) => (
                <CategoryAccordion
                  key={index}
                  category={category}
                  isExpanded={expandedCategory === category.name}
                  onToggle={toggleCategoryAccordion}
                  onClick={handleCategoryClick}
                  theme="dark"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <CartPanel
        isOpen={isCartPanelOpen}
        onClose={closeCartPanel}
        cartItems={[]}
        total={0}
      />
    </nav>
  );
};

Navbar.propTypes = {
  mobileBreakpoint: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  onCartClick: PropTypes.func,
  onThemeToggle: PropTypes.func,
  onMenuToggle: PropTypes.func,
  className: PropTypes.string,
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  cartItemsCount: PropTypes.number,
};

Navbar.defaultProps = {
  mobileBreakpoint: "md",
  cartItemsCount: 0,
};

export default Navbar;