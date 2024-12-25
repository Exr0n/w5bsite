// from https://joyofcode.xyz/sveltekit-markdown-blog#posts-api-endpoint
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const post = await import(`$lib/writing/${params.slug}.md`);
		// const post = await import(`../../../lib/writing/gestalt-perfectionism.md`);
		// const post = await import("$lib/writing/gestalt-perfectionism.md");
		console.log(post)

		console.log("meta", post.metadata)

		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
