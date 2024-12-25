<script lang="ts">
    import Exr0nLink from "$lib/components/exr0n-link.svelte";

	let { data } = $props()
    const { meta, duration } = data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
        <p><Exr0nLink /> &rsaquo; <a href="/writing" class="no-underline">writing</a> </p>
        <h3 class="text-2xl font-sans group-hover:text-accent transition-all duration-200">{meta.title}</h3>
        <p class="font-light text-sm font-sans">{meta.date} &nbsp;&middot;&nbsp; {Math.round(duration)} min read</p>
	</hgroup>

	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>

	<div class="prose mt-8 pb-36">
		<data.content />
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;

		h1 {
			text-transform: capitalize;
		}

		h1 + p {
			margin-top: var(--size-2);
			color: var(--text-2);
		}

		.tags {
			display: flex;
			gap: var(--size-3);
			margin-top: var(--size-7);

			> * {
				padding: var(--size-2) var(--size-3);
				border-radius: var(--radius-round);
			}
		}
	}
</style>