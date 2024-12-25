<script>
	let { type } = $props();
    if (typeof type === 'undefined' || type == '.') type = "·";
    if (type == '>') type = "›";
</script>
<span class="select-none">&nbsp;{type}&nbsp;</span>