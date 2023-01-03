<script lang="ts">
	import { toggleDarkTheme } from '$lib';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import { base } from '$app/paths';

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

	let prefersColorSchemeDark = false;

	const onPrefersColorSchemeDarkChanged = (e: MediaQueryListEvent) => {
		prefersColorSchemeDark = e.matches;
	};

	onMount(() => {
		darkModeCheckbox.indeterminate = true;

		const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
		prefersColorSchemeDark = matchMedia.matches;
		matchMedia.addEventListener('change', onPrefersColorSchemeDarkChanged);

		return () => {
			matchMedia.removeEventListener('change', onPrefersColorSchemeDarkChanged);
		};
	});

	let darkModeStore = writable<boolean>(dark);
	setContext('sterlingDarkMode', darkModeStore);

	$: {
		darkModeStore.set(dark === undefined ? prefersColorSchemeDark : dark);
	}
</script>

<div class="layout" use:toggleDarkTheme={{ dark, atDocumentRoot: true }}>
	<div class="header">
		<label>
			<input
				type="checkbox"
				checked={dark}
				bind:this={darkModeCheckbox}
				on:click={onDarkModeClick}
				title="indeterminate => follow OS/browser setting"
			/>
			Dark Mode
		</label>
	</div>
	<h1>sterling-svelte (in progress)</h1>
	<h3>A modern, accessible, and lightweight UI component library for Svelte.</h3>
	<div class="content">
		<div class="nav">
			<a href="{base}/">Overview</a>
			<a href="{base}/theme">Theme</a>
			<a href="{base}/components/button">Button</a>
			<a href="{base}/components/checkbox">Checkbox</a>
			<a href="{base}/components/input">Input</a>
			<!-- <div class="component-list">
				<a href="/components/Button">Button</a>
				<a href="/components/Input">Input</a>
				<a href="/components/List">List</a>
				<a href="/components/Progress">Progress</a>
				<a href="/components/Radio">Radio</a>
				<a href="/components/Select">Select</a>
				<a href="/components/Slider">Slider</a>
			</div> -->
		</div>
		<div class="component">
			<slot />
		</div>
	</div>
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
		margin: 0;
	}

	:global(pre),
	:global(code) {
		font-family: 'FiraMono', monospace;
		background-color: var(--Layer__background-color--1);
		color: var(--Layer__color--1);
	}

	:global(pre) {
		padding: 1em;
	}

	:global(blockquote) {
		background-color: var(--Layer__background-color--1);
		color: var(--Display__color--info);
		padding: 1em;
		margin: 0;
	}

	:global(table) {
		border: 1px solid var(--Common__border-color);
		width: max-content;
		border-collapse: collapse;
	}

	:global(th) {
		font-weight: lighter;
		font-size: 1.1em;
		background: var(--Display__background-color);
		color: var(----Display__color);
		padding: 0.5em;
		text-align: start;
		border: 1px solid var(--Common__border-color);
	}

	:global(td) {
		padding: 0.5em;
		text-align: start;
		border: 1px solid var(--Common__border-color);
	}

	:global(li) {
		margin-bottom: 0.5em;
	}

	.layout {
		padding: 0 3em;
	}

	.header {
		display: flex;
		justify-content: flex-end;
		justify-items: flex-end;
		padding: 5px;
	}

	.content {
		display: grid;
		grid-template-columns: auto 1fr;
		margin-top: 1em;
	}

	.nav {
		display: flex;
		flex-direction: column;
		background-color: var(--Common__background-color);
		border-right: 1px solid var(--Common__border-color);
		padding: 1em;
	}

	.nav a {
		text-decoration: none;
		margin: 0.5em 0;
		font-size: 1em;
		color: var(--Common__color);
	}

	.nav a:hover {
		text-decoration: underline;
	}

	.component {
		display: flex;
		flex-direction: column;
		place-content: start;
		place-items: start;
		padding: 0 20px;
	}
</style>
