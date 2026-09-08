/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: '#3B070B',
          maroonDark: '#270406',
          maroonLight: '#5E0D13',
          gold: '#D4AF37',
          goldLight: '#FFD700',
          goldDark: '#7A5809',
          cream: '#FAF7F2',
          creamDark: '#F2EADF',
          linen: '#F5EDD8',
          charcoal: '#0F0304',
          sepia: '#1A0A0C' // Ultra-dark high-contrast crisp text color
        }
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        serif: ['"EB Garamond"', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(180deg, #3B070B 0%, #270406 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FAF7F2 0%, #F2EADF 50%, #FAF7F2 100%)',
        'gold-metallic': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.4)',
        'gold-glow-lg': '0 15px 40px rgba(59, 7, 11, 0.25), 0 0 30px rgba(212, 175, 55, 0.5)',
      }
    },
  },
  plugins: [],
}
