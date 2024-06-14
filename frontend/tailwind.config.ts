import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1A56DB',
          DEFAULT: '#1A56DB',
          dark: '#1A56DB',
        },
        text: {
          light: '#13343B',
          DEFAULT: '#13343B',
          dark: '#E8E8E6',
        },
      },
    },
  },
  plugins: [],
};
export default config;
