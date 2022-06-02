import type { RequestHandler } from "@sveltejs/kit";

import unified from "unified";
import rehypeParse from "rehype-parse";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { lexer } from "$lib/lang/parser";
import langPlugin from '$lib/lang/plugin';

const katexOptions: katex.KatexOptions = {
	displayMode: true,
	output: "mathml",
};

// unified processor
const unif = unified.unified();
unif.use(rehypeParse);
// unif.use(remarkParse);
// unif.use(langPlugin);
// unif.use(remarkMath);
// unif.use(remarkRehype);
unif.use(rehypeKatex);
unif.use(rehypeStringify);

// post request handler
export const post: RequestHandler = async ({ request }) => {
	const code = await request.text();
	const html = unif.processSync(code).value;

	console.log(code, html)

	// console.log(unif.processSync(code))

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
