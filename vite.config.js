import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

const config = defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 8080,
	},
	assetsInclude: ['**/*.css'],
})

export default config
