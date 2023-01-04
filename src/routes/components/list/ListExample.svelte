<script lang="ts">
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import Example from '../Example.svelte';
	import List from '$lib/lists/List.svelte';
	import Input from '$lib/inputs/Input.svelte';
	import { countries } from '../../_sampleData/countries';

	let exampleRef: any;

	const items = countries;
	let label = 'COUNTRIES';
	let selectedIndex = 0;
	let selectedItem = items[0];
	let disabled = false;
	let horizontal = false;
</script>

<Example bind:this={exampleRef}>
	<div class="component" class:horizontal slot="component">
		{#if label}
			<List
				bind:selectedIndex
				bind:selectedItem
				{items}
				{disabled}
				selectionKeys="tab"
				{horizontal}
				on:itemSelected={(event) => {
					exampleRef.recordEvent(
						`itemSelected index:[${event.detail.index}] item:${event.detail.item}`
					);
				}}
			>
				<svelte:fragment slot="label">{label}</svelte:fragment>
			</List>
		{:else}
			<List
				bind:selectedIndex
				bind:selectedItem
				{items}
				{disabled}
				selectionKeys="tab"
				{horizontal}
				on:itemSelected={(event) => {
					exampleRef.recordEvent(
						`itemSelected index:[${event.detail.index}] item:${event.detail.item}`
					);
				}}
			/>
		{/if}
	</div>
	<svelte:fragment slot="options">
		<Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
		<Checkbox bind:checked={horizontal}><span slot="label">horizontal</span></Checkbox>
		<Input bind:value={label}>label</Input>
	</svelte:fragment>
	<svelte:fragment slot="status">
		<div>selectedIndex: {selectedIndex}</div>
		<div>selectedItem: {selectedItem}</div>
	</svelte:fragment>
</Example>

<style>
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
