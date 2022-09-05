<script lang="ts">
	export let href: string = undefined
</script>

{#if href}
	<a {href}>
		<slot />
	</a>
{:else}
	<button on:click>
		<slot />
	</button>
{/if}

<style>
	button {
		display: grid;
		place-content: center;

		width: 3rem;
		height: 3rem;

		font-size: 1rem;

		color: var(--text-color);
		background-color: var(--background-color);

		border: none;
		border-radius: 999px;

		padding: 1rem;

		cursor: pointer;
	}

	button:hover {
		text-decoration: underline;
		/* border: 1px solid var(--text-color); */
		/* box-shadow: 0 2px 4px 4px var(--shadow-color); */
	}
</style>
