<script>
    import { LinkedinSolid, GithubSolid, EnvelopeSolid, UsersSolid } from 'flowbite-svelte-icons';
    import FaOrcid from '$lib/icons/fa-orcid.svelte';
    import FaGraduationCap from '$lib/icons/fa-graduation-cap.svelte';
    import Sep from '$lib/components/sep.svelte';
    import Exr0nIcon from '$lib/icons/exr0n-icon.svelte';
    import { setHourlyInterval, setSecondInterval } from './util';
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

    let recent_time = $state(new Date());
    let is_night = $derived(recent_time.getHours() >= 23 || recent_time.getHours() < 4);
    // let is_night = $derived(recent_time.getSeconds() >= 23 || recent_time.getSeconds() < 4);
    $effect(() => {
        const alarm23 = setHourlyInterval(23, () => { recent_time = new Date(); });
        const alarm4  = setHourlyInterval(4, () => { recent_time = new Date(); });
        // const alarm23 = setSecondInterval(23, () => { console.log("alarm23"); recent_time = new Date(); });
        // const alarm4  = setSecondInterval(4, () => { console.log("alarm4"); recent_time = new Date(); });
        return () => { alarm23(); alarm4(); }
    })

    let show_more = $state(false);
</script>
<style>
    a:hover { 
        opacity: 100% !important;
        transition-property: all !important;
        transition-duration: 100ms !important;
    }
</style>

<svelte:head>
	<title>Albert @Exr0n</title>
</svelte:head>
  
<div class="flex flex-col md:flex-row justify-center space-y-4 md:space-x-8"> 
    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img src="pic.png" alt="profile picture" class="w-1/4 mx-auto md:mx-0" />
    <div class="flex flex-col md:w-min self-center md:self-end justify-end space-y-2 md:space-y-4">
        <p class='text-3xl md:text-5xl text-center md:text-left min-w-max font-sans font-bold selection:text-[#326ccc] selection:bg-transparent'>Albert Y. Huang</p>
        <div class="w-full flex justify-left space-x-2 group [&>a]:transition-opacity">
            <p class="font-sans min-w-max"><Exr0nIcon /> Exr0n</p>
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
    I work on learning a {#if is_night}f<span class="text-xs">***</span>{/if} ton, and on brain machine interfaces. 
</p>
<div class="w-full flex justify-center space-x-2 font-sans">
    <div class="max-w-max relative">
        <a   class="animate -in fill-mode-both fade-in delay-[50ms]" href="/projects">projects</a> <!-- todo: make projects page -->
        <Sep class="animate -in fill-mode-both fade-in delay-75"/>
        <a   class="animate -in fill-mode-both fade-in delay-100" href={GOOGLE_SCHOLAR_LINK}>publications</a>  <!-- todo: someday make a research interests page -->
        <Sep class="animate -in fill-mode-both fade-in" style="transition-delay: 125ms; animation-delay: 125ms;"/>
        <a   class="animate -in fill-mode-both fade-in delay-150" href="/pictoors">pics</a> 
        <Sep class="animate -in fill-mode-both fade-in" style="transition-delay: 175ms; animation-delay: 175ms;"/>
        <a   class="animate -in fill-mode-both fade-in delay-200" href="/writing">words</a> 
        <Sep class="animate -in fill-mode-both fade-in" style="transition-delay: 225ms; animation-delay: 225ms;"/>
        <a   class="animate -in fill-mode-both fade-in" style="transition-delay: 250ms; animation-delay: 250ms;" href="/wilderness">more</a>
        <!-- <a onclick={() => { show_more = true; }} role="button">more</a>
        {#if show_more}
        <div class="absolute flex flex-col right-0 top-6 text-right">
            <a class="animate-in animate-in-from-top-1 fill-mode-both fade-in" href="/pictoors">pictoors</a> 
            <a class="animate-in animate-in-from-top-1 fill-mode-both delay-[50ms] fade-in" href="/writing">writing</a> 
            <a class="animate-in animate-in-from-top-1 fill-mode-both delay-[100ms] fade-in" href="/wilderness">wild</a>
        </div>
        {/if} -->
    </div>
</div>