<script lang="ts">
	import { toggleDarkTheme } from '$lib';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
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
	<h1>sterling-svelte</h1>
	<h3>A modern, accessible, and lightweight UI component library for Svelte.</h3>
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
	<div class="content">
		<div class="nav">
			<a href="/">Overview</a>
			<a href="/theme">Theme</a>
			<!-- <div class="component-list">
				<a href="/components/Button">Button</a>
				<a href="/components/Checkbox">Checkbox</a>
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
		padding: 0 3em;
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

	.component-list {
		margin-left: 1em;
		display: flex;
		flex-direction: column;
	}

	.component-list a,
	.nav a {
		text-decoration: none;
		margin: 0.5em 0;
		font-size: 1em;
		color: var(--Common__color);
	}

	.component {
		display: flex;
		flex-direction: column;
		place-content: start;
		place-items: start;
		padding: 0 20px;
	}
</style>
