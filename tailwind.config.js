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
          dark: '#072B20',
          emerald: '#0B3C2D',
          emeraldHover: '#0F4C3A',
          fresh: '#166534',
          accent: '#15803D',
          lightGreen: '#E6F4F1',
          softGreen: '#ECFDF5',
          gold: '#C5A059',
          lightGold: '#FDFBF7',
          goldBorder: '#E5D6AF',
          charcoal: '#111827',
          slate: '#374151',
          muted: '#6B7280',
          bgLight: '#FAFAFA',
          bgWarm: '#F8F7F4',
          bgCard: '#FFFFFF',
          borderLight: '#E5E7EB',
          borderSubtle: '#F3F4F6'
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(11, 60, 45, 0.05)',
        'card-hover': '0 12px 32px -4px rgba(11, 60, 45, 0.12)',
        'nav': '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
        'gold': '0 4px 14px 0 rgba(197, 160, 89, 0.25)',
      }
    },
  },
  plugins: [],
}
