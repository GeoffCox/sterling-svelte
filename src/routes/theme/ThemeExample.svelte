<script lang="ts">
	import { darkTheme } from '$lib';
	import { lightTheme } from '$lib';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import ThemePropCard from '../components/ThemePropCard.svelte';

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
		{#each themeKeys as key}
			<ThemePropCard name={key} />
		{/each}
	</div>
</div>

<style>
	.theme {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
		gap: 0.5em;
		align-items: center;
		width: max-content;
	}

	.error {
		color: var(--Display__color--error);
		font-size: 1.5em;
	}
</style>
