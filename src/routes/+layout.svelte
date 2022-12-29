<script lang="ts">
	import { toggleDarkTheme } from '$lib';
	import { onMount } from 'svelte';
	let dark: boolean | undefined;
	let darkModeCheckbox: HTMLInputElement;

	const onDarkModeClick = () => {
		if (dark === undefined) {
			dark = true;
		} else if (dark === true) {
			dark = false;
		} else {
			dark = undefined;
			darkModeCheckbox.indeterminate = true;
		}
	};

	onMount(() => {
		darkModeCheckbox.indeterminate = true;
	});
</script>

<div class="layout" use:toggleDarkTheme={{ dark, atDocumentRoot: true }}>
	<label>
		<input type="checkbox" checked={dark} bind:this={darkModeCheckbox} on:click={onDarkModeClick} />
		Dark Mode (indeterminate => follow OS/browser setting)
	</label>
	<slot />
</div>

<style>
	@import '@fontsource/overpass';
	@import '@fontsource/fira-mono';

	:global(:root) {
		color: var(--Common__color);
		background-color: var(--Common__background-color);
	}

	:global(html) {
		padding: 0;
		margin: 0;
	}

	:global(body) {
		font-family: 'Overpass', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		line-height: 1.6;
		margin: 0;
	}

	:global(pre),
	:global(code) {
		font-family: 'FiraMono', monospace;
		background-color: var(--BaseLayer__background-color--2);
		color: var(--BaseLayer__color--2);
	}

	:global(pre) {
		padding: 1em;
	}

	:global(blockquote) {
		background-color: var(--BaseLayer__background-color--1);
		color: var(--Display__color--info);
		padding: 1em;
		margin: 0;
	}

	.layout {
		padding: 3em;
	}
</style>
