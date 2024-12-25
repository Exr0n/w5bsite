export async function load({ params }) {
    const paths = import.meta.glob("$lib/writing/*.md", { eager: true });
    const posts = Object.entries(paths)
                    .filter(([s, m]) => s.endsWith('.md'))
                    .map(([s, m]) => [s.split('/').at(-1).replace('.md', ''), m.metadata]);

    const reading_durations = await Promise.all(
        posts.map(async ([slug, _], i) => {
            const content = (await import(`$lib/writing/${slug}.md?raw`)).default;
            const words = (content.match(/\w\s\w/g) || []).length;
            const time = words / 250; // read at 230-260 wpm
            return time;
        })
    )

    const zip = (a, b) => a.map((x, i) => [x, b[i]]);

    return { posts: zip(posts, reading_durations) }
}