<script lang="ts">
	import { code } from '$lib/store'
	import { fade } from 'svelte/transition'
	import '$lib/style/output.css'

	let result: string

	$: {
		if ($code) {
			fetch('/api/v1/render', { method: 'post', body: $code })
				.then(async (response) => {
					if (response.ok) {
						result = await response.text()
					}
				})
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
		text-align: left;

		height: 100%;
		max-width: 21.0cm;

		margin: auto;

		font-size: 1em;
		padding: 3em 2.5em;
	}
</style>
