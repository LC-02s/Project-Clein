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
      colors: {
        gray: {
          '50': '#fafafa',
          '100': '#f4f4f5',
          '200': '#e4e4e7',
          '300': '#d4d4d8',
          '400': '#a1a1aa',
          '500': '#71717a',
          '600': '#52525b',
          '700': '#3f3f46',
          '800': '#27272a',
          '900': '#18181b',
        },
        red: {
          '50': '#fff5f5',
          '100': '#ffe3e3',
          '200': '#ffc9c9',
          '300': '#ffa8a8',
          '400': '#ff8787',
          '500': '#ff6b6b',
          '600': '#fa5252',
          '700': '#f03e3e',
          '800': '#e03131',
          '900': '#c92a2a',
        },
        yellow: {
          '50': '#fff9db',
          '100': '#fff3bf',
          '200': '#ffec99',
          '300': '#ffe066',
          '400': '#ffd43b',
          '500': '#fcc419',
          '600': '#fab005',
          '700': '#f59f00',
          '800': '#f08c00',
          '900': '#e67700',
        },
        green: {
          '50': '#e6fcf5',
          '100': '#c3fae8',
          '200': '#96f2d7',
          '300': '#63e6be',
          '400': '#38d9a9',
          '500': '#20c997',
          '600': '#12b886',
          '700': '#0ca678',
          '800': '#099268',
          '900': '#087f5b',
        },
        blue: {
          '50': '#edf2ff', // #e7f5ff
          '100': '#dbe4ff', // #d0ebff
          '200': '#bac8ff', // #a5d8ff
          '300': '#91a7ff', // #74c0fc
          '400': '#748ffc', // #4dabf7
          '500': '#5c7cfa', // #339af0
          '600': '#4c6ef5', // #228be6
          '700': '#4263eb', // #1c7ed6
          '800': '#3b5bdb', // #1971c2
          '900': '#364fc7', // #1864ab
        },
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
