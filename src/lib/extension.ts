import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';

import MathWrapper from './MathWrapper.svelte';

const attrs: string[] = [
  'code',
]

export default Node.create({
  name: 'SvelteMathComponent',
  group: 'inline',
  atom: true,
  draggable: true, // Optional: to make the node draggable
  inline: true,
  selectable: false,

  // addAttributes() {
  //   return {
  //     code: {
  //       default: 'defcode',
  //       keepOnSplit: false,
  //       parseHTML: (element) => element.getAttribute('code'),
  //       renderHTML: (attributes) => attributes['code'],
  //     },
  //   };
  // },

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
        return this.editor.commands.insertContent("<svelte-math-component code='henlo'></svelte-math-component>")
      }
    }
  },
});
