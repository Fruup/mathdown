<script lang="ts">
	import { projectSaved } from '$lib/project'

	$: fill = $projectSaved ? 'var(--accent-green)' : 'var(--accent-red)'

	const dur = '2s'
</script>

<svg width="16" viewBox="-2 -2 4 4">
	<circle cx="0" cy="0" r="1" {fill} />

	{#if !$projectSaved}
		<circle cx="0" cy="0" {fill}>
			<animate attributeName="r" values="1; 2" {dur} repeatCount="indefinite" />
			<animate
				attributeName="opacity"
				values="0.5; 0"
				{dur}
				repeatCount="indefinite"
			/>
		</circle>
	{/if}
</svg>
