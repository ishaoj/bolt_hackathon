/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#0a0a0a',
        'neon-cyan': '#00fffc',
        'neon-purple': '#fc00ff',
        'neon-yellow': '#fffc00',
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 2s infinite',
      },
    },
  },
  plugins: [],
};