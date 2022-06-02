<script lang="ts">
	import { html } from "./store";

	// let result: string

	// $: {
	// 	if ($html) {
	// 		fetch('/api/v1/render', { method: 'post', body: $html })
	// 			.then(async (response) => {
	// 				if (response.ok) {
	// 					result = await response.text()
	// 				}
	// 			})
	// 	}
	// }
</script>

<div class="container">
	<!-- {@html result} -->
	{@html $html}
</div>

<style>
	.container {
		user-select: text;

		width: 100%;
		height: 100%;

		margin: 2rem;
	}
</style>
