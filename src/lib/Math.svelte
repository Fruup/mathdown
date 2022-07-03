<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import type { NodeViewProps } from '@tiptap/core'
	import katex, { type KatexOptions } from 'katex'
	import * as mathEditor from './MathEditor.svelte'
	import { writable } from 'svelte/store'

	const code = writable(node.attrs.code ?? defaultCode)
	const options = writable(node.attrs.options ?? defaultOptions)

	$: katexOptions = {
		displayMode: !$options.inline,
		throwOnError: false,
	} as KatexOptions

	function handleClick() {
		mathEditor.init(code, options)
	}
	
	let element: HTMLElement

	onMount(() => {
		mathEditor.init(code, options)
	})
	
	onDestroy(() => {
		console.log('onDestroy')
		mathEditor.close()
	})

	$: setTimeout(() => {
		let _code = $code
		if (katexOptions.displayMode)
			_code = `\\begin{align*}\n${$code}\n\\end{align*}`

		katex.render(_code, element, katexOptions)
	})
</script>

<div
	class="rendered"
	bind:this={element}
	on:click={handleClick}
/>

<style>
	.rendered {
		display: inline;
		cursor: pointer;
	}
</style>
