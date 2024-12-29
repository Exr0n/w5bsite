import fs from "fs";

export async function load({ params }) {
    const g = import.meta.glob("$lib/pictures/*.jpeg", { eager: true });
    const paths = Object.keys(g);

    const sorted = paths.map(p => [p, fs.statSync('.' + p).birthtime]).sort((a, b) => b[1]-a[1]).map(([a, b]) => a)

    return { paths: sorted }
}