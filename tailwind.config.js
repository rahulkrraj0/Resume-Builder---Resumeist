/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14171F',
          50: '#F4F5F7',
          100: '#E5E7EB',
          200: '#C7CBD4',
          300: '#9AA1AE',
          400: '#6B7280',
          500: '#454B57',
          600: '#2E323C',
          700: '#1F222A',
          800: '#181B22',
          900: '#14171F',
          950: '#0C0E13'
        },
        paper: {
          DEFAULT: '#FAF8F3',
          50: '#FFFFFF',
          100: '#FAF8F3',
          200: '#F1EDE2'
        },
        moss: {
          DEFAULT: '#1F8A70',
          50: '#E9F6F1',
          100: '#CDEBDF',
          400: '#2AA588',
          500: '#1F8A70',
          600: '#186E5A'
        },
        amber: {
          DEFAULT: '#E8A33D',
          400: '#EFB667',
          500: '#E8A33D',
          600: '#C7852A'
        },
        clay: {
          DEFAULT: '#C1473A',
          500: '#C1473A',
          600: '#A23A2F'
        }
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")"
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,23,31,0.06), 0 8px 24px -8px rgba(20,23,31,0.12)',
        'card-dark': '0 1px 2px rgba(0,0,0,0.3), 0 8px 30px -8px rgba(0,0,0,0.5)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
        shimmer: 'shimmer 1.6s linear infinite'
      }
    }
  },
  plugins: []
};
