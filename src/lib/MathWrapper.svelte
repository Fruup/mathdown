<script lang="ts">
	import type { NodeViewProps } from '@tiptap/core';
	import { NodeViewWrapper } from 'svelte-tiptap'
	import Math from './Math.svelte'

	export let node: NodeViewProps['node']
	export let updateAttributes: NodeViewProps['updateAttributes']
	export let selected: NodeViewProps['selected'] = false

	let code: string

	$: {
		updateAttributes({ code: code })
		console.log('code', code, node.attrs)
	}
	$: console.log('selected', selected)
	$: console.log('node', node)
</script>

<NodeViewWrapper>
	<Math bind:code />
</NodeViewWrapper>

<style>
	:global([data-node-view-wrapper]) {
		display: inline;
	}
</style>
