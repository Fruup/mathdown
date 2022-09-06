<script context="module" lang="ts">
	export const editorCode = writable<string>('')
	export const editor = writable<EditorView>()

	const markdownLanguage = markdown()

	const createEditorState = (code?: string) =>
		EditorState.create({
			doc: code,
			extensions: [
				EditorView.updateListener.of((editor) => {
					if (!editor.docChanged) return
					editorCode.set(editor.state.sliceDoc())
				}),

				// basicSetup,
				minimalSetup,
				EditorView.lineWrapping,

				// lineNumbers(),
				highlightActiveLine(),
				highlightSpecialChars({
					addSpecialChars: /\$/,
					render(code, desc, placeholder) {
						const elem = document.createElement('span')
						elem.style.color = 'var(--dollarColor)'
						elem.innerText = String.fromCharCode(code)
						return elem
					},
				}),

				markdownLanguage,
			],
		})

	export const createEditor = (parent: HTMLElement, code?: string) => {
		const state = createEditorState(code)

		return editor.set(
			new EditorView({
				parent,
				state,
			})
		)
	}

	export const destroyEditor = () => {
		editor.update((editor) => {
			editor.destroy()
			return undefined
		})
	}

	export const setEditorState = (code: string) => {
		editor.update((editor) => {
			editor.setState(createEditorState(code))
			editorCode.set(code)
			return editor
		})
	}
</script>

<script lang="ts">
	import { browser } from '$app/environment'
	import { onDestroy, onMount } from 'svelte'
	import { markdown } from '@codemirror/lang-markdown'
	import { EditorState } from '@codemirror/state'
	import {
		lineNumbers,
		highlightActiveLine,
		highlightSpecialChars,
	} from '@codemirror/view'
	import { EditorView, minimalSetup } from 'codemirror'
	import { DebouncedAction } from '$lib/helpers'
	import { currentProject, projectSaved, storeProject } from '$lib/project'
	import { writable } from 'svelte/store'

	onMount(() => {
		if (!$editor) createEditor(editorContainer, $editorCode)
	})

	onDestroy(() => {
		if ($editor) destroyEditor()
	})

	let editorContainer: HTMLElement

	const action = new DebouncedAction(() => {
		if (browser) {
			$currentProject.code = $editorCode

			// if ($currentProject?.name) storeProject($currentProject)
			$projectSaved = false
		}
	}, 500)

	$: if ($editorCode) {
		action.invoke()
	}
</script>

<div
	class="editor-container"
	on:click={() => $editor.focus()}
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
