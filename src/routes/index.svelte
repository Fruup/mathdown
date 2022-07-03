<script lang="ts">
	import Editor from '$lib/Editor.svelte'
	import Downloader from '$lib/Downloader.svelte'
	import Grid from '$lib/Grid.svelte'
	import Preview from '$lib/Preview.svelte'

	let styleSheet = 1

	function handleClick() {
		styleSheet = styleSheet === 1 ? 2 : 1
	}
</script>

<!-- <button on:click={handleClick}>Style</button> -->

<svelte:head>
	<link rel="stylesheet" href="styles/{styleSheet}.css">
</svelte:head>

<Downloader />

<Grid>
	<Editor slot="col1" />
	<Preview slot="col2" />
</Grid>
