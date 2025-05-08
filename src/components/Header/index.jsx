import { useState, useContext } from 'react';
import { ThemeContext } from "../../Theme/ThemeProvider.jsx";
import { FaQuestionCircle, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Swahili' },
    { code: 'lg', name: 'Luganda' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  ];

  return (
    <header className={`
      fixed top-0 left-0 w-full 
      ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-700'} 
      py-2 text-sm shadow-md z-50
    `}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left side - Help and Order Tracking */}
        <div className="flex space-x-4">
          <a href="/help" className="flex items-center hover:text-blue-500 transition-colors">
            <FaQuestionCircle className="mr-1" />
            Help Center
          </a>
          <a href="/track-order" className="flex items-center hover:text-blue-500 transition-colors">
            <FaMapMarkerAlt className="mr-1" />
            Order Tracking
          </a>
        </div>

        {/* Right side - Language and Currency */}
        <div className="flex space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center hover:text-blue-500 transition-colors"
              onBlur={() => setTimeout(() => setShowLanguageDropdown(false), 200)}
            >
              {selectedLanguage}
              <FaChevronDown className="ml-1 text-xs" />
            </button>
            {showLanguageDropdown && (
              <div className={`
                absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 
                ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                border
              `}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.name);
                      setShowLanguageDropdown(false);
                    }}
                    className={`
                      block w-full text-left px-4 py-2 
                      ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                      transition-colors
                    `}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center hover:text-blue-500 transition-colors"
              onBlur={() => setTimeout(() => setShowCurrencyDropdown(false), 200)}
            >
              {selectedCurrency}
              <FaChevronDown className="ml-1 text-xs" />
            </button>
            {showCurrencyDropdown && (
              <div className={`
                absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 
                ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                border
              `}>
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setSelectedCurrency(curr.code);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`
                      block w-full text-left px-4 py-2 
                      ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                      transition-colors
                    `}
                  >
                    {curr.code} - {curr.symbol} ({curr.name})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;