/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FBF9F5',
          200: '#F5F2EB',
          300: '#EBE6DC',
          400: '#DDD5C7',
          500: '#C7BCAB',
        },
        ink: {
          950: '#0B0F19',
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
          600: '#4B5563',
          500: '#6B7280',
          400: '#9CA3AF',
        },
        leaf: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
        },
        citrus: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(17, 24, 39, 0.04), 0 8px 24px -4px rgba(17, 24, 39, 0.06)',
        'soft-lg': '0 4px 20px -2px rgba(17, 24, 39, 0.05), 0 12px 36px -6px rgba(17, 24, 39, 0.08)',
        'lift': '0 14px 28px rgba(17, 24, 39, 0.08), 0 10px 10px rgba(17, 24, 39, 0.04)',
      }
    },
  },
  plugins: [],
}
