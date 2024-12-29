<script>
	let data = $props();
    let type = $state(data.type || ".");
    if (type == '.') type = "·";
    if (type == '>') type = "›";
    const cls = data.class;
</script>
<span class={"select-none font-sans " + cls} style={data.style}>&nbsp;{type}&nbsp;</span>