import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-gray-900">
          Tatu<span className="text-blue-500">Eshop</span>
        </NavLink>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-lg">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none w-64 text-gray-700 px-2"
          />
          <FaSearch className="text-gray-500" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><NavLink to="/" className="hover:text-blue-500">Home</NavLink></li>
          <li><NavLink to="/shop" className="hover:text-blue-500">Shop</NavLink></li>
          <li><NavLink to="/categories" className="hover:text-blue-500">Categories</NavLink></li>
          <li><NavLink to="/contact" className="hover:text-blue-500">Contact</NavLink></li>
        </ul>

        {/* Icons */}
        <div className="hidden md:flex space-x-4">
          <NavLink to="/cart" className="relative text-gray-700">
            <FaShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
          </NavLink>
          <NavLink to="/profile" className="text-gray-700">
            <FaUser size={22} />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col text-gray-700 text-center py-4">
            <li><NavLink to="/" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">Home</NavLink></li>
            <li><NavLink to="/shop" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">Shop</NavLink></li>
            <li><NavLink to="/categories" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">Categories</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-500">Contact</NavLink></li>
          </ul>
          <div className="flex justify-center space-x-6 py-3">
            <NavLink to="/cart" onClick={() => setMenuOpen(false)} className="text-gray-700"><FaShoppingCart size={22} /></NavLink>
            <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="text-gray-700"><FaUser size={22} /></NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
