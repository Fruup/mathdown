<script lang="ts">
	import katex, { type KatexOptions } from 'katex'
	import { tick, onMount } from 'svelte';

	function render() {
		katex.render(code, element, options)
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === 'Enter') {
			e.preventDefault()
			editing = false
		}
	}

	function handleWindowMousedown(e: MouseEvent) {
		if (e.target !== editor) {
			editing = false
		}
	}

	const options: KatexOptions = {
		
	}

	export let code: string = 'math!'
	export let editing = true
	
	let element: HTMLElement
	let editor: HTMLTextAreaElement
	let preview: HTMLElement

	onMount(async () => {
		await tick()
		editor.select()
	})

	$: if (!editing) {
		tick().then(() => {
			katex.render(code, element, options)
		})
	}

	$: if (editing) {
		tick().then(() => {
			editor.focus()
			katex.render(code, preview, options)
		})
	}
</script>

<svelte:window on:mousedown={handleWindowMousedown} />

{#if editing}
	<div
		class="editor-container"
		on:keydown={handleKeydown}
	>
		<textarea
			class="code"
			bind:value={code}
			bind:this={editor}
		/>
		<div
			class="preview"
			bind:this={preview}
		/>
	</div>
{:else}
	<div
		class="rendered"
		bind:this={element}
		on:click={() => (editing = true)}
	/>
{/if}

<style>
	.rendered {
		display: inline;
		cursor: pointer;
	}

	.rendered:hover {
		border-bottom: 1px solid black;
	}

	.editor-container {
		display: inline-flex;
		flex-direction: column;

		border: 1px solid grey;
		border-radius: 4px;
	}

	.preview {
		text-align: center;
		padding: .25em .5em;
	}

	.code {
		color: grey;

		font-size: 1em;
		padding: .25em .5em;
		border: none;
		outline: none;
		background: transparent;
		border-bottom: 1px solid grey;
	}
</style>
