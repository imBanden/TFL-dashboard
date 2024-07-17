/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bakerloo': '#B26300',
        'central': '#DC241F',
      'circle': '#FFD329',
      'district': '#007D32',
      'elizabeth': '#6950A1',
      'hammersmith-city': '#F4A9BE',
      'jubilee': '#A1A5A7',
      'metropolitan': '#9B0058',
      'northern': '#000000',
      'piccadilly': '#0019A8',
      'victoria': '#0098D4',
      'waterloo-city': '#93CEBA',
      'dlr': '#00AFAD',
      'london-overground': '#FA7B05'
    },
    fontFamily: {
      'dot-gothic': ['"DotGothic16"', 'sans-serif'],
    },
  },
    
  },
  
  plugins: [],
}

