<script lang="ts">
	import IconMoon from '$lib/icons/IconMoon.svelte'
	import Button from '$lib/components/Button.svelte'
	import { darkMode, showProjectsOverlay } from '$lib/store'
import IconDownload from '$lib/icons/IconDownload.svelte'
import { currentProject } from '$lib/project';

	const handleThemeChange = () => {
		$darkMode = !$darkMode
		localStorage.setItem('dark', JSON.stringify($darkMode))
	}
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
		<Button on:click={handleThemeChange}>
			<IconMoon />
		</Button>
		<Button href={`${$currentProject.id}/print`}>
			<IconDownload />
		</Button>
	</div>
</header>

<style>
	header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;

		padding: 0.5rem;

		box-shadow: 0 0 12px 12px var(--shadow-color);
	}

	header > * {
		display: flex;
		flex-direction: row;

		justify-items: center;
		justify-content: space-around;
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
