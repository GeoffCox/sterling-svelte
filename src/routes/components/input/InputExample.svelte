<script lang="ts">
	import Input from '$lib/inputs/Input.svelte';
	import Example from '../Example.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';

	let exampleRef: any;

	let disabled = false;
	let label = 'NAME';
	let placeholder = 'Type your name here';
	let value = '';
</script>

<Example bind:this={exampleRef}>
	<div class="component" slot="component">
		<Input
			bind:value
			{disabled}
			{placeholder}
			on:input={() => exampleRef.recordEvent('input')}
			on:change={() => exampleRef.recordEvent('change')}
		>
			<span slot="label">{label}</span>
		</Input>
	</div>
	<svelte:fragment slot="options">
		<Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
		<Input bind:value={label}><span slot="label">LABEL (slot)</span></Input>
		<Input bind:value={placeholder}><span slot="label">PLACEHOLDER</span></Input>
	</svelte:fragment>
	<svelte:fragment slot="status">
		<div>value: {value}</div>
	</svelte:fragment>
</Example>

<style>
	.component {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 0;
	}
</style>
