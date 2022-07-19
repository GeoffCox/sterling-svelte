<script lang="ts">
	import { neutrals } from '$lib/themes/colors';
	import { darkThemeVars } from '$lib/themes/useDarkTheme';

	import { lightThemeVars } from '$lib/themes/useLightTheme';
	import ExampleSection from '../_components/ExampleSection.svelte';
</script>

<div>
	<ExampleSection title="Light Theme Neutrals">
		<div class="theme-items">
			{#each Object.keys(neutrals) as key}
				<div class="theme-item">
					<div class="color-block" style="background-color: {neutrals[key]}" />
					<div>{key}: {neutrals[key]}</div>
				</div>
			{/each}
		</div>
	</ExampleSection>
	<ExampleSection title="Light Theme">
		<div class="theme-items">
			{#each Object.keys(lightThemeVars) as cssVarKey}
				<div class="theme-item">
					<div class="color-block" style="background-color: {lightThemeVars[cssVarKey]}" />
					<div>{cssVarKey} = {lightThemeVars[cssVarKey]}</div>
				</div>
			{/each}
		</div>
	</ExampleSection>
	<ExampleSection title="Dark Theme">
		<div class="theme-items">
			{#each Object.keys(darkThemeVars) as cssVarKey}
				<div class="theme-item">
					<div class="color-block" style="background-color: {darkThemeVars[cssVarKey]}" />
					<div>{cssVarKey} = {darkThemeVars[cssVarKey]}</div>
				</div>
			{/each}
		</div>
	</ExampleSection>
</div>

<style>
	.theme-items {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}
	.theme-item {
		display: flex;
		align-items: center;
		font-size: 12px;
	}
	.color-block {
		width: 24px;
		height: 24px;
		margin: 2px;
		border: 1px solid #ccc;
	}
</style>
