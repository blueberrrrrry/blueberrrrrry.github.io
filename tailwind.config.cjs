/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#007aff',
          dark: '#1d1d1f',
          light: '#f5f5f7',
          gray: {
            100: '#f5f5f7',
            200: '#e5e5e7',
            300: '#d2d2d7',
            400: '#86868b',
            500: '#6e6e73',
            600: '#515154',
            700: '#3a3a3c',
            800: '#2c2c2e',
            900: '#1c1c1e'
          }
        }
      },
      boxShadow: {
        apple: '0 8px 24px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 16px 40px rgba(0, 0, 0, 0.12)'
      },
      borderRadius: {
        apple: '1.25rem'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
