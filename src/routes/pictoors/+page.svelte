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

    let nat_widths = $state({});
    let nat_heights = $state({});

    let open_pic = $state(null);
    let open_meta = $derived(open_pic !== null ? pics[open_pic][1] : null)
</script>
<div class="hidden p-12 space-x-12 space-y-12 sm:flex-row lg:flex-row"></div>   <!-- force tailwind to compile all needed classes -->

<div class={`flex w-[100vw] space-x-${PHOTO_SPACING} p-${PHOTO_SPACING} sm:px-24 md:px-48 lg:px-72 min-h-[100vh] left-0 top-0 absolute bg-bg`}>
    <div class={`flex flex-col space-y-${PHOTO_SPACING} w-full lg:w-1/2`}>
        <Breadcrumbs label="pictoors" />
        {#each pics.map((x, i) => [x, i]).filter(([_, i]) => i % 2) as [[path, meta], i]}
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
    class={`fixed w-full h-full top-0 left-0 p-4 m-0 animate-in backdrop-blur contain-content fade-in fade-out bg-black bg-opacity-80 flex flex-col ${nat_widths[open_pic] > nat_heights[open_pic] ? "lg" : "sm"}:flex-row items-center justify-center`}
    onclick={() => { open_pic = null; }}
    onkeyup={(ev) => { if (ev.key == 'Escape') open_pic = null; }} 
    role="button"
    tabindex="-1"
>
    <img src={pics[open_pic][0]} class="object-contain max-w-full max-h-full shadow-lg" alt={open_meta.cap}/>
    <div class="flex-col md:flex-row lg:flex-col font-sans p-4 self-end min-w-max min-h-max">
        <p>{open_meta.cap}</p>
        <p class="text-sm"><MapPinAltSolid class="w-3 inline-block -translate-y-[0.1em]" />&nbsp;{open_meta.loc}</p>
        <p class="text-sm">{formatDate(new Date(Date.parse(open_meta.time)))}</p>
    </div>
</div>
{/if}
<svelte:window onkeyup={(ev) => { if (ev.key == 'Escape') open_pic = null; }} />