<script lang="ts">
	import type { NodeViewProps } from '@tiptap/core';
	import { NodeViewWrapper } from 'svelte-tiptap'
	import Math from './Math.svelte'

	export let editor: NodeViewProps['editor']
	export let node: NodeViewProps['node']
	export let decorations: NodeViewProps['decorations']
	export let selected: NodeViewProps['selected']
	export let extension: NodeViewProps['extension']
	export let getPos: NodeViewProps['getPos']
	export let updateAttributes: NodeViewProps['updateAttributes']
	export let deleteNode: NodeViewProps['deleteNode']
</script>

<NodeViewWrapper>
	<Math
		{editor}
		{node}
		{decorations}
		{selected}
		{extension}
		{getPos}
		{updateAttributes}
		{deleteNode}
	/>
</NodeViewWrapper>

<style>
	:global([data-node-view-wrapper]) {
		display: inline;
	}
</style>
