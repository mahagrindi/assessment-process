import type { Config } from 'tailwindcss'
import { ey } from './styles/theme/tailwind-custom-color'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', 'node_modules/preline/dist/*.ts'],
  theme: {
    colors: ey,
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('preline/plugin')],
}
export default config
