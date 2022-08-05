<script lang="ts">
	export let name: string;
</script>

<div class="example">
	<h1>{name}</h1>
	<div class="component">
		<slot name="component" />
	</div>
	<div class="panel">
		<div class="options">
			<h2>Options</h2>
			<slot name="options" />
		</div>
		<div class="status">
			<h2>Status</h2>
			<slot name="status" />
		</div>
		<div class="events">
			<h2>Events</h2>
			<slot name="events" />
		</div>
	</div>
</div>

<style>
	.example {
		background-color: var(--BaseLayer__background-color);
		color: var(--BaseLayer__color);
		display: flex;
		flex-direction: column;
		align-items: start;
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
		background-color: var(--BaseLayer__background-color--2);
		color: var(--BaseLayer__color--2);
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
	}
</style>
