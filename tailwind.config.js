/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef7ed",
          100: "#ffecd6",
          200: "#fed4a4",
          300: "#fdb572",
          400: "#fa8d47",
          500: "#E2852E",
          600: "#D2691E",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        secondary: {
          50: "#fffdf0",
          100: "#fefce8",
          200: "#fef9c3",
          300: "#fef08a",
          400: "#facc15",
          500: "#F0C674",
          600: "#DAA520",
          700: "#ca8a04",
          800: "#a16207",
          900: "#854d0e",
        },
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
        dark: {
          bg: "#0f172a",
          card: "#1e293b",
          text: "#f1f5f9",
        },
        light: {
          bg: "#f8fafc",
          card: "#ffffff",
          text: "#1e293b",
        },
      },
      fontFamily: {
        regular: ["System"],
        medium: ["System"],
        bold: ["System"],
      },
    },
  },
  plugins: [],
};
