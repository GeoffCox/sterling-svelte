<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let name: string = '';
	export let description: string = '';

	let messages: string[] = [];

	export const recordEvent = (message: string) => {
		const now = new Date();
		messages = [
			...messages.slice(-4),
			`${message} (${now.getSeconds()}s ${now.getMilliseconds()}ms)`
		];
	};

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	onDestroy(() => {
		mounted = false;
	});
</script>

<div class="example">
	<h1>{name}</h1>
	<div class="description">{description}</div>
	{#if mounted}
		<div class="component">
			<slot name="component" />
		</div>
		<div class="panel">
			<div class="options">
				<h2>Options</h2>
				<slot name="options">(none)</slot>
			</div>
			<div class="status">
				<h2>Status</h2>
				<slot name="status">(none)</slot>
			</div>
			<div class="events">
				<h2>Events</h2>
				{#each messages as message}
					<div>{message}</div>
				{/each}
			</div>
			<div class="documentation">
				<slot name="documentation" />
			</div>
		</div>
	{/if}
</div>

<style>
	.example {
		display: flex;
		flex-direction: column;
		align-items: start;
		padding: 15px;
	}

	.description {
		padding: 0 0 15px 0;
	}

	.component {
		border: 1px dashed lightgray;
		border-radius: 10px;
		padding: 15px;
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		align-items: start;
	}

	.panel {
		display: grid;
		gap: 20px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto;
		align-self: stretch;
		margin: 20px 0;
	}

	.options,
	.status,
	.events {
		background-color: var(--Layer__background-color--1);
		color: var(--Layer__color--1);
		padding: 10px;
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		align-items: flex-start;
	}

	.options {
		grid-row-start: 1;
		grid-row-end: 3;
	}

	h1,
	h2 {
		margin-block-start: 0;
		margin-block-end: 0;
		margin-inline-start: 0;
		margin-inline-end: 0;
		margin: 0;
		padding: 0;
		font-weight: normal;
	}

	h1 {
		margin: 10px;
	}
	h2 {
		margin: 5px;
		font-size: 1.2em;
	}
</style>
