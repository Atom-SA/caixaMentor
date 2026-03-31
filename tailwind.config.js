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
        accent: '#F2C94C',
        primary: '#003366',
        navy: '#07090F',
        surface: 'rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
};
