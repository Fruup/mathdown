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
	const isSingleton = writable(false)
</script>

<script lang="ts">
	import { onMount } from "svelte"

	onMount(() => {
		if ($isSingleton)
			throw Error('There can only be one Downloader.svelte instance on the page!')

		$isSingleton = true
	})
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<a bind:this={$anchor} style="display: none" />
