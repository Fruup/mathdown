import type { RequestHandler } from "@sveltejs/kit";

import unified from "unified";
import rehypeParse from "rehype-parse";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const katexOptions: katex.KatexOptions = {

	strict: false,
};

// unified processor
const unif = unified.unified();
// unif.use(rehypeParse);
unif.use(remarkParse);
// unif.use(langPlugin);
unif.use(remarkMath);
unif.use(remarkRehype);
unif.use(rehypeKatex, katexOptions);
unif.use(rehypeStringify);

// post request handler
export const post: RequestHandler = async ({ request }) => {
	const code = await request.text();
	const html = unif.processSync(code).value;

	if (typeof html !== "string") {
		console.log(html)
		return { status: 500, statusText: "Code did not render to string!" };
	}

	// respond
	return {
		body: html,
		status: 200,
	};
}
