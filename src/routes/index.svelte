<script lang="ts">
	import Editor from '$lib/components/Editor.svelte'
	import Downloader from '$lib/components/Downloader.svelte'
	import Grid from '$lib/layout/Grid.svelte'
	import Preview from '$lib/components/Preview.svelte'

	let styleSheet = 1

	function handleClick() {
		styleSheet = styleSheet === 1 ? 2 : 1
	}
</script>

<!-- <button on:click={handleClick}>Style</button> -->

<svelte:head>
	<!-- {#if styleSheet === 1}
		<link rel="stylesheet" href="styles/1.css">
	{:else if styleSheet === 2}
		<link rel="stylesheet" href="styles/2.css">	
	{/if} -->

	<!-- <link rel="stylesheet" href="styles/{styleSheet}.css">	 -->
</svelte:head>

<Downloader />

<Grid>
	<Editor slot="col1" />
	<Preview slot="col2" />
</Grid>
