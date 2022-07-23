<script lang="ts" context="module">
	import { get, writable } from "svelte/store"

	export function download(data: Blob, filename: string) {
		const url = window.URL.createObjectURL(data)
		const a = get(anchor)

		a.href = url
		a.download = filename

		a.click()

		window.URL.revokeObjectURL(url)
	}

	const anchor = writable<HTMLAnchorElement>()
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<a bind:this={$anchor} style="display: none" />
