<script lang="ts">
	import { currentTheme } from './_components/useCurrentTheme';
	import Checkbox from '$lib/inputs/Checkbox.svelte';

	let darkMode = false;
</script>

<div class="root" use:currentTheme={{ darkMode }}>
	<Checkbox
		checked={darkMode}
		on:click={() => {
			darkMode = !darkMode;
		}}>Dark Mode</Checkbox
	>
	<div class="content">
		<div class="nav">
			<h3>Library</h3>
			<a href="/">Overview</a>
			<a href="/components/Theme">Theme</a>
			<h3>Components</h3>
			<div class="component-list">
				<a href="/components/Button">Button</a>
				<a href="/components/Checkbox">Checkbox</a>
				<a href="/components/Input">Input</a>
				<a href="/components/List">List</a>
				<a href="/components/Progress">Progress</a>
				<a href="/components/Radio">Radio</a>
				<a href="/components/Select">Select</a>
				<a href="/components/Slider">Slider</a>
			</div>
		</div>
		<div class="component">
			<slot />
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Overpass&display=swap');

	:global(body) {
		padding: 0;
		margin: 0;
		font-family: 'Overpass', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		height: 100%;
	}

	.root {
		color: var(--Common__color);
		background-color: var(--Common__background-color);
	}

	.content {
		display: grid;
		grid-template-columns: auto 1fr;
	}

	.nav {
		display: flex;
		flex-direction: column;
		background-color: var(--Display__background-color);
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
		max-width: 900px;
	}

	.component :global(h2) {
		font-size: 1.2em;
		font-weight: normal;
	}

	.component :global(pre) {
		background: var(--Display__background-color);
		padding: 1em;
	}

	.component :global(table) {
		border: 1px solid var(--Common__border-color);
		width: max-content;
		border-collapse: collapse;
	}

	.component :global(th) {
		font-weight: lighter;
		font-size: 1.1em;
		background: var(--Display__background-color);
		padding: 0.5em;
		text-align: start;
		border: 1px solid var(--Common__border-color);
	}

	.component :global(td) {
		padding: 0.5em;
		text-align: start;
		border: 1px solid var(--Common__border-color);
	}

	.component :global(li) {
		margin-bottom: 0.5em;
	}
</style>
