/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      // 自定义响应式尺寸
      'c-xs': {'max': '768px'},
      'c-sm': {'min': '768px'},
      'c-lg': {'min': '1200px'},
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}

