const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        slideUp: 'slideUp 0.8s ease-out',
      },
    },
    screens: {
      'xl': {'max': '1200px'},
      'lg': {'max': '1080px'},
      'md-lg': {'max': '991px'},
      'md': {'max': '768px'},
      'sm': {'max': '576px'},
      'xs': {'max': '480px'},
      '2xs': {'max': '340px'},
    },
  },
  plugins: [],
});
