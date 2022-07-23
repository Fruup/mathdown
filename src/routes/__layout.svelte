<script lang="ts" context="module">
	export const load: Load = async ({ url }) => {
		const param = url.searchParams.get('dark')
		const dark = param ? JSON.parse(param) : true

		darkMode.set(dark)

		return {
			status: 200,
			props: { dark },
		}
	}
</script>

<script lang="ts">
	import { browser } from '$app/env'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import Header from '$lib/layout/Header.svelte'
	import Overlay, { showProjectsOverlay } from '$lib/layout/Overlay.svelte'
	import { darkMode } from '$lib/store'

	onMount(() => {
		setTimeout(() => document.body.classList.add('transition'), 1000)
	})

	$: if (browser) {
		if ($darkMode) document.body.classList.add('dark')
		else document.body.classList.remove('dark')
	}
</script>

<Header />

<button
	style="position: absolute; width: 50px; height: 50px"
	on:click={() => ($showProjectsOverlay = !$showProjectsOverlay)}
/>

<main>
	<slot />
</main>

<Overlay size="l" bind:open={$showProjectsOverlay}>HALLO!</Overlay>

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200;300;400;700&display=swap');

	html {
		font-family: 'Cascadia Code', 'Source Code Pro', 'Open Sans', sans-serif;
		font-size: 1.2rem;
	}

	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		padding: 0;
	}

	body {
		--text-color: #111;
		--background-color: #fff;
		--background-color-highlight: #f3f3f3;
		--link-color: rgb(0, 151, 226);
		--shadow-color: rgba(0, 0, 0, 0.2);
	}

	body.dark {
		--text-color: #eee;
		--background-color: rgb(50, 50, 50);
		--background-color-highlight: rgb(57, 57, 57);
	}

	body,
	textarea {
		color: var(--text-color);
		background-color: var(--background-color);
	}

	body.transition,
	body.transition * {
		transition-property: color, background-color;
		transition-duration: 500ms;
		transition-timing-function: ease-out;
	}

	#svelte {
		position: relative;

		display: grid;
		grid-template-rows: auto 1fr;

		width: 100vw;
		height: 100vh;
	}

	/* Printing */

	/* h1, h2, h3, h4, h5 {
		page-break-after: avoid;
	}

	@page {
		margin: 3cm;
	} */
</style>
