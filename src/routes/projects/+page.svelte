<script>
    import Sep from '$lib/components/sep.svelte';
    import Exr0nLink from '$lib/components/exr0n-link.svelte';
    const { data } = $props(); 
</script>

<p class="text-2xl font-sans"><Exr0nLink /><Sep type=">" />projects</p> 
<br>
<div class="[&_*]:list-disc [&_ul]:ml-4">
    <data.content />
</div>  