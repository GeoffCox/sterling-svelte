<script lang="ts">
	import Select from '$lib/inputs/Select.svelte';
	import Example from '../_components/Example.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import Input from '$lib/inputs/Input.svelte';
	import { countries } from '../_data/countries';

	let exampleRef: any;

	let items = countries;
	let selectedIndex: number;
	let selectedItem: any;
	let disabled = false;
	let label = 'COUNTRIES';
</script>

<Example name="Select" bind:this={exampleRef}>
	<div class="component" slot="component">
		{#if label}
			<Select
				bind:selectedIndex
				bind:selectedItem
				{items}
				{disabled}
				on:itemSelected={(event) => {
					exampleRef.recordEvent(
						`itemSelected index:[${event.detail.index}] item:${items[event.detail.index]}`
					);
				}}
				on:itemSelectPending={(event) => {
					exampleRef.recordEvent(
						`itemSelectPending index:[${event.detail.index}] item:${items[event.detail.index]}`
					);
				}}
			>
				<svelte:fragment slot="label">{label}</svelte:fragment>
			</Select>
		{:else}
			<Select
				bind:selectedIndex
				bind:selectedItem
				{items}
				{disabled}
				on:itemSelected={(event) => {
					exampleRef.recordEvent(
						`itemSelected index:[${event.detail.index}] item:${items[event.detail.index]}`
					);
				}}
				on:itemSelectPending={(event) => {
					exampleRef.recordEvent(
						`itemSelectPending index:[${event.detail.index}] item:${items[event.detail.index]}`
					);
				}}
			/>
		{/if}
	</div>
	<div slot="options" class="options">
		<div />
		<div>
			<Checkbox bind:checked={disabled}>disabled</Checkbox>
		</div>
		<div />
		<div>
			<Input bind:value={label}>label</Input>
		</div>
	</div>
	<svelte:fragment slot="status">
		<div>selectedIndex: {selectedIndex}</div>
		<div>selectedItem: {selectedItem}</div>
	</svelte:fragment>
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
		justify-items: stretch;
	}
</style>
