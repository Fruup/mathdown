import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import type { MathOptions } from './Math.svelte';
import MathWrapper from './MathWrapper.svelte';

export default Node.create({
  name: 'SvelteMathComponent',
  group: 'inline',
  atom: false,
  draggable: true, // Optional: to make the node draggable
  inline: true,
  selectable: false,

  addAttributes() {
    return {
      code: {
        default: 'math!',
      },
      options: {
        default: {
          inline: true,
        } as MathOptions,
      },
    }
  },

  parseHTML() {
    console.log('parse', this)
    return [
      {
        tag: 'svelte-math-component',
        // getAttrs(node) {
        //   if (typeof node === 'string') return false
        //   console.log('getAttrs', Object.fromEntries(attrs.map(attr => [attr, node.getAttribute(attr)])))
        //   return Object.fromEntries(attrs.map(attr => [attr, node.getAttribute(attr)]))
        // }
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    console.log('render', HTMLAttributes, node)
    return ['svelte-math-component', HTMLAttributes]
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
