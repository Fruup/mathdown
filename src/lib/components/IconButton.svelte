<script lang="ts">
	export let icon: object
</script>

<button on:click>
	<svelte:component this={icon} />
</button>

<style>
	button {
		display: grid;
		place-content: center;

		width: 3rem;
		height: 3rem;

		background-color: var(--background-color);

		border: none;
		border-radius: 999px;

		cursor: pointer;
	}

	button:hover {
		border: 1px solid var(--text-color);
		box-shadow: 0 2px 4px 4px var(--shadow-color);
	}
</style>
