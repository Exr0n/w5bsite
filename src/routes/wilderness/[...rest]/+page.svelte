<!-- /src/routes/wilderness/[...rest]/+page.svelte -->
<script>
    import Sep from '$lib/components/sep.svelte';
    import Exr0nLink from '$lib/components/exr0n-link.svelte';

    export let data;
    import { page } from '$app/stores'
</script>

<style>
    a {
        text-decoration: none !important;
    }
</style>
  
<div>
  {#if data && data.files}
    <h1 class="font-sans text-2xl"><Exr0nLink />
        {#each $page.url.pathname.slice(1).split('/') as el, i}
        <Sep type=">"/>
        <a href={$page.url.pathname.split('/').slice(0, i+2).join('/')}>{el}</a>
        {/each}
    </h1>
    <ul>
      {#each data.files as [file, is_dir]}
        <li class="list-disc ml-4 mt-1">
          <a href={(is_dir ? $page.url.pathname : $page.url.pathname.replace(/^\/wilderness/, '/wildernessfile')) + '/' + file}>
            {file + (is_dir ? '/' : '')}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>