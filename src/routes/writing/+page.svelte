<script>
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import Exr0nIcon from '$lib/components/exr0n-link.svelte';
    import Sep from '$lib/components/sep.svelte';
    const { data } = $props();
    const { posts, durations } = data;

    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
</script>
<div class="flex flex-col space-y-8">
    <Breadcrumbs label="writing" />
    {#each posts as [[slug, meta], duration]} 
        <a class="flex flex-col space-y-3 group no-underline hover:text-current" href={'/writing/' + slug}>
            <h3 class="text-2xl font-sans group-hover:text-accent transition-all duration-200">{meta.title}</h3>
            <p>{meta.description}</p>
            <p class="font-light text-sm font-sans">{meta.date}<Sep />{Math.round(duration)} min read</p>
        </a>
    {/each}
</div>  