<script>
	import '../app.css';
	let { children } = $props();
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<div class="w-full h-full min-h-screen font-serif text-fg bg-bg selection:text-bg selection:bg-fg">
	<div class="max-w-prose mx-auto pt-16 px-6">
		{@render children()}
	</div>
</div>


