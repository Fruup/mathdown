<script lang="ts">
	import { code } from '$lib/store'
	import { fade } from 'svelte/transition'
	import '$lib/styles/output.css'

	let result: string

	$: {
		if ($code) {
			fetch('/api/v1/render', { method: 'post', body: $code }).then(
				async (response) => {
					if (response.ok) {
						result = await response.text()
					}
				}
			)
		}
	}
</script>

{#if result}
	<div transition:fade class="container">
		{@html result}
	</div>
{/if}

<style>
	.container {
		/* position: relative; */

		text-align: left;

		height: 100%;
		max-width: 21cm;

		margin: auto;
		padding: 2.5em 3em;

		font-size: 1em;
	}

	:global(.container > h1:first-of-type) {
		margin-top: 0;
	}

	:global(a) {
		color: var(--link-color);
	}
</style>
