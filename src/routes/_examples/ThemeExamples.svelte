<script lang="ts">
	import { darkThemeVars } from '$lib/themes/useDarkTheme';
	import { lightThemeVars } from '$lib/themes/useLightTheme';
	import { neutrals } from '$lib/themes/colors';

	import ExampleSection from '../_components/ExampleSection.svelte';

	$: themeKeys = Object.keys(lightThemeVars);
</script>

<div>
	<ExampleSection title="Light Theme Neutrals">
		<div class="color-items">
			{#each Object.keys(neutrals) as key}
				<div class="color-item">
					<div class="color-block" style="background-color: {neutrals[key]}" />
					<div>{key}: {neutrals[key]}</div>
				</div>
			{/each}
		</div>
	</ExampleSection>
	<ExampleSection title="Themes">
		<div class="theme-items">
			<div class="theme-header">Key</div>
			<div class="theme-header">Light</div>
			<div class="theme-header">Dark</div>
			{#each themeKeys as key}
				<div>{key}</div>
				<div class="color-block" style="background-color: {lightThemeVars[key]}" />
				<div class="color-block" style="background-color: {darkThemeVars[key]}" />
			{/each}
		</div>
	</ExampleSection>
</div>

<style>
	.color-items {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}
	.color-item {
		display: flex;
		align-items: center;
		font-size: 12px;
	}
	.color-block {
		width: 24px;
		height: 24px;
		margin: 2px;
		border: 1px dashed #000;
	}

	.theme-items {
		display: grid;
		grid-template-columns: auto auto auto;
		align-items: center;
		justify-items: end;
		row-gap: 5px;
		column-gap: 20px;
		width: max-content;
		font-size: 12px;
	}

	.theme-header {
		font-weight: bold;
	}
</style>
