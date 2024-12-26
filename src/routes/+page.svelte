<script>
    import { LinkedinSolid, GithubSolid, EnvelopeSolid, UsersSolid } from 'flowbite-svelte-icons';
    import FaOrcid from '$lib/icons/fa-orcid.svelte';
    import FaGraduationCap from '$lib/icons/fa-graduation-cap.svelte';
    import Sep from '$lib/components/sep.svelte';
    import Exr0nIcon from '$lib/icons/exr0n-icon.svelte';
    const GOOGLE_SCHOLAR_LINK = "https://scholar.google.com/citations?hl=en&user=jznRGWcAAAAJ"
    const ICONS = [
        [EnvelopeSolid, "mailto:hi@exr0n.com"],
        [GithubSolid, "https://github.com/exr0n"],
        [FaGraduationCap, GOOGLE_SCHOLAR_LINK],
        [LinkedinSolid, "https://linkedin.com/in/albert-huang-326ccc"]
    ];
    const HIDDEN_ICONS = [ 
        [FaOrcid, "https://orcid.org/0000-0003-1268-4780"],
        [UsersSolid, "/friends"]
    ]
</script>
<style>
    a:hover { 
        opacity: 100% !important;
        transition-property: all !important;
        transition-duration: 100ms !important;
    }
</style>
  
<div class="flex flex-col md:flex-row justify-center md:space-x-8"> 
    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img src="pic.png" alt="profile picture" class="w-1/4 mx-auto md:mx-0" />
    <div class="flex flex-col w-min self-center md:self-end justify-end space-y-2 md:space-y-4">
        <p class='text-5xl min-w-max font-sans font-bold selection:text-[#326ccc] selection:bg-transparent'>Albert Y. Huang</p>
        <div class="w-full flex justify-left space-x-2 group [&>a]:transition-opacity">
            <p class="font-sans "><Exr0nIcon /> Exr0n</p>
            <Sep type="|" />
            {#each ICONS as [Icon, url]}
            <a href={url} class="w-6"><Icon /></a>
            {/each}
            {#each HIDDEN_ICONS as [Icon, url]}
            <a href={url} class="w-6 group-hover:opacity-50 opacity-30 md:opacity-0"><Icon /></a>
            {/each}
        </div>
    </div>
</div>
<p class='p-4 justify-center text-center'>
    I work to help people see deeper and do more by interfacing with the brain. 
</p>
<div class="w-full flex justify-center space-x-2 font-sans">
    <a href="/projects">projects</a> <!-- todo: make projects page -->
    <Sep />
    <a href={GOOGLE_SCHOLAR_LINK}>publications</a>  <!-- todo: someday make a research interests page -->
    <Sep />
    <a href="/writing">writing</a> 
    <Sep />
    <a href="/wilderness">more</a>
</div>