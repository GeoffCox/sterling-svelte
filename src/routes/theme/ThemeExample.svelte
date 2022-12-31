<script lang="ts">
	import { darkTheme } from '$lib';
	import { lightTheme } from '$lib';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const darkThemeKeys = Object.keys(darkTheme);
	const lightThemeKeys = Object.keys(lightTheme);

	const keysMatch = lightThemeKeys.every((key, i) => key === darkThemeKeys[i]);
	const themeKeys = lightThemeKeys;

	const dark: Readable<boolean> = getContext('sterlingDarkMode');
	$: currentTheme = $dark ? darkTheme : lightTheme;
	$: themeName = $dark ? 'Dark' : 'Light';
</script>

<div>
	{#if !keysMatch}
		<div class="error">Uh oh! The keys between the light and dark themes DO NOT MATCH!</div>
	{/if}
	<div class="theme">
		<div class="header">Key</div>
		<div class="header">{themeName} value</div>
		{#each themeKeys as key}
			<div class="key-name">{key}</div>
			{#if key.includes('color')}
				<div class="color-block" style="background-color: var({key})" />
			{:else}
				<div>{currentTheme[key]}</div>
			{/if}
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
