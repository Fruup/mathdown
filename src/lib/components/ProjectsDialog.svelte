<script lang="ts">
	import IconUpload from '$lib/icons/IconUpload.svelte'
	import { currentProject, storeProject, type Project } from '$lib/project'
	import { showProjectsOverlay } from '$lib/store'
	import Button from './Button.svelte'
	import { setEditorState } from './Editor.svelte'
	import ProjectList from './ProjectList.svelte'
	import { upload } from './Uploader.svelte'

	const handleImport = () => {
		upload((result) => {
			try {
				const project: Project = JSON.parse(result)

				$currentProject = project
				setEditorState(project.code)
				$showProjectsOverlay = false

				storeProject($currentProject)
			} catch (error) {
				console.error(error)
			}
		})
	}
</script>

<div class="container">
	<div class="actions">
		<Button on:click={handleImport}>
			<IconUpload />
		</Button>
	</div>

	<ProjectList />
</div>

<style>
	.container {
		--margin: 3rem;

		position: relative;

		display: grid;
		place-items: center;

		height: 100%;

		padding: var(--margin);
	}

	.actions {
		position: absolute;
		top: var(--margin);
		right: var(--margin);
	}
</style>
