<script>
    import Exr0nLink from "./exr0n-link.svelte";
    import Sep from "./sep.svelte";
    const { label } = $props();
</script>

<p class="text-2xl font-sans"><Exr0nLink /><Sep type=">" />{label}</p> 