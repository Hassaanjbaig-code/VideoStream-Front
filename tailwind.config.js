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
        },
        animationAlert: {
          "0%": {
            top: "0"
          }, 
          "10%" :{
            top: "2rem"
          },
          "20%" :{
            top: "4rem"
          },
          "30%" :{
            top: "6rem"
          },
          "40%" :{
            top: "8rem"
          },
          "50%" :{
            top: "10rem"
          },
          "60%" :{
            top: "12rem"
          },
          "100%" :{
            top: "14rem"
          },
        }
      },
      animation: {
        Like: 'animateLike 2s ease-in-out 1',
        DropDownAlert: "animationAlert 6s ease-in-out 1",
      },
      backgroundImage: {
        'Wallpaper': "url('/src/assets/Wallpaper/5399714.jpg')",
        'Wallpaper2': "url('/src/assets/Wallpaper/subtle-prism.png')",
        'Wallpaper3': "url('/src/assets/Wallpaper/subtle-prism(1).png')"
      }
    },
  },
  plugins: [],
}
