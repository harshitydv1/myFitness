/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./screens/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./navigation/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    200: '#c7d2fe',
                    300: '#a5b4fc',
                    400: '#818cf8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                },
                secondary: {
                    50: '#fdf4ff',
                    100: '#fae8ff',
                    200: '#f5d0fe',
                    300: '#f0abfc',
                    400: '#e879f9',
                    500: '#d946ef',
                    600: '#c026d3',
                    700: '#a21caf',
                    800: '#86198f',
                    900: '#701a75',
                },
                success: '#10b981',
                warning: '#f59e0b',
                danger: '#ef4444',
                dark: {
                    bg: '#0f172a',
                    card: '#1e293b',
                    text: '#f1f5f9',
                },
                light: {
                    bg: '#f8fafc',
                    card: '#ffffff',
                    text: '#1e293b',
                }
            },
            fontFamily: {
                regular: ['System'],
                medium: ['System'],
                bold: ['System'],
            },
        },
    },
    plugins: [],
}
