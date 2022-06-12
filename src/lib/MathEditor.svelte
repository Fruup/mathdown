<script lang="ts" context="module">
	import type { MathOptions } from "./types"
	import { get, writable, type Writable } from "svelte/store"

	const codeStore = writable<Writable<string>>()
	const optionsStore = writable<Writable<MathOptions>>()

	export async function init(code: Writable<string>, options: Writable<MathOptions>) {
		codeStore.set(code)
		optionsStore.set(options)
	}

	export function close() {
		codeStore.set(undefined)
		optionsStore.set(undefined)
	}
</script>

<script lang="ts">
	import { onMount, tick } from "svelte"
	import Checkbox from "./Checkbox.svelte"
	import { editor } from "./Editor.svelte"

	function handleSave() {
		if ($editor) {
			const content = $editor.getJSON()
			localStorage.setItem('content', JSON.stringify(content))
			console.log($editor.getHTML())
		}
	}

	function handleLoad() {
		if ($editor) {
			const content = localStorage.getItem('content')
			if (content)
				$editor.commands.setContent(JSON.parse(content), true)
			console.log($editor.getHTML())
			console.log($editor.getJSON())
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === 'Enter') {
			e.preventDefault()
			close()
		}
	}

	function handleWindowMousedown(e: MouseEvent) {
		if (e.target !== textarea) {
			close()
		}
	}

	onMount(async () => {
		await tick()
		if (textarea) textarea.select()
	})

	let textarea: HTMLTextAreaElement

	$: code = $codeStore
	$: options = $optionsStore
	$: show = options && code

	$: if (show) {
		tick().then(() => {
			if (textarea) textarea.select()
		})
	}
</script>

<!-- <svelte:window on:mousedown={handleWindowMousedown} /> -->

<button on:click={handleSave}>
	Save
</button>
<button on:click={handleLoad}>
	Load
</button>

{#if show}
	<div
		class="math-editor"
		on:keydown={handleKeydown}
	>
		<header class="options">
			<Checkbox label="inline" bind:checked={$options.inline} />
		</header>

		<textarea
			class="code"
			bind:value={$code}
			bind:this={textarea}
		/>
	</div>
{/if}

<style>
	.math-editor {
		width: 100%;
		height: 100%;

		display: inline-flex;
		flex-direction: column;
	}

	.options {
		width: 100%;

		text-align: center;
		padding: .5rem;
		background: rgba(0, 0, 0, .1);
		border-bottom: 1px solid black;
	}

	.code {
		height: 100%;

		color: grey;

		font-size: 1em;
		padding: .25em .5em;
		border: none;
		outline: none;
		background: transparent;
		border-bottom: 1px solid grey;
	}
</style>
