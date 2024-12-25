<script>
    import Exr0nLink from "$lib/components/exr0n-link.svelte";

    const groups = [
        ['jklsnt', 'https://jklsnt.com'],
        ['argot', 'https://shedding.bike'],
    ]
</script>

<div class="flex justify-center">
    <Exr0nLink />&nbsp;&#x2208; &nbsp;
    {#each groups as [name, url], i}
    <a href={url}>{name}</a>{#if i < groups.length - 1},&nbsp;{/if}
    {/each}
</div>