<script lang="ts">
import { browser } from '$app/env';

	import { onDestroy, onMount } from 'svelte';
	import { code } from './store';

	onMount(() => {
		
	})

	onDestroy(() => {

	})

	let myCode: string = $code
	let timer: NodeJS.Timeout

	const DEBOUNCE_TIME = 500

	$: {
		if (typeof timer !== 'undefined') clearTimeout(timer)
		timer = setTimeout(() => {
			$code = myCode

			if (browser)
				localStorage.setItem('code', myCode)
		}, DEBOUNCE_TIME)
	}
</script>

<div class="container">
	<textarea
		class="editor"
		bind:value={myCode}
	/>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
	}

	.editor {
		outline: none;
		border: none;
		
		padding: 2.5em 3em;
		font-size: 1em;

		width: 100%;
		height: 100%;
	}
</style>
