// from https://joyofcode.xyz/sveltekit-markdown-blog#posts-api-endpoint
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const post = await import(`$lib/writing/${params.slug}.md`);

		const content = (await import(`$lib/writing/${params.slug}.md?raw`)).default;
		const words = (content.match(/\w\s\w/g) || []).length;
		const time = words / 250; // read at 230-260 wpm

		return {
			content: post.default,
			meta: post.metadata,
			duration: time,
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
