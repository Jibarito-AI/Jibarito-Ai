import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E75B6',
        secondary: '#5FB3B3',
        background: '#F8F9FA',
        text: '#2C3E50',
        accent: '#FF7675'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(44,62,80,0.08)'
      }
    }
  },
  plugins: []
};

export default config;
