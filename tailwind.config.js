/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#0A2540',
        'brand-secondary': '#0077FF',
        'brand-accent': '#FFD700',
        'base-100': '#FFFFFF',
        'base-200': '#F7FAFC',
        'base-300': '#EDF2F7',
        'base-content': '#1A202C',
      },
    },
  },
  plugins: [],
}
