/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium gradient palette
        'prime-50': '#f0f7ff',
        'prime-100': '#e0effe',
        'prime-200': '#bae6fd',
        'prime-300': '#7dd3fc',
        'prime-400': '#38bdf8',
        'prime-500': '#0ea5e9',
        'prime-600': '#0284c7',
        'prime-700': '#0369a1',
        'prime-800': '#075985',
        'prime-900': '#0c3d66',
        
        // Accent colors
        'accent-50': '#fef3f2',
        'accent-100': '#fee4e2',
        'accent-200': '#fecdc3',
        'accent-300': '#fda291',
        'accent-400': '#f97066',
        'accent-500': '#f04438',
        'accent-600': '#d92d20',
        'accent-700': '#b42318',
        'accent-800': '#912018',
        'accent-900': '#55160c',
        
        // Neutral
        'slate-50': '#f8fafc',
        'slate-100': '#f1f5f9',
        'slate-200': '#e2e8f0',
        'slate-300': '#cbd5e1',
        'slate-400': '#94a3b8',
        'slate-500': '#64748b',
        'slate-600': '#475569',
        'slate-700': '#334155',
        'slate-800': '#1e293b',
        'slate-900': '#0f172a',
        
        // Success
        'success': '#10b981',
        'success-light': '#ecfdf5',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.3)',
        'glow-accent': '0 0 20px rgba(240, 68, 56, 0.3)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
