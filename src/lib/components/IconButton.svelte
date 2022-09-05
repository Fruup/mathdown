<script lang="ts">
	import Button from './Button.svelte'

	export let icon: object
	// export let size: 'sm' | 'md' | 'lg' = 'md'

	// $: style = (() => {
	// 	switch (size) {
	// 		case 'sm': return `size: 16px`;
	// 		default:
	// 	}
	// })()

	export let href: string | undefined
</script>

{#if href}
	<a {href}>
		<svelte:component this={icon} />
	</a>
{:else}
	<Button on:click>
		<svelte:component this={icon} />
	</Button>
{/if}
