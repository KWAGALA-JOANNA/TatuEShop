/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: "#f42c37",
        secondary: "#f42c37",
        brandYellow: "#fdc62e",
        brandGreen: "#2dcc6f",
        brandBlue: "#1376f4",
        brandWhite: "#eeeeee",
        // Dark mode colors (added under a `dark` key)
        dark: {
          primary: "#ff4d58", // A brighter red for dark mode
          secondary: "#ff4d58",
          brandYellow: "#ffd95e", // A brighter yellow for dark mode
          brandGreen: "#3adc7f", // A brighter green for dark mode
          brandBlue: "#1a86ff", // A brighter blue for dark mode
          brandWhite: "#f0f0f0", // A slightly off-white for dark mode
          background: "#1a1a1a", // Dark background color
          text: "#ffffff", // Light text color for dark mode
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      // Extend background and text colors for dark mode
      backgroundColor: {
        dark: "#1a1a1a", // Dark background color
      },
      textColor: {
        dark: "#ffffff", // Light text color for dark mode
      },
    },
  },
  plugins: [],
};