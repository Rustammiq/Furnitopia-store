/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./beds/*.html",
    "./beds/**/*.html",
    "./js/**/*.js",
    "./beds/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'furnitopia': {
          'primary': '#9d7c60',
          'secondary': '#d7cbbf',
          'accent': '#e74c3c',
          'dark': '#2c3e50',
          'light': '#f8f9fa'
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'Arial', 'sans-serif'],
        'display': ['Baloo Chettan', 'cursive']
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-slow': 'bounce 2s infinite'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      boxShadow: {
        'furnitopia': '0 8px 25px rgba(157, 124, 96, 0.15)',
        'furnitopia-lg': '0 15px 35px rgba(157, 124, 96, 0.2)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
