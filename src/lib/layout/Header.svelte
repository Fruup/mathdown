<script lang="ts">
	import IconMoon from '$lib/icons/IconMoon.svelte'
	import IconButton from '$lib/components/IconButton.svelte'
	import { darkMode } from '$lib/store'
</script>

<header>
	<div />
	<h1>_MATHDOWN_</h1>
	<div>
		<IconButton on:click={() => ($darkMode = !$darkMode)} icon={IconMoon} />
	</div>
</header>

<style>
	header {
		display: grid;
		/* flex-direction: row; */
		/* justify-content: space-around; */

		grid-template-columns: 1fr auto 1fr;

		padding: 0.5rem;

		/* background-color: var(--text-color); */
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
</style>
