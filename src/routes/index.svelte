<script lang="ts">
	import Editor from '$lib/Editor.svelte'
	import Preview from '$lib/Preview.svelte'
	import Grid from '$lib/Grid.svelte'
</script>

<Grid>
	<Editor slot="col1" />
	<Preview slot="col2" />
</Grid>
