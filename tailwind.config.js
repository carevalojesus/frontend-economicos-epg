module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        secondary: '#D6A461',
        success: '#16CA91',
        warning: '#FFBA42',
        info: '#1192EE',
        danger: '#E93553',
        primary: {
          500: '#007eb1',
          700: '#051C2C',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
