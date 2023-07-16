import { error } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const katexOptions: katex.KatexOptions = {
	strict: false,
}

// unified processor
const processor = unified()

processor
	.use(remarkParse)
	.use(remarkMath)
	.use(remarkRehype)
	.use(rehypeKatex, katexOptions)
	.use(rehypeStringify)

// post request handler
export const POST: RequestHandler = async ({ request }) => {
	const code = await request.text()
	const compiled = processor.processSync(code)
	const html = compiled.value

	if (typeof html !== 'string') {
		throw error(500, 'Code did not render to string!')
	}

	// respond
	return new Response(html)
}
