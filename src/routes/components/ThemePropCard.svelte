<script lang="ts">
	import { darkTheme } from '$lib';
	import { lightTheme } from '$lib';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const dark: Readable<boolean> = getContext('sterlingDarkMode');
	$: currentTheme = $dark ? darkTheme : lightTheme;

	export let name: string;
</script>

<div class="theme-swatch">
	<div class="value">
		{#if name.includes('color')}
			<div class="swatch" style="background-color: var({name})" title={`${currentTheme[name]}`} />
		{:else}
			<div class="literal">{currentTheme[name]}</div>
		{/if}
	</div>
	<div class="name">{name}</div>
</div>

<style>
	.theme-swatch {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.value {
		min-width: 2em;
	}

	.swatch {
		border: 1px dashed var(--Common__border-color);
		height: 1em;
		margin-bottom: 0.25em;
		width: 1em;
	}

	.literal {
		font-weight: bold;
	}

	.name {
		margin-left: 0.5em;
		line-height: 1em;
	}
</style>
