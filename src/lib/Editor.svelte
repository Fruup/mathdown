<script lang="ts">
	import { Editor } from '@tiptap/core'
	import MyExtension from './extension'
	import StarterKit from '@tiptap/starter-kit'
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition'
	import { html } from './store';
	import './Editor.css'

	onMount(() => {
		StarterKit.configure({
			code: {},
		})

		editor = new Editor({
			element,
			extensions: [
				MyExtension,
				StarterKit,
			],
			// content: '<p>Hello world! 🌍️</p>',
			onTransaction() {
				// force rerender so 'editor.isActive' works as expected
				editor = editor
			},
			onUpdate({ transaction }) {
				// $html = editor.getHTML()
			},
		})
		
		$html = editor.getHTML()
	})

	onDestroy(() => {
		if (editor) editor.destroy()
	})

	function handleBodyKeydown(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === 's') {
			e.preventDefault()
		}
		else if (e.ctrlKey && e.key === 'p') {
			e.preventDefault()
		}
	}

	let element: Element
	let editor: Editor
</script>

<svelte:body on:keydown={handleBodyKeydown} />

<div class="container">
	{#if editor}
		<header transition:fly={{ delay: 500, y: -50, duration: 750 }}>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
				class:active={editor.isActive('heading', { level: 1 })}
			>
				H1
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class:active={editor.isActive('heading', { level: 2 })}
			>
				H2
			</button>
			<button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
				P
			</button>
			<button on:click={() => editor.chain().focus().toggleCode().run()} class:active={editor.isActive('code')}>
				code
			</button>
		</header>
	{/if}

	<div
		spellcheck="false"
		class="editor"
		class:active={editor && editor.isActive({})}
		bind:this={element}
	/>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
	}

  button.active {
    background: black;
    color: white;
  }

	.editor {
		flex-grow: 1;
		opacity: 0;
		transition: opacity 500ms ease-in;
	}

	.editor.active {
		opacity: 1;
	}

	header {
		text-align: center;
		padding: .5rem;
		background: rgba(0, 0, 0, .1);
		border-bottom: 1px solid black;
	}
</style>
