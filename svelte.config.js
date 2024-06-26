import adapter from '@sveltejs/adapter-netlify';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

//import { importAssets } from 'svelte-preprocess-import-assets';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	layout: {
		nyhet: 'src/routes/nyheter/layout.svelte',
		traning: 'src/routes/traning/layout.svelte',
		borjatrana: 'src/routes/[slug]/layout.svelte'
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({}), mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.md', '.svx'],
	compilerOptions: {},
	kit: {
		alias: {
			// this will match a file
			$pages: 'pages/*',
			$components: 'src/lib/components',
			// this will match a directory and its contents
			// (`my-directory/x` resolves to `path/to/my-directory/x`)
			$news: '/pages/news/*'
		},

		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// if true, will create a Netlify Edge Function rather
			// than using standard Node-based functions
			edge: false,

			// if true, will split your app into multiple functions
			// instead of creating a single one for the entire app.
			// if `edge` is true, this option cannot be used
			split: false
		})
		//adapter: adapter({
		//	fallback: '404.html'
		//})
	}
};

export default config;
