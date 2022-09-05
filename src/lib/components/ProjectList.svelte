<script lang="ts">
	import { currentProject, storedProjects, type Project } from '$lib/project'
	import { showProjectsOverlay } from '$lib/store'
	import { setEditorState } from './Editor.svelte'
	import ProjectCard from './ProjectCard.svelte'

	const handleClickProject = (e: MouseEvent, project: Project, i: number) => {
		if ((e.target as HTMLElement).nodeName !== 'TD') return

		$currentProject = project
		$showProjectsOverlay = false
		setEditorState(project.code)
	}
</script>

{#if $storedProjects.length > 0}
	<table class="list">
		<thead>
			<tr>
				<th>Name</th>
				<th>Created at</th>
				<th>Actions</th>
			</tr>
		</thead>

		<tbody>
			{#each $storedProjects as project, i}
				<tr class="project" on:click={(e) => handleClickProject(e, project, i)}>
					<ProjectCard {project} />
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	No projects stored...
{/if}

<style global lang="scss">
	.list {
		margin: 0;
		padding: 1rem;
		width: 100%;

		border-collapse: collapse;
	}

	.project {
		cursor: pointer;

		transition: box-shadow 250ms;

		&:hover {
			box-shadow: 0 0 10px 10px var(--text-color-light--alpha);
		}
	}

	tbody td:nth-child(even) {
		background-color: var(--background-color-highlight);
	}

	th,
	td {
		padding: 1rem;
		text-align: center;

		& > * {
			margin: auto;
		}
	}

	thead {
		border-bottom: 1px solid var(--text-color-light);
	}

	th:not(:last-child),
	td:not(:last-child) {
		border-right: 1px solid var(--text-color-light);
	}
</style>
