<script lang="ts">
	import Button from '$lib/buttons/Button.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';

	import Example from '../_components/Example.svelte';
	import SvelteIcon from '../_components/SvelteIcon.svelte';
	import Select from '$lib/inputs/Select.svelte';
	import type { ButtonType } from '$lib/buttons/Button.types';

	let exampleRef: any;

	const buttonTypes: ButtonType[] = ['default', 'outline', 'ghost'];

	let buttonType: ButtonType = 'default';
	let circular = false;
	let buttonDisabled = false;
	let buttonWithText = true;
	let buttonWithIcon = true;
</script>

<div>
	<Example name="Button" bind:this={exampleRef}>
		<div class="component" slot="component">
			<Button
				{circular}
				disabled={buttonDisabled}
				type={buttonType}
				on:click={() => exampleRef.recordEvent('click')}
			>
				{#if buttonWithIcon}
					<SvelteIcon />
				{/if}
				{#if buttonWithText}
					Sterling
				{/if}
			</Button>
		</div>
		<div class="options" slot="options">
			<Checkbox bind:checked={circular}>circular</Checkbox>
			<Checkbox bind:checked={buttonDisabled}>disabled</Checkbox>
			<Checkbox bind:checked={buttonWithText}>with text</Checkbox>
			<Checkbox bind:checked={buttonWithIcon}>with icon</Checkbox>
			<Select items={buttonTypes} bind:selectedItem={buttonType}>
				<svelte:fragment slot="label">type</svelte:fragment>
			</Select>
		</div>
	</Example>
</div>

<style>
	.options {
		align-items: start;
		display: flex;
		flex-direction: column;
		row-gap: 15px;
	}

	.component {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		padding: 0;
	}
</style>
