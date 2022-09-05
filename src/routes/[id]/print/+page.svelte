<script lang="ts">
	import Preview from '$lib/components/Preview.svelte'
	import type { PageData } from './$types'

	export let data: PageData

	const { projectId } = data
</script>

<div class="container">
	<Preview {projectId} />
</div>

<style>
	.container {
		text-align: center;
	}
</style>
