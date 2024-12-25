<script>
	let { type="." } = $props();
    if (type == '.') type = "·";
    if (type == '>') type = "›";
</script>
<span class="select-none">&nbsp;{type}&nbsp;</span>