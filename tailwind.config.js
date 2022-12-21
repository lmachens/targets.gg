const { colors } = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        ...colors,
        brand: {
          50: '#E3FAFC',
          100: '#C5F6FA',
          200: '#99E9F2',
          300: '#66D9E8',
          400: '#3BC9DB',
          500: '#22B8CF',
          600: '#15AABF',
          700: '#1098AD',
          800: '#0C8599',
          900: '#0B7285',
          DEFAULT: '#111111',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
