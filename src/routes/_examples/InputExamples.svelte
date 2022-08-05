<script lang="ts">
	import Input from '$lib/inputs/Input.svelte';
	import Example from '../_components/Example.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';

	let exampleRef: any;

	let disabled = false;
	let label = 'NAME';
	let placeholder = 'Placeholder';
	let value = 'Sterling';
</script>

<Example name="Input" bind:this={exampleRef}>
	<div class="component" slot="component">
		<Input
			bind:value
			{disabled}
			{placeholder}
			on:input={() => exampleRef.recordEvent('input')}
			on:change={() => exampleRef.recordEvent('change')}>{label}</Input
		>
	</div>
	<svelte:fragment slot="options">
		<Checkbox bind:checked={disabled}>disabled</Checkbox>
		<Input bind:value={label}>label</Input>
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
