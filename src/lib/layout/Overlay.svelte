<script lang="ts">
	import { scale, fade } from 'svelte/transition'

	const handleClick = (e: MouseEvent) => {
		if (dismissable && e.target === backgroundElement) open = false
	}

	const handleKeydown = (e: KeyboardEvent) => {
		if (dismissable && e.key === 'Escape') open = false
	}

	let backgroundElement: HTMLElement

	export let open = false
	export let size: 's' | 'm' | 'l' = 'm'
	export let dismissable = true

	$: cssVariables = (() => {
		switch (size) {
			case 's':
				return `
					--width: 576px;
					--height: 324px;
				`

			case 'm':
				return `
					--width: 768px;
					--height: 432px;
				`

			case 'l':
				return `
					--width: 960px;
					--height: 540px;
				`
		}
	})()
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<div
		on:pointerdown={handleClick}
		transition:fade
		class="overlay-background"
		bind:this={backgroundElement}
	>
		<div
			style={cssVariables}
			transition:scale={{ duration: 150, start: 0.8 }}
			class="overlay-container"
		>
			<slot />
		</div>
	</div>
{/if}

<style>
	.overlay-background {
		position: fixed;
		top: 0;
		bottom: 0;

		width: 100vw;
		height: 100vh;

		background-color: rgba(0, 0, 0, 0.3);

		display: grid;
		place-content: center;

		z-index: 100;
	}

	.overlay-container {
		/* display: grid; */
		/* place-content: center; */

		width: min(100vw, var(--width));
		height: min(100vh, var(--height));

		background-color: var(--background-color);

		border-radius: 48px;
	}
</style>
