<script lang="ts">
	import Editor from '$lib/Editor.svelte'
	import Grid from '$lib/Grid.svelte'
	import MathEditor from '$lib/MathEditor.svelte'
</script>

<Grid>
	<Editor slot="col1" />
	<MathEditor slot="col2" />
</Grid>
