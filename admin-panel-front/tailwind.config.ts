import type { Config } from 'tailwindcss'
import { COLORS } from './src/constants/color.constants'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: COLORS,
			backgroundImage: {
				'primary-gradient': 'linear-gradient(to right, #ea9e4d, #FF825C)',
				'secondary-gradient': 'linear-gradient(to right, #DA45AF, #FA5A87)'
			}
		}
	},
	plugins: []
}
export default config
