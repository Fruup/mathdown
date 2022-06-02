import type { Plugin } from 'unified'
import type { Node, Literal } from 'unist'
import { visit } from 'unist-util-visit'
import { lexer } from './parser'

const plugin: Plugin = () => (tree, file) => {
	visit(tree, 'text', (node: Literal<string>) => {
		// console.log(node)

		const regex = /\$([^\$]*)\$/g
		for (const [_, code] of node.value.matchAll(regex)) {
			console.log(lexer.parse(code))
		}
	})
}

export default plugin
