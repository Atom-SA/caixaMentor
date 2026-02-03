/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'funnel': ['Funnel Display', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: '#003366',
        primary: '#003366',
      },
      accentColor: {
        DEFAULT: '#003366',
      },
    },
  },
  plugins: [],
};
