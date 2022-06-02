<script lang="ts">
	import { NodeViewWrapper } from 'svelte-tiptap'
	import Math from './Math.svelte'

	export let code: string
</script>

<NodeViewWrapper>
	<Math bind:code />
</NodeViewWrapper>

<style>
	:global([data-node-view-wrapper]) {
		display: inline;
	}
</style>
