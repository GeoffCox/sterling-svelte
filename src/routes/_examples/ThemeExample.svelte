<script lang="ts">
	import { darkThemeVars } from '$lib/themes/useDarkTheme';
	import { lightThemeVars } from '$lib/themes/useLightTheme';
	import { neutrals } from '$lib/themes/colors';

	$: themeKeys = Object.keys(lightThemeVars);
</script>

<div>
	<div class="component">
		<h3>Neutral Colors</h3>
		<div class="color-items">
			{#each Object.keys(neutrals) as key}
				<div class="color-item">
					<div class="color-block" style="background-color: {neutrals[key]}" />
					<div class="color-name">{key}: {neutrals[key]}</div>
				</div>
			{/each}
		</div>
		<h3>Theme Colors</h3>
		<div class="theme-items">
			<div class="theme-header">Key</div>
			<div class="theme-header">Color</div>
			{#each themeKeys as key}
				<div>{key}</div>
				<div class="color-block" style="background-color: var({key})" />
			{/each}
		</div>
	</div>
</div>

<style>
	.component {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 0;
		justify-items: stretch;
	}

	.color-items {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}
	.color-item {
		display: flex;
		align-items: center;
	}
	.color-block {
		width: 24px;
		height: 24px;
		margin: 2px;
		border: 1px dashed var(--Common__border-color);
	}

	.color-name {
		margin-left: 5px;
	}

	.theme-items {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		justify-items: end;
		row-gap: 5px;
		column-gap: 20px;
		width: max-content;
	}

	.theme-header {
		font-weight: bold;
	}
</style>
