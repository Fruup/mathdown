<script context="module">
	export let componentIndex = 0
</script>

<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte'
	import type { NodeViewProps } from '@tiptap/core'
	import katex, { type KatexOptions } from 'katex'
	import * as mathEditor from './MathEditor.svelte'
	import { writable, type Unsubscriber } from 'svelte/store'
	import type { MathOptions } from './types'

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

	// export let options: MathOptions = node.attrs.options ?? {
	// 	inline: true,
	// }

	const code = writable(node.attrs.code ?? 'math!')
	const options = writable(node.attrs.options ?? {
		inline: true,
	})

	$: katexOptions = {
		displayMode: !$options.inline,
		throwOnError: false,
	} as KatexOptions

	// export let code: string = node.attrs.code ?? 'math!'
	export let editing = true
	
	let element: HTMLElement

	$: if (editing) {
		mathEditor.init(code, options)
	}

	onDestroy(() => {
		if (editing)
			mathEditor.close()
	})

	$: if (!editing) {
		mathEditor.close()
	}

	$: {
		setTimeout(() => katex.render($code, element, katexOptions))
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
