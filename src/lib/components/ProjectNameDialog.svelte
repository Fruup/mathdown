<script lang="ts">
	import { currentProject, storedProjects, storeProject } from '$lib/project'
	import { showProjectNameOverlay } from '$lib/store'
	import { onMount } from 'svelte'

	const handleKeydownWindow = (e: KeyboardEvent) => {
		if ($showProjectNameOverlay && $currentProject.name && e.key === 'Enter') {
			$showProjectNameOverlay = false

			storeProject($currentProject)
			storedProjects.load()
		}
	}

	let inputElement: HTMLInputElement

	onMount(() => {
		if (inputElement) inputElement.focus()
	})
</script>

<svelte:window on:keydown={handleKeydownWindow} />

<div class="container">
	<label>
		Enter a name for your project
		<input
			type="text"
			placeholder="Name..."
			bind:value={$currentProject.name}
			bind:this={inputElement}
		/>
	</label>
</div>

<style>
	.container {
		display: grid;
		place-items: center;

		width: 100%;
		height: 100%;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
