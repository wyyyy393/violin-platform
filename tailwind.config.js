/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#F5F5F0',
        'neon-yellow': '#FFFF00',
        'neon-pink': '#FF69B4',
        'neon-blue': '#00BFFF',
        'orange-custom': '#FF6B35',
        'neon-green': '#00FF00',
      },
      fontFamily: {
        'display': ['Impact', 'sans-serif'],
        'mono': ['Courier New', 'monospace'],
      },
      boxShadow: {
        'brutal': '6px 6px 0px #000',
        'brutal-sm': '4px 4px 0px #000',
        'brutal-lg': '8px 8px 0px #000',
      },
    },
  },
  plugins: [],
}
