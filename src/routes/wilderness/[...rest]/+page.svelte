<!-- from openai o1 -->
<script>
    export let data;
    import { page } from '$app/stores'
</script>
  
  {#if data && data.files}
    <h1>Index of {$page.url.pathname}</h1>
    <ul>
      {#each data.files as file}
        <li>
          <a href={$page.url.pathname + '/' + file}>
            {file}
          </a>
        </li>
      {/each}
    </ul>
  {/if}