import defaultTheme from 'tailwindcss/defaultTheme';
import { MOBILE_SCREEN } from './src/constants/mediaQueries';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: `${MOBILE_SCREEN}px`,
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        dark: '#181818',
        white: '#FFF',
        main: '#FF9B33',
        gray: '#6A6A6A',
        black: '#000',
        primary: '#FFD05D',
        orange: '#FF5C01',
      },
    },
  },
  plugins: [],
};
