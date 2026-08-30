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
          primary: '#F0B000',
          primaryDark: '#D99A00',
          primaryLight: '#FFF3CC',
          softGold: '#F8E7B0',
          background: '#FFFFFF',
          backgroundSoft: '#FFFBF2',
          section: '#FFFDF7',
          black: '#111111',
          charcoal: '#222222',
          textSecondary: '#444444',
          textMuted: '#6B6B6B',
          border: '#E7E0D2',
          success: '#166534',
          successLight: '#ECFDF5',
          warning: '#D97706',
          warningLight: '#FEF3C7',
          error: '#DC2626',
          errorLight: '#FEE2E2',
          bgLight: '#FFFFFF',
          bgWarm: '#FFFBF2',
          lightGold: '#FFF3CC',
          borderLight: '#E7E0D2',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(17, 17, 17, 0.03)',
        'card-hover': '0 12px 32px -4px rgba(240, 176, 0, 0.08)',
        'nav': '0 4px 20px -2px rgba(17, 17, 17, 0.04)',
        'gold': '0 4px 14px 0 rgba(240, 176, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
