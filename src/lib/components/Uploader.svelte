<script lang="ts" context="module">
	import { get, writable } from 'svelte/store'

	export const upload = async (callback: (result: string) => any) => {
		const inputElem = get(input)

		inputElem.onchange = async () => {
			if (inputElem.files.length === 0) return

			const file = inputElem.files[0]
			const result = await file.text()

			callback(result)
		}

		inputElem.click()
	}

	const input = writable<HTMLInputElement>()
</script>

<input bind:this={$input} type="file" style="display: none" />
