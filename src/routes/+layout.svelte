<script lang="ts">
	import Header from '$lib/layout/Header.svelte'
	import Overlay from '$lib/layout/Overlay.svelte'
	import {
		darkMode,
		showProjectNameOverlay,
		showProjectsOverlay,
	} from '$lib/store'
	import Downloader from '$lib/components/Downloader.svelte'
	import ProjectNameDialog from '$lib/components/ProjectNameDialog.svelte'
	import ProjectsDialog from '$lib/components/ProjectsDialog.svelte'
	import Uploader from '$lib/components/Uploader.svelte'
</script>

<Downloader />
<Uploader />

<svelte:head>
	<title>_MATHDOWN_</title>
</svelte:head>

<div id="app" class:dark={$darkMode}>
	<!-- Out-of-layout elements -->
	<Overlay size="l" bind:open={$showProjectsOverlay}>
		<ProjectsDialog />
	</Overlay>

	<Overlay size="s" bind:open={$showProjectNameOverlay}>
		<ProjectNameDialog />
	</Overlay>

	<!-- Page layout -->
	<Header />
	<main>
		<slot />
	</main>
</div>

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;700&display=swap');

	@import '$lib/styles/variables';

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

	input[type='text'] {
		border-radius: 4px;
		padding: 0.1rem 0.2rem;
		font-size: 1em;
		color: var(--text-color);
		background-color: var(--background-color);
		border: 1px solid var(--text-color-light);
		outline: none;
	}

	/* Printing */

	/* h1, h2, h3, h4, h5 {
		page-break-after: avoid;
	}

	@page {
		margin: 3cm;
	} */
</style>
