<script>
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import Pic from './Pic.svelte';
    import metadata from '$lib/pictures/metadata.json';
    import Sep from '$lib/components/sep.svelte';
    import { MapPinAltSolid } from 'flowbite-svelte-icons';
    import { formatDate } from '$lib';
    const { data } = $props();

    const pics = data.pics;

    const PHOTO_SPACING = 12

    let innerWidth = $state(0);
    const breakpoint_lg = 1024;  // px, from tailwind

    let nat_widths = $state({});
    let nat_heights = $state({});

    let open_pic = $state(null);
    let open_meta = $derived(open_pic !== null ? pics[open_pic][1] : null);
    let open_is_wide = $derived(nat_widths[open_pic] > nat_heights[open_pic]);
</script>
<div class="hidden p-12 space-x-12 space-y-12 sm:flex-row lg:flex-row xl:flex-row"></div>   <!-- force tailwind to compile all needed classes -->
<svelte:window bind:innerWidth onkeyup={(ev) => { if (ev.key == 'Escape') open_pic = null; }} />

<div class={`flex w-[100vw] space-x-${PHOTO_SPACING} p-${PHOTO_SPACING} sm:px-24 md:px-48 lg:px-72 min-h-[100vh] left-0 top-0 absolute bg-bg`}>
    <div class={`flex flex-col space-y-${PHOTO_SPACING} w-full lg:w-1/2`}>
        <Breadcrumbs label="pictoors" />
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
{#if open_pic !== null}
<div
    class={`fixed w-full h-full top-0 left-0 p-4 m-0 animate-in backdrop-blur contain-content fade-in fade-out bg-black bg-opacity-80 flex flex-col ${open_is_wide ? "xl" : "sm"}:flex-row items-center justify-center`}
    onclick={() => { open_pic = null; }}
    onkeyup={(ev) => { if (ev.key == 'Escape') open_pic = null; }} 
    role="button"
    tabindex="-1"
>
    <img src={pics[open_pic][0]} class="object-contain max-w-full max-h-full shadow-lg" alt={open_meta.cap}/>
    <div class="flex-col md:flex-row xl:flex-col font-sans p-2 self-end min-w-max min-h-max">
        <span class="px-2">{open_meta.cap}</span>
        <span class="px-2 text-sm block sm:inline-block xl:block"><MapPinAltSolid class="w-3 inline-block -translate-y-[0.1em]" />&nbsp;{open_meta.loc}</span>
        <span class="pl-2 text-sm block sm:inline-block xl:block">{formatDate(new Date(Date.parse(open_meta.time)))}</span>
    </div>
    <!-- <img src={pics[open_pic][0]} class="object-contain max-w-full max-h-full shadow-lg" alt={open_meta.cap}/>
    <div class="flex-col ${open_is_wide ? "md" : "xs"}:flex-row ${open_is_wide ? "lg": "md"}:flex-col font-sans p-2 self-end min-w-max min-h-max">
        <span class="px-2">{open_meta.cap}</span>
        <span class="px-2 text-sm block ${open_is_wide ? "xs": "md"}:inline-block ${open_is_wide ? "lg" : "md"}:block"><MapPinAltSolid class="w-3 inline-block -translate-y-[0.1em]" />&nbsp;{open_meta.loc}</span>
        <span class="pl-2 text-sm block ${open_is_wide ? "xs": "md"}:inline-block ${open_is_wide ? "lg" : "md"}:block">{formatDate(new Date(Date.parse(open_meta.time)))}</span>
    </div> -->
</div>
{/if}