<script lang="ts">
	import { sendNotification } from '../../stores';

	import Input from '$lib/inputs/Input.svelte';
	import Example from '../_components/Example.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';

	let disabled = false;
	let label = 'NAME';
	let placeholder = 'Placeholder';

	const inputOnChange = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		sendNotification(`Input on:change ${target.value}`);
	};

	const inputOnInput = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		sendNotification(`TextInput on:input ${target.value}`);
	};
</script>

<Example name="Input">
	<div class="component" slot="component">
		{#if label.length > 0}
			<Input
				value="Sterling"
				{disabled}
				{placeholder}
				on:input={inputOnInput}
				on:change={inputOnChange}>{label}</Input
			>
		{:else}
			<Input
				value="Sterling"
				{disabled}
				{placeholder}
				on:input={inputOnInput}
				on:change={inputOnChange}
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
		<div />
		<div>
			<Input bind:value={placeholder}>placeholder</Input>
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
	}
</style>
