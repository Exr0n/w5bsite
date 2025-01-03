import fs from "fs";
import metadata from "$lib/pictures/metadata.json";
import { zip } from "$lib";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const g = import.meta.glob("$lib/pictures/*.jpeg", { eager: true });
    const paths = Object.values(g).map(g => g.default);
    const metas = Object.keys(g).map(k => metadata[k.split('/').at(-1)])

    const pics = zip(paths, metas);
    pics.sort((a, b) => Date.parse(b[1].time) - Date.parse(a[1].time));   // assume picture names are lex-ordered in creation time (eg. from photos.app)

    const tags = ['portrait', 'silhouette', 'landscape', 'object', 'astral'];
    if (params.tag.split('/').length > 1 || (params.tag > 1 && !tags.includes(params.tag))) error(404, `Could not find ${params.tag}.`);

    return { pics, tags, tag: params.tag || null }
}