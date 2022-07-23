<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import Editor from '$lib/components/Editor.svelte'
	import Grid from '$lib/layout/Grid.svelte'
	import Preview from '$lib/components/Preview.svelte'
</script>

<Grid>
	<Editor slot="col1" />
	<Preview slot="col2" />
</Grid>
