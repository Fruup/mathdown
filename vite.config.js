import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		port: 8080,
	},
	assetsInclude: [
		'**/*.css',
	],
};

export default config;
