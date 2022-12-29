<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';

	export let markdown: string;
</script>

<div class="documentation">
	<SvelteMarkdown source={markdown} />
</div>

<style>
	.documentation :global(h2) {
		font-size: 1.2em;
		font-weight: normal;
	}

	.documentation :global(table) {
		border: 1px solid black;
		width: max-content;
		border-collapse: collapse;
	}

	.documentation :global(th) {
		font-weight: lighter;
		padding: 0.5em;
		text-align: start;
		border: 1px solid black;
	}

	.documentation :global(td) {
		padding: 0.5em;
		text-align: start;
		border: 1px solid black;
	}

	.documentation :global(li) {
		margin-bottom: 0.5em;
	}
</style>
