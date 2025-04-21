import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'
	],
	plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			padding: {
				'1/2': '50%',
				full: '100%'
			},
			screens: {
				sm: '675px',
				md: '1010px'
			},
			gridTemplateColumns: {
				md: 'auto minmax(720px, 720px) 300px auto'
			},
			colors: {
				brown: '#ba826e',
				sand: '#e4dbce',
				box: '#f3e4d4',
				primary: '#111827',
				red: {
					accent: 'rgb(210 51 47)',
					600: '#ffb7c5',
					700: '#c33803'
				},
				background: {
					light: '#e4dbce'
				}

				// violet

				// 	50: '#f5f3ff',
				// 	100: '#ede9fe',
				// 	200: '#ddd6fe',
				// 	300: '#c4b5fd',
				// 	400: '#a78bfa',
				// 	500: '#8b5cf6',
				// 	600: '#7c3aed',
				// 	700: '#ed1a25',
				// 	800: '#5b21b6',
				// 	900: '#4c1d95'
				// }
			}
		}
	}
};
