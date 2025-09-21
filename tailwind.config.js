/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito_bold: ['nunito-bold', 'sans-serif'],
        times: ['Times New Roman', 'serif'],
				arial: ['Arial', 'sans-serif'],
				courier: ['Courier New', 'Courier', 'monospace'],
				monospace: ['monospace']
      }
    },
  },
  plugins: [],
}

