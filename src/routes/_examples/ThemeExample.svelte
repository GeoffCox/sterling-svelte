<script lang="ts">
	import { darkThemeVars } from '$lib/themes/useDarkTheme';
	import { lightThemeVars } from '$lib/themes/useLightTheme';

	const lightThemeKeys = Object.keys(lightThemeVars);
	const darkThemeKeys = Object.keys(darkThemeVars);

	const keysMatch = lightThemeKeys.every((key, i) => key === darkThemeKeys[i]);
	const themeKeys = lightThemeKeys;
</script>

<div>
	{#if !keysMatch}
		<div class="error">Uh oh! The keys between the light and dark themes DO NOT MATCH!</div>
	{/if}
	<div class="theme">
		<div class="header">Key</div>
		<div class="header">Color</div>
		{#each themeKeys as key}
			<div class="color-name">{key}</div>
			<div class="color-block" style="background-color: var({key})" />
		{/each}
	</div>
</div>

<style>
	.theme {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		justify-items: end;
		row-gap: 5px;
		column-gap: 20px;
		width: max-content;
	}
	.header {
		font-weight: bold;
	}

	.color-block {
		width: 24px;
		height: 24px;
		margin: 2px;
		border: 1px dashed var(--Common__border-color);
	}

	.error {
		color: var(--Display__color--error);
		font-size: 1.5em;
	}
</style>
