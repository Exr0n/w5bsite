import fs from "fs";
import metadata from "$lib/pictures/metadata.json";
import { zip } from "$lib";

export async function load({ params }) {
    const g = import.meta.glob("$lib/pictures/*.jpeg", { eager: true, query: { enhanced: true } });
    const defaults = Object.values(g).map(g => g.default);
    const metas = Object.keys(g).map(k => metadata[k.split('/').at(-1)])

    const pics = zip(defaults, metas);

    pics.sort((a, b) => Date.parse(b[1].time) - Date.parse(a[1].time));   // assume picture names are lex-ordered in creation time (eg. from photos.app)

    return { pics }
}