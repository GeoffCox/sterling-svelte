<script lang="ts">
	export let colors: string[] = [];
</script>

<div class="palette">
	{#each colors as color}
		<div style={`background-color:${color}`} title={color} />
	{/each}
</div>

<style>
    .palette {
        display: flex;
    }

    .palette > div {
        width: 20px;
        height: 20px;
    }
</style>
