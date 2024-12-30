<script>
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import Pic from './Pic.svelte';
    import metadata from '$lib/pictures/metadata.json';
    import Sep from '$lib/components/sep.svelte';
    import { MapPinAltSolid } from 'flowbite-svelte-icons';
    import { formatDate } from '$lib';
    const { data } = $props();

    const tags = ['portrait', 'silhouette', 'landscape', 'object', 'astral']
    const tag_display = { 'portrait': 'por', 'landscape': 'scape', 'object': 'obj', 'silhouette': 'sil', 'fog': 'fog', 'astral': 'ast' }
    let tag_filter = $state('portrait');

    const pics = $derived((() => {
        const g = data.pics;
        return g.filter(([p, m]) => m.tags.includes(tag_filter))
    })());

    const PHOTO_SPACING = 12

    let innerWidth = $state(0);
    const breakpoint_lg = 1024;  // px, from tailwind

    let nat_widths = $state({});
    let nat_heights = $state({});

    let open_pic = $state(null);
    let open_meta = $derived(open_pic !== null ? pics[open_pic][1] : null);
    let open_is_wide = $derived(nat_widths[open_pic] > nat_heights[open_pic]);

    const key_handler = (ev) => {
        if (ev.key == 'Escape') open_pic = null;
        if (ev.key == 'ArrowRight' || ev.key == 'ArrowDown' || ev.key == 'j') open_pic = (open_pic + 1) % pics.length;
        if (ev.key == 'ArrowLeft' || ev.key == 'ArrowUp' || ev.key == ' ' || ev.key == 'k') open_pic = (open_pic - 1 + pics.length) % pics.length;
    }
</script>
<div class="hidden p-12 space-x-12 space-y-12 sm:flex-row lg:flex-row xl:flex-row"></div>   <!-- force tailwind to compile all needed classes -->
<svelte:window bind:innerWidth onkeyup={key_handler} />

<div class={`w-[100vw] min-h-[100vh] bg-bg absolute left-0 top-0 p-${PHOTO_SPACING} sm:px-24 md:px-${innerWidth < breakpoint_lg ? "36" : "24"} xl:px-72`}>
    <div class={`flex space-x-${PHOTO_SPACING}  `}>
        <div class={`flex flex-col space-y-${PHOTO_SPACING} w-full lg:w-1/2`}>
    <div class="flex pt-4 space-x-1 items-baseline">
        <Breadcrumbs label="pictoors" />
        <Sep type=">" class="text-lg" />
        <div class="font-sans ">
        {#each tags as tag, i} 
            {#if i > 0}<Sep />{/if}
            <button onclick={() => tag_filter = tag} class={`hover:text-accent transition-all duration-150 ${tag == tag_filter ? "text-accent" : ""}`}>{tag == tag_filter ? tag : tag_display[tag]}</button>
        {/each}
        </div>
    </div>
            {#each pics.map((x, i) => [x, i]).filter(([_, i]) => (innerWidth < breakpoint_lg ? true : i % 2)) as [[path, meta], i]}
            <button onclick={ () => { open_pic = i; } } aria-label="Expand">
                <img src={path} class="object-contain" bind:naturalWidth={nat_widths[i]} bind:naturalHeight={nat_heights[i]} alt={meta.cap} />
            </button>
            {/each}
        </div>
        <div class={`flex flex-col space-y-${PHOTO_SPACING} hidden lg:block w-1/2`}>
            {#each pics.map((x, i) => [x, i]).filter(([_, i]) => !(i % 2)) as [[path, meta], i]}
            <button onclick={ () => { open_pic = i } } aria-label="Expand">
                <img src={path} class="object-contain" bind:naturalWidth={nat_widths[i]} bind:naturalHeight={nat_heights[i]} alt={meta.cap} />
            </button>
            {/each}
        </div>
    </div>
</div>
{#if open_pic !== null}
<div
    class={`fixed w-full h-full top-0 left-0 p-4 m-0 animate-in fade-in  bg-black bg-opacity-80 backdrop-blur contain-content flex flex-col ${open_is_wide ? "xl" : "sm"}:flex-row items-center justify-center`}
    onclick={() => { open_pic = null; }}
    onkeyup={(ev) => { if (ev.key == 'Escape') open_pic = null; }} 
    role="button"
    tabindex="-1"
>
    <img src={pics[open_pic][0]} class="object-contain max-w-full max-h-full shadow-lg" alt={open_meta.cap}/>
    <div class="flex-col ${open_is_wide ? "xl" : "sm"}:flex-col font-sans p-2 self-end min-w-max min-h-max">
        <span class="px-2">{open_meta.cap}</span>
        <span class="px-2 text-sm block ${open_is_wide ? "xl" : "sm"}:block"><MapPinAltSolid class="w-3 inline-block -translate-y-[0.1em]" />&nbsp;{open_meta.loc}</span>
        <span class="pl-2 text-sm block  ${open_is_wide ? "xl" : "sm"}:block">{formatDate(new Date(Date.parse(open_meta.time)))}</span>
    </div>
</div>
{/if}