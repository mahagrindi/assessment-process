import type { Config } from 'tailwindcss'

import { EY_COLORS } from './styles/theme/tailwind-custom-color'
import { EY_INTERSTATE_FONT } from './styles/theme/tailwind-custom-font'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './constants/**/*.{js,ts,jsx,tsx,mdx}', './ui/**/*.{js,ts,jsx,tsx,mdx}', 'node_modules/preline/dist/*.ts'],
  theme: {
    colors: { transparent: 'transparent', current: 'currentColor', ...EY_COLORS },
    fontFamily: { ...EY_INTERSTATE_FONT },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('preline/plugin')],
}
export default config
