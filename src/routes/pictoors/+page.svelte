<script>
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import Pic from './Pic.svelte';
    const { data } = $props();

    const pics = data.pics;
    const SPACING = 12
</script>

<div class={`flex w-[100vw] space-x-${SPACING} p-${SPACING} px-72 min-h-[100vh] left-0 top-0 absolute bg-bg`}>
    <div class={`flex flex-col space-y-${SPACING} w-1/2`}>
        <Breadcrumbs label="pictoors" />
        {#each pics.filter((_, i) => i % 2) as [path, meta]}
        <!-- <Pic path={path} /> -->
        <img src={path} class="object-contain" />
        {/each}
    </div>
    <div class={`flex flex-col space-y-${SPACING} w-1/2`}>
        {#each pics.filter((_, i) => !(i % 2)) as [path, meta]}
        <!-- <Pic path={path} /> -->
        <img src={path} class="object-contain" />
        {/each}
    </div>
</div>