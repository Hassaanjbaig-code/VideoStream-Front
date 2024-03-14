/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      keyframes: {
        animateLike: {
          '0%': {
            transform: 'scale(1)' // Added quotes and fixed syntax
          },
          '100%': {
            transform: 'scale(1.15)' // Added quotes and fixed syntax
          }
        }
      },
      animation: {
        Like: 'animateLike 2s ease-in-out 1',
      }
    },
  },
  plugins: [],
}
