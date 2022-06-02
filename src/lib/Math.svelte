<script lang="ts">
	import katex, { type KatexOptions } from 'katex'
	import { tick } from 'svelte';

	function render() {
		katex.render(code, element, options)
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === 'Enter') {
			e.preventDefault()
			editing = false
		}
	}

	const options: KatexOptions = {
		
	}

	export let code: string = '\\Alpha'

	let editing = true
	let element: HTMLElement

	$: if (!editing) {
		tick().then(() => {
			katex.render(code, element, options)
		})
	}
</script>

{#if editing}
	<textarea on:keydown={handleKeydown} on:blur={() => (editing = false)} bind:value={code} cols="20" rows="1"></textarea>
{:else}
	<div bind:this={element} on:click={() => (editing = true)} />
{/if}

<style>
	div {
		display: inline;
		cursor: pointer;
	}

	textarea {
		font-size: 1em;
	}

	textarea::before,
	textarea::after {
		position: absolute;
		content: '$';
	}
</style>
