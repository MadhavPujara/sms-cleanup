module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
        background: '#F2F2F7',
        surface: '#FFFFFF',
        text: '#000000',
        'text-secondary': '#8E8E93',
      },
    },
  },
  plugins: [],
} 