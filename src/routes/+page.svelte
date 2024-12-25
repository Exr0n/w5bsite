<script>
    import { LinkedinSolid, GithubSolid, EnvelopeSolid } from 'flowbite-svelte-icons';
    import OrcidIcon from '$lib/icons/ORCID-iD_icon_BW_vector.svelte'
    import FaGraduationCap from '$lib/icons/fa-graduation-cap.svelte';
</script>
  
<div class="flex justify-center space-x-8"> 
    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img src="pic.png" alt="profile picture" class="w-1/4" />
    <div class="flex flex-col justify-end space-y-4">
        <p class='text-5xl font-sans font-bold'>Albert Y. Huang</p>
        <div class="w-full flex justify-left space-x-2 group [&>a]:transition-opacity">
            <a href="mailto:hi@exr0n.com" class="w-6"><EnvelopeSolid /></a>
            <a href="https://github.com/exr0n" class="w-6"><GithubSolid /></a>
            <a href="https://scholar.google.com/citations?hl=en&user=jznRGWcAAAAJ" class="w-6 translate-y-[0.13rem]"><FaGraduationCap /></a>
            <a href="https://linkedin.com/in/albert-h-326ccc" class="w-6"><LinkedinSolid /></a>
            <a href="https://orcid.org/0000-0003-1268-4780" class="w-6 group-hover:opacity-100 opacity-0 scale-[0.6] -translate-x-[0.13rem] -translate-y-1"><OrcidIcon /></a>
        </div>
    </div>
    
</div>
<p class='p-4 justify-center text-center'>
    I work to help people see deeper and do more by interfacing with the brain. 
</p>
<div class="w-full flex justify-center space-x-2 font-sans">
    <a href="/projects">projects</a>
    <span>&middot;</span>
    <a href="/research">publications</a>
    <span>&middot;</span>
    <a href="/writing">writing</a>
    <span>&middot;</span>
    <a href="https://wilderness.exr0n.com">more</a>
</div>