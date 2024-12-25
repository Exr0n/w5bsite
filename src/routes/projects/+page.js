export async function load() {
    const post = await import(`./projects.md`);
    return { content: post.default };
}