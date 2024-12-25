<script>
	let { type="." } = $props();
    if (type == '.') type = "·";
    if (type == '>') type = "›";
</script>
<span class="select-none font-sans">&nbsp;{type}&nbsp;</span>