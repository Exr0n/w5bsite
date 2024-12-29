<script>
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import Pic from './Pic.svelte';
    import metadata from '$lib/pictures/metadata.json';
    const { data } = $props();

    const pics = data.pics;
    const PHOTO_SPACING = 12

    let open_pic = $state(null);
</script>

<div class={`flex w-[100vw] space-x-${PHOTO_SPACING} p-${PHOTO_SPACING} sm:px-24 md:px-48 lg:px-72 min-h-[100vh] left-0 top-0 absolute bg-bg`}>
    <div class={`flex flex-col space-y-${PHOTO_SPACING} w-full lg:w-1/2`}>
        <Breadcrumbs label="pictoors" />
        {#each pics.filter((_, i) => i % 2) as [path, meta]}
        <button onclick={ () => { open_pic = path } } aria-label="Expand">
            <img src={path} class="object-contain" alt={meta.cap} />
        </button>
        {/each}
    </div>
    <div class={`flex flex-col space-y-${PHOTO_SPACING} hidden lg:block w-1/2`}>
        {#each pics.filter((_, i) => !(i % 2)) as [path, meta]}
        <button onclick={ () => { open_pic = path } } aria-label="Expand">
            <img src={path} class="object-contain" alt={meta.cap} />
        </button>
        {/each}
    </div>
</div>
{#if open_pic !== null}
<div
    class={`fixed w-full h-full p-4 m-0 animate-in fade-in fade-out bg-black bg-opacity-80 transition-all duration-300 top-0 left-0 flex items-center justify-center`}
    onclick={() => { open_pic = null; }}
    onkeyup={(ev) => { if (ev.key == 'Escape') open_pic = null; }} 
    role="button"
    tabindex="-1"
>
    <img src={open_pic} class="object-contain max-w-full max-h-full shadow-lg animate-in zoom-in fade-in zoom-out fade-out" alt={metadata[open_pic.split('/').at(-1).split('?').at(0)].cap}/>
</div>
{/if}
<svelte:window onkeyup={(ev) => { if (ev.key == 'Escape') open_pic = null; }} />