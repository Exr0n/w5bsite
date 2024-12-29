<script>
    import Sep from '$lib/components/sep.svelte';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    const { data } = $props(); 
</script>

<Breadcrumbs label="projects" />
<br>
<div class="[&_*]:list-disc [&_ul]:ml-4">
    <data.content />
</div>  