<script>
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import Pic from './Pic.svelte';
    const { data } = $props();

    const paths = data.paths;
    const SPACING = 12
</script>

<div class={`flex w-[100vw] space-x-${SPACING} p-${SPACING} px-72 min-h-[100vh] left-0 top-0 absolute bg-bg`}>
    <div class={`flex flex-col space-y-${SPACING} w-1/2`}>
        <Breadcrumbs label="pictoors" />
        {#each paths.filter((_, i) => i % 2) as path}
        <Pic path={path} />
        {/each}
    </div>
    <div class={`flex flex-col space-y-${SPACING} w-1/2`}>
        {#each paths.filter((_, i) => !(i % 2)) as path}
        <Pic path={path} />
        {/each}
    </div>
</div>