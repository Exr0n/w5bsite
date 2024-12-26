import { mdsvex } from "mdsvex";
import adapter from '@sveltejs/adapter-static';

import fs from 'fs';
import path from 'path';

// mdsvex config from https://joyofcode.xyz/sveltekit-markdown-blog#posts-api-endpoint
/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	// highlight: {
	// 	highlighter: async (code, lang = 'text') => {
	// 		const highlighter = await createHighlighter({
	// 			themes: ['poimandres'],
	// 			langs: ['javascript', 'typescript']
	// 		})
	// 		await highlighter.loadLanguage('javascript', 'typescript')
	// 		const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }))
	// 		return `{@html \`${html}\` }`
	// 	}
	// },
}

const mdFiles = fs
  .readdirSync('src/lib/writing')
  .filter((file) => file.endsWith('.md'))
  .map((file) => `/writing/${file.replace('.md', '')}`);

function getWildernesFiles(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	let files = [];

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files = files.concat(getWildernesFiles(fullPath));
		} else if (entry.isFile()) {
			files.push(path.join('/wildernessfile/', entry.parentPath.replace(/^static\/wilderness/, ''), entry.name))
		}
	}

	return files;
}

const wildernesFiles = getWildernesFiles('static/wilderness');
console.log('writings md files', mdFiles)
console.log('wilderness files', wildernesFiles)

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			pages: "build",
			assets: "build",
			strict: false,
		}),
		prerender: {
			// pre-render slug blog pages, from https://stackoverflow.com/a/78493635
			crawl: true,
			entries: ['/', ...mdFiles, ...wildernesFiles],
		}
	},

    preprocess: [mdsvex(mdsvexOptions)],
    extensions: [".svelte", ".svx", ".md"]
};

export default config;
