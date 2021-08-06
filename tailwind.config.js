module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'Lato',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      'sans-title': [
        'Quicksand',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ]
    },
    extend: {
      extend: {
        transitionProperty: {
          height: 'height'
        }
      },
      colors: {
        primary: {
          100: '#ba73d4',
          500: '#9d37c2',
          700: '#7e2c9b'
        },
        'jellyfin-pink': {
          500: '#c24085'
        },
        'jellyfin-orange': {
          500: '#d64949',
          600: '#eba4a4'
        },
        'jellyfin-purple': {
          300: '#7e2dc2',
          600: '#a56cd4'
        },
        'jellyfin-blue': {
          300: '#2d3ec2',
          100: '#6c78d4'
        }
      }
    }
  },
  variants: {},
  plugins: []
};
