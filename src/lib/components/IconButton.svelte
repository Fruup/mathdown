<script lang="ts">
	import Button from './Button.svelte'

	export let icon: object
</script>

<Button on:click>
	<svelte:component this={icon} />
</Button>
