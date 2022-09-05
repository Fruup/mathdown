<script lang="ts">
	import { currentProject, storedProjects } from '$lib/project'
	import '$lib/styles/output.css'

	let result: string

	export let projectId: string = undefined

	$: project = projectId
		? $storedProjects.find((p) => p.id === projectId)
		: $currentProject

	$: if (project?.code) {
		fetch('/api/v1/render', {
			method: 'post',
			body: project.code,
		}).then(async (response) => {
			if (response.ok) {
				result = await response.text()
			}
		})
	}
</script>

{#if result}
	<div class="container">
		{@html result}
	</div>
{/if}

<style>
	.container {
		text-align: left;

		height: 100%;
		max-width: 21cm;

		margin: auto;
		padding: 2.5em 3em;

		font-size: 1em;
	}

	:global(.container > h1:first-of-type) {
		margin-top: 0;
	}

	:global(a) {
		color: var(--link-color);
	}
</style>
