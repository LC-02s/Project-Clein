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
        '3xl': '100rem',
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
      aspectRatio: {
        thumbnail: (1200 / 630).toString(),
      },
      backgroundImage: {
        grid: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.2)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      },
    },
  },
  plugins: [],
} satisfies Config
