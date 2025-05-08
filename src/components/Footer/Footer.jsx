import { Link } from "react-router-dom";
import { useContext } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from "react-icons/fa";
import { ThemeContext } from "../../Theme/ThemeProvider"; // Import ThemeContext

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useContext(ThemeContext); // Access theme

  return (
    <footer className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-900 text-white"} pt-12 pb-6`}>
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Tatu<span className="text-blue-500">Eshop</span>
            </h3>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-400"} mb-4`}>
              Your one-stop shop for high-quality products at affordable prices. We strive to provide the best shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>Home</Link>
              </li>
              <li>
                <Link to="/shop" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>Shop</Link>
              </li>
              <li>
                <Link to="/categories" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>Categories</Link>
              </li>
              <li>
                <Link to="/contact" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>Contact Us</Link>
              </li>
              <li>
                <Link to="/about" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>About Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/terms" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"}`}>Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-400"} mb-4`}>
              Subscribe to receive updates on new arrivals and special offers.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`px-4 py-2 w-full rounded-l-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"} focus:outline-none`}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-lg text-white"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div>
              <h4 className="text-sm font-medium mb-2">Payment Methods</h4>
              <div className="flex space-x-3">
                <FaCreditCard size={20} className={`${theme === "dark" ? "text-gray-300" : "text-gray-400"}`} />
                <FaPaypal size={20} className={`${theme === "dark" ? "text-gray-300" : "text-gray-400"}`} />
                <FaApplePay size={20} className={`${theme === "dark" ? "text-gray-300" : "text-gray-400"}`} />
                <FaGooglePay size={20} className={`${theme === "dark" ? "text-gray-300" : "text-gray-400"}`} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <hr className={`${theme === "dark" ? "border-gray-700" : "border-gray-800"} my-6`} />
        
        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-400"} text-sm`}>
            &copy; {currentYear} TatuEshop. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/terms" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"} text-sm mx-2`}>Terms</Link>
            <Link to="/privacy" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"} text-sm mx-2`}>Privacy</Link>
            <Link to="/sitemap" className={`${theme === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-400 hover:text-blue-500"} text-sm mx-2`}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;