<script lang="ts">
	import Editor from '$lib/components/Editor.svelte'
	import Grid from '$lib/layout/Grid.svelte'
	import Preview from '$lib/components/Preview.svelte'
	import { currentProject, generateProjectId, storeProject } from '$lib/project'
	import { showProjectNameOverlay, showProjectsOverlay } from '$lib/store'

	const handleKeydownWindow = (e: KeyboardEvent) => {
		if ($showProjectNameOverlay || $showProjectsOverlay) return

		if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault()

			if (!$currentProject) {
				$currentProject = {
					id: generateProjectId(),
					code: '',
				}
			}

			if (!$currentProject.name) $showProjectNameOverlay = true
			else storeProject($currentProject)
		}
	}
</script>

<svelte:window on:keydown={handleKeydownWindow} />

<Grid>
	<Editor slot="col1" />
	<Preview slot="col2" />
</Grid>
