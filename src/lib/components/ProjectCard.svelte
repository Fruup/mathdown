<script lang="ts">
	import {
		currentProject,
		exportProject,
		storedProjects,
		type Project,
	} from '$lib/project'
	import IconDownload from '$lib/icons/IconDownload.svelte'
	import IconDelete from '$lib/icons/IconDelete.svelte'
	import Button from './Button.svelte'

	const handleDownload = () => {
		exportProject(project)
	}

	const handleDelete = () => {
		localStorage.removeItem('project-' + project.id)
		storedProjects.load()

		currentProject.reset()
	}

	export let project: Project
</script>

<td>{project.name}</td>
<td class="created-at">
	{new Date(project.createdAt).toLocaleString()}
</td>
<td class="actions">
	<Button on:click={handleDownload}>
		<IconDownload />
	</Button>

	<Button on:click={handleDelete}>
		<IconDelete />
	</Button>
</td>

<style>
	.created-at {
		color: var(--text-color-light);
	}

	.actions {
		display: flex;
		flex-direction: row;
	}
</style>
