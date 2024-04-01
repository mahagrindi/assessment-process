import type { Config } from 'tailwindcss'
import { EY_COLORS } from './styles/theme/tailwind-custom-color'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './ui/**/*.{js,ts,jsx,tsx,mdx}', 'node_modules/preline/dist/*.ts'],
  theme: {
    colors: { transparent: 'transparent', current: 'currentColor', ...EY_COLORS },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('preline/plugin')],
}
export default config
