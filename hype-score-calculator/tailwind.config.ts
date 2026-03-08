import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#FF006E',
          cyan: '#00F5FF',
          purple: '#8000FF',
        },
      },
    },
  },
  plugins: [],
}
export default config