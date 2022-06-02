import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';

import MathWrapper from './MathWrapper.svelte';

export default Node.create({
  name: 'SvelteMathComponent',
  group: 'inline',
  atom: true,
  draggable: true, // Optional: to make the node draggable
  inline: true,
  selectable: false,

  addAttributes() {
    return {};
  },

  parseHTML() {
    console.log('parse')
    return [{ tag: 'svelte-math-component', attrs: {  } }];
  },

  renderHTML({ HTMLAttributes }) {
    console.log('render')
    return ['svelte-math-component', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return SvelteNodeViewRenderer(MathWrapper);
  },

  addInputRules() {
    return [
        nodeInputRule({
            find: /\$\$/,
            type: this.type,
        }),
    ]
  },

  addKeyboardShortcuts() {
    return {
      'Control-m': () => {
        return this.editor.commands.insertContent("<svelte-math-component></svelte-math-component>")
      }
    }
  },
});
