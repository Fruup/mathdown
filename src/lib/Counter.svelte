<script>
	import { NodeViewWrapper } from 'svelte-tiptap'

	let count = 0
</script>

<NodeViewWrapper>
	<button on:click={() => count += 1}>
		Click me {count}
	</button>
</NodeViewWrapper>

<style>
	:global([data-node-view-wrapper]) {
		display: inline;
	}
</style>
