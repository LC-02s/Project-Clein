import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

export default {
  darkMode: [
    'variant',
    [
      '@media (prefers-color-scheme: dark) { &:not([data-theme="light"], [data-theme="light"] *) }',
      '&:is([data-theme="dark"], [data-theme="dark"] *)',
    ],
  ],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--pretendard)', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '20rem',
        sm: '30rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem',
        '2xl': '90rem',
      },
      animation: {
        'pop-spin': 'pop-spin 0.5s',
      },
      keyframes: {
        'pop-spin': {
          '0%': { transform: 'rotate(-360deg) scale(0)', opacity: '0' },
          '75%': { transform: 'rotate(25deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
