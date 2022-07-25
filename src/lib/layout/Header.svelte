<script lang="ts">
	import IconMoon from '$lib/icons/IconMoon.svelte'
	import Button from '$lib/components/Button.svelte'
	import IconButton from '$lib/components/IconButton.svelte'
	import { darkMode } from '$lib/store'
	import { showProjectsOverlay } from './Overlay.svelte'
</script>

<header>
	<div>
		<Button on:click={() => ($showProjectsOverlay = !$showProjectsOverlay)}>
			projects
		</Button>
	</div>
	<a href="/">
		<h1>_MATHDOWN_</h1>
	</a>
	<div>
		<IconButton on:click={() => ($darkMode = !$darkMode)} icon={IconMoon} />
	</div>
</header>

<style>
	header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;

		padding: 0.5rem;

		box-shadow: 0 0 12px 12px var(--shadow-color);
	}

	header * {
		display: grid;
		place-content: center;
	}

	h1 {
		margin: 0;
		padding: 0;
	}

	a {
		color: unset;
		text-decoration: unset;
	}

	@media print {
		header {
			display: none;
		}
	}
</style>
