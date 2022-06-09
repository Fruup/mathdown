<script context="module" lang="ts">
	export type MathOptions = {
		inline: boolean,
	}
</script>

<script lang="ts">
	import { onDestroy, tick } from 'svelte'
	import type { NodeViewProps } from '@tiptap/core'
	import katex, { type KatexOptions } from 'katex'
	import * as mathEditor from './MathEditor.svelte'
	import type { Unsubscriber } from 'svelte/store';

	function render() {
		katex.render(code, element, katexOptions)
	}

	function store() {
		updateAttributes({
			code,
			options,
		})
	}

	export let editor: NodeViewProps['editor']
	export let node: NodeViewProps['node']
	export let decorations: NodeViewProps['decorations']
	export let selected: NodeViewProps['selected']
	export let extension: NodeViewProps['extension']
	export let getPos: NodeViewProps['getPos']
	export let updateAttributes: NodeViewProps['updateAttributes']
	export let deleteNode: NodeViewProps['deleteNode']

	export let options: MathOptions = node.attrs.options ?? {
		inline: true,
	}

	$: katexOptions = {
		displayMode: !options.inline,
		throwOnError: false,
	} as KatexOptions

	export let code: string = node.attrs.code ?? 'math!'
	export let editing = true
	
	let element: HTMLElement

	let unsubs: Unsubscriber[] = []

	$: if (editing) {
		// initialize math editor
		mathEditor.code.set(code)
		mathEditor.target.set(element)
		mathEditor.show.set(true)
		mathEditor.options.set(options)

		// subscribe to math editor values
		unsubs = [
			mathEditor.code.subscribe((value) => {
				code = value
				tick().then(render)
				tick().then(store)
			}),
			mathEditor.show.subscribe((value) => {
				if (!value)
					editing = false
			}),
			mathEditor.options.subscribe((value) => (options = value)),
		]
	}

	onDestroy(() => {
		if (editing)
			mathEditor.show.set(false)
	})

	$: if (!editing) {
		// hide editor and unsubscribe from its values
		mathEditor.show.set(false)
		unsubs.forEach(f => f())
	}
</script>

<div
	class="rendered"
	bind:this={element}
	class:editing
	on:click={() => (editing = true)}
/>

<style>
	.rendered {
		display: inline;
		cursor: pointer;
	}

	/* .rendered.editing {
		--color: rgb(64, 64, 64);
		--blur-radius: 1px;

		text-shadow: 1px 0 .5px var(--color), -1px 0 var(--blur-radius) var(--color), 0 1px var(--blur-radius) var(--color), 0 -1px var(--blur-radius) var(--color);
		color: rgb(200, 200, 200);
	} */

	/* .rendered:hover,
	.rendered.editing {
		border-bottom: 1px solid black;
	} */
</style>
