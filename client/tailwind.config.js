/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Saffron / Orange palette ──────────────────────────────
        saffron: {
          DEFAULT: '#FF6B00',
          2: '#F97316',
          3: '#EA580C',
          4: '#FB923C',
          5: '#FDBA74',
          pale: '#FFF7ED',
          light: '#FFEDD5',
        },
        // ── Neutrals ─────────────────────────────────────────────
        ink: {
          DEFAULT: '#1A1A2E',
          2: '#16213E',
          3: '#374151',
        },
        muted: {
          DEFAULT: '#6B7280',
        },
        // ── Surfaces ─────────────────────────────────────────────
        surface: {
          DEFAULT: '#FFFFFF',
          2: '#FFF7ED',
          3: '#FFEDD5',
        },
        // ── Borders ──────────────────────────────────────────────
        border: {
          DEFAULT: '#FED7AA',
          2: '#FDBA74',
        },
        // ── Legacy aliases (keep other pages working) ─────────────
        accent: {
          DEFAULT: '#FF6B00',
          light: '#F97316',
          pale: '#FFF7ED',
        },
        cream: '#FFF7ED',
        'cream-2': '#FFEDD5',
        'cream-3': '#FED7AA',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
      borderRadius: {
        xl2: '1rem',
        xl3: '1.5rem',
        xl4: '2rem',
      },
      boxShadow: {
        'glow-orange':    '0 0 40px rgba(255,107,0,0.15)',
        'glow-orange-md': '0 0 80px rgba(255,107,0,0.2)',
        'glow-orange-lg': '0 0 120px rgba(255,107,0,0.25)',
        'card':           '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover':     '0 8px 40px rgba(255,107,0,0.15), 0 2px 8px rgba(0,0,0,0.06)',
        'orange-sm':      '0 2px 12px rgba(255,107,0,0.2)',
        'orange-md':      '0 4px 24px rgba(255,107,0,0.25)',
        'orange-lg':      '0 8px 40px rgba(255,107,0,0.3)',
        // legacy
        'glow-gold':      '0 0 60px rgba(255,107,0,0.08)',
        'glow-gold-md':   '0 0 100px rgba(255,107,0,0.12)',
        'glass':          '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        'glass-dark':     '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)',
        'card-premium':   '0 2px 8px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'gradient-saffron':      'linear-gradient(135deg, #FF6B00 0%, #F97316 50%, #EA580C 100%)',
        'gradient-saffron-soft': 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FFF7ED 100%)',
        'gradient-saffron-hero': 'linear-gradient(135deg, #FF6B00 0%, #F97316 40%, #FB923C 70%, #FDBA74 100%)',
        'gradient-warm':         'linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 100%)',
        'gradient-card':         'linear-gradient(135deg, rgba(255,107,0,0.08) 0%, rgba(249,115,22,0.04) 100%)',
        // legacy
        'gradient-cream':        'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FFF7ED 100%)',
        'gradient-ink':          'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #1A1A2E 100%)',
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'float-slow':    'floatSlow 8s ease-in-out infinite',
        'pulse-orange':  'pulseOrange 3s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'spin-slow':     'spin 8s linear infinite',
        // legacy
        'pulse-gold':    'pulseOrange 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseOrange: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
