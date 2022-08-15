<script lang="ts">
	import Header from '$lib/layout/Header.svelte'
	import Overlay, { showProjectsOverlay } from '$lib/layout/Overlay.svelte'
	import { darkMode } from '$lib/store'
	import Downloader from '$lib/components/Downloader.svelte'
</script>

<Downloader />

<div id="app" class:dark={$darkMode}>
	<!-- Out-of-layout elements -->
	<Overlay size="l" bind:open={$showProjectsOverlay}>HALLO!</Overlay>

	<!-- Page layout -->
	<Header />
	<main>
		<slot />
	</main>
</div>

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;700&display=swap');

	:root {
		font-size: 1.2rem;
	}

	html {
		font-family: 'Cascadia Code', 'Source Code Pro', 'Open Sans', sans-serif;
	}

	* {
		box-sizing: border-box;
	}

	body,
	#app {
		margin: 0;
		padding: 0;

		overflow: hidden;
	}

	#app,
	body {
		--text-color: #111;
		--background-color: #fff;
		--background-color-highlight: #f3f3f3;
		--link-color: rgb(0, 151, 226);
		--shadow-color: rgba(0, 0, 0, 0.2);
	}

	#app.dark {
		--text-color: #eee;
		--background-color: rgb(50, 50, 50);
		--background-color-highlight: rgb(57, 57, 57);
	}

	#app {
		color: var(--text-color);
		background-color: var(--background-color);
	}

	#app {
		transition-property: color, background-color;
		transition-duration: 500ms;
		transition-timing-function: ease-out;
	}

	#app {
		position: relative;

		display: grid;
		grid-template-rows: auto 1fr;

		width: 100vw;
		height: 100vh;
	}

	main {
		box-sizing: border-box;
		overflow: hidden auto;
	}

	/* Printing */

	/* h1, h2, h3, h4, h5 {
		page-break-after: avoid;
	}

	@page {
		margin: 3cm;
	} */
</style>
