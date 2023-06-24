/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const baseDir = __dirname + '/../../';

module.exports = {
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  content: [
    `${baseDir}content/**/*.md"`,
    `${baseDir}layouts/**/*.html`,
    `${baseDir}node_modules/flowbite/**/*.js"`,
  ],
  theme: {
    extend: {
      colors: {
        coral: '#f44336',
        gunmetal: '#282c34',
      },
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans.filter(font => font !== "Roboto")],
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

