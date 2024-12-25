<script>
    import Exr0nIcon from '$lib/components/exr0n-link.svelte';
    const { data } = $props();
    const { posts, durations } = data;
    // console.log(data)
    console.log(posts)

    const zip = (a, b) => a.map((k, i) => [k, b[i]]);
    
    // let { posts, durations } = $props();
    // console.log(posts)
</script>
<div class="flex flex-col space-y-8">
    <h1 class="text-2xl"><Exr0nIcon /> &rsaquo; writing</h1>
    {#each posts as [[slug, meta], duration]} 
        <a class="flex flex-col space-y-3 group no-underline hover:text-current" href={'/writing/' + slug}>
            <h3 class="text-2xl font-sans group-hover:text-accent transition-all duration-200">{meta.title}</h3>
            <p>{meta.description}</p>
            <p class="font-light text-sm font-sans">{meta.date} &nbsp;&middot;&nbsp; {Math.round(duration)} min read</p>
        </a>
    {/each}
</div>  