import type { Config } from 'tailwindcss';

export const config: Config = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          light: '#33AB9F',
          DEFAULT: '#009688',
          dark: '#00695F',
        },
        secondary: {
          light: '#FFCF33',
          DEFAULT: '#FFC400',
          dark: '#B28900',
        },
        grey: {
          100: '#F8F9FA',
          500: '#6C737F',
        },
      },
    },
  },
  plugins: [],
};
export default config;
