<script lang="ts">
	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';

	import List from '$lib/lists/List.svelte';
	import { sendNotification } from '../../stores';
	import Example from '../_components/Example.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';

	const items = Array(500)
		.fill(1)
		.map((x, i) => `Item ${i + 1}`);

	let disabled = false;
	let horizontal = false;
</script>

<Example name="Input">
	<div class="component" class:horizontal slot="component">
		<List
			{items}
			let:item
			{disabled}
			selectionKeys="tab"
			{horizontal}
			on:itemSelected={(event) => {
				sendNotification(`List item selected [${event.detail.index}] '${event.detail.item}'`);
			}}
		/>
	</div>
	<div slot="options" class="options">
		<div />
		<div>
			<Checkbox bind:checked={disabled}>disabled</Checkbox>
		</div>
		<div />
		<div>
			<Checkbox bind:checked={horizontal}>horizontal</Checkbox>
		</div>
	</div>
</Example>

<style>
	.options {
		align-items: center;
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 1rem;
		margin-bottom: 1rem;
		width: max-content;
		padding: 50px;
	}

	.component {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 0;
		height: 410px;
		justify-items: stretch;
	}

	.component.horizontal {
		width: 410px;
		height: unset;
		flex-direction: row;
	}
</style>
