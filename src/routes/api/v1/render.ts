import type { RequestHandler } from "@sveltejs/kit"

import unified from "unified"
import rehypeParse from "rehype-parse"
import remarkParse from "remark-parse"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeRemark from "rehype-remark"

const katexOptions: katex.KatexOptions = {
	strict: false,
}

// unified processor
const unif = unified.unified()
// unif.use(rehypeParse)
unif.use(remarkParse)
// unif.use(rehypeParse, {
// 	fragment: true,
// })
// unif.use(rehypeRemark, {
// 	newlines: true,
// })
unif.use(remarkMath)
unif.use(remarkRehype)
unif.use(rehypeKatex, katexOptions)
unif.use(rehypeStringify)

// post request handler
export const POST: RequestHandler = async ({ request }) => {
	const code = await request.text()
	const compiled = unif.processSync(code)
	// console.log(unif.parse(code))
	const html = compiled.value

	if (typeof html !== "string") {
		console.log(html)
		return { status: 500, statusText: "Code did not render to string!" }
	}

	// respond
	return {
		body: html,
		status: 200,
	}
}
