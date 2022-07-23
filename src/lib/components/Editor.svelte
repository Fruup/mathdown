<script lang="ts">
	import { browser } from '$app/env'
	import { onDestroy, onMount } from 'svelte'
	import { code } from '$lib/store'
	import { markdown } from '@codemirror/lang-markdown'
	import { EditorState } from '@codemirror/state'
	import {
		lineNumbers,
		highlightActiveLine,
		highlightSpecialChars,
	} from '@codemirror/view'
	import { EditorView, minimalSetup } from 'codemirror'
	import { DebouncedAction } from '$lib/helpers'

	onMount(async () => {
		const markdownLanguage = markdown()

		const state = EditorState.create({
			doc: myCode,
			extensions: [
				EditorView.updateListener.of((editor) => {
					if (!editor.docChanged) return
					myCode = editor.state.sliceDoc()
				}),

				// basicSetup,
				minimalSetup,
				EditorView.lineWrapping,

				// lineNumbers(),
				// highlightActiveLine(),
				highlightSpecialChars({
					addSpecialChars: /\$/,
					render(code, desc, placeholder) {
						const elem = document.createElement('span')
						elem.style.color = 'var(--dollarColor)'
						elem.innerText = String.fromCharCode(code)
						return elem
					}
				}),

				markdownLanguage,
			],
		})

		editor = new EditorView({
			parent: editorContainer,
			state,
		})
	})

	onDestroy(() => {
		if (editor) editor.destroy()
	})

	let myCode = $code || ''
	let editorContainer: HTMLElement
	let editor: EditorView

	const action = new DebouncedAction(() => {
		$code = myCode
		if (browser) localStorage.setItem('code', $code)
	}, 500)

	$: if (myCode) action.invoke()
</script>

<div
	class="editor-container"
	on:click={() => editor.focus()}
	bind:this={editorContainer}
/>

<style>
	@import '$lib/styles/editor.css';

	.editor-container {
		width: 100%;
		height: 100%;

		cursor: text;

		--dollarColor: blueviolet;
	}
</style>
