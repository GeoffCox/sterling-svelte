<script lang="ts">
	import { neutrals } from '$lib/themes/colors';
</script>

<div class="colors">
	{#each Object.keys(neutrals) as key}
		<div class="color">
			<div class="color-block" style="background-color: {neutrals[key]}" />
			<div class="color-name">{key}: {neutrals[key]}</div>
		</div>
	{/each}
</div>

<style>
	.colors {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}

	.color {
		display: flex;
		align-items: center;
	}

	.color-name {
		margin-left: 5px;
	}
	.color-block {
		width: 24px;
		height: 24px;
		margin: 2px;
		border: 1px dashed var(--Common__border-color);
	}
</style>
