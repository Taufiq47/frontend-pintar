/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F5F4F4',
        'secondary': '#E5E5E5',
        'accent': '#00303F',
        'narrow': '#D9D9D9'
      }
    },
  },
  plugins: [],
}
