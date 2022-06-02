import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';

import MathWrapper from './MathWrapper.svelte';

export default Node.create({
  name: 'svelteCounterComponent',
  group: 'inline',
  atom: true,
  draggable: true, // Optional: to make the node draggable
  inline: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'svelte-counter-component' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['svelte-counter-component', mergeAttributes(HTMLAttributes)];
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
});
