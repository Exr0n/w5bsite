<script>
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import Pic from './Pic.svelte';
    const { data } = $props();

    const paths = Object.keys(data.paths);
</script>

<div class="flex w-[100vw] space-x-8 p-8 px-72 min-h-[100vh] left-0 top-0 absolute bg-bg">
    <div class="flex flex-col space-y-8 w-1/2">
        <Breadcrumbs label="pictures" />
        {#each paths.filter((_, i) => i % 2) as path}
        <Pic path={path} />
        {/each}
    </div>
    <div class="flex flex-col space-y-8 w-1/2">
        {#each paths.filter((_, i) => !(i % 2)) as path}
        <Pic path={path} />
        {/each}
    </div>
</div>