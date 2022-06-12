import { Node, type JSONContent } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import type { MathOptions } from './types';
import MathWrapper from './MathWrapper.svelte';

export const defaultCode: string = 'math!'
export const defaultOptions: MathOptions = {
  inline: true,
}

const nodeName = "SvelteMathComponent"

function createNodeContent(params?: { code?: string, options?: MathOptions }): JSONContent {
  params = params ?? {}

  return {
    type: nodeName,
    attrs: {
      code: params.code ?? defaultCode,
      options: params.options ?? defaultOptions,
    },
  }
}

export default Node.create({
  name: nodeName,
  group: 'inline',
  atom: false,
  draggable: true, // Optional: to make the node draggable
  inline: true,
  selectable: false,

  addAttributes() {
    return {
      code: {
        default: defaultCode,
      },
      options: {
        default: defaultOptions as MathOptions,
      },
    }
  },

  parseHTML() {
    return [{ tag: nodeName }];
  },

  renderHTML({ HTMLAttributes, node }) {
    return ['svelte-math-component', HTMLAttributes]
  },

  addNodeView() {
    return SvelteNodeViewRenderer(MathWrapper);
  },

  addInputRules() {
    const self = this
    return [
      {
        find: /\$\$\s/,
        handler({ commands, range }) {
          commands.deleteRange(range)

          setTimeout(() => {
            self.editor.commands.insertContent(createNodeContent({ options: { inline: false } }))
          })
        },
      },
      {
        find: /\$\s/,
        handler({ commands, range }) {
          commands.deleteRange(range)

          setTimeout(() => {
            self.editor.commands.insertContent(createNodeContent())
          })
        },
      },
    ]
  },

  addKeyboardShortcuts() {
    return {
      'Control-m': () => {
        return this.editor.commands.insertContent(createNodeContent())
      }
    }
  },
});
