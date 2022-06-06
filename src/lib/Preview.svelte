<script lang="ts">
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
</div>

<style>
	.container {
		user-select: text;

		width: 100%;
		height: 100%;

		margin: 2rem;
	}
</style>
