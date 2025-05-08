import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';

// Create the ThemeContext
export const ThemeContext = createContext();

/**
 * ThemeProvider component that manages theme state and provides it to child components
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} [props.defaultTheme="light"] - Default theme ('light' or 'dark')
 * @param {string} [props.storageKey="theme"] - Key for localStorage
 */
export const ThemeProvider = ({ children, defaultTheme = "light", storageKey = "theme" }) => {
  const [theme, setTheme] = useState(defaultTheme);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Use system preference if no saved theme
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setTheme('dark');
      }
    }
  }, [storageKey]);

  // Save theme preference and update document class
  useEffect(() => {
    localStorage.setItem(storageKey, theme);
    document.documentElement.className = theme;
  }, [theme, storageKey]);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access theme context
 * @returns {Object} Theme context with theme and toggleTheme function
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Prop type validation
ThemeProvider.propTypes = {
  /**
   * Child components that will have access to the theme context
   */
  children: PropTypes.node.isRequired,
  
  /**
   * Default theme to use if no preference is saved
   */
  defaultTheme: PropTypes.oneOf(['light', 'dark']),
  
  /**
   * Key to use for storing theme preference in localStorage
   */
  storageKey: PropTypes.string,
};

// Default props
ThemeProvider.defaultProps = {
  defaultTheme: 'light',
  storageKey: 'theme',
};

export default ThemeProvider;