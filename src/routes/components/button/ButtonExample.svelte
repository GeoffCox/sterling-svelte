<script lang="ts">
	import SvelteIcon from '../../SvelteIcon.svelte';
	import Example from '../Example.svelte';

	import type { ButtonShape, ButtonVariant } from '$lib';
	import Button from '$lib/buttons/Button.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import Select from '$lib/inputs/Select.svelte';

	let exampleRef: any;

	const buttonVariants: ButtonVariant[] = ['regular', 'outline', 'ghost'];
	let buttonVariantIndex = 0;
	$: buttonVariant = buttonVariants[buttonVariantIndex];

	const buttonShapes: ButtonShape[] = ['circular', 'rounded', 'square'];
	let buttonShapeIndex = 1;
	$: buttonShape = buttonShapes[buttonShapeIndex];

	let buttonDisabled = false;
	let buttonWithText = true;
	let buttonWithIcon = true;
</script>

<Example bind:this={exampleRef}>
	<div class="component" slot="component">
		<Button
			disabled={buttonDisabled}
			shape={buttonShape}
			variant={buttonVariant}
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
		<Checkbox bind:checked={buttonDisabled}>disabled</Checkbox>
		<Checkbox bind:checked={buttonWithText}>with text</Checkbox>
		<Checkbox bind:checked={buttonWithIcon}>with icon</Checkbox>
		<Select items={buttonShapes} bind:selectedIndex={buttonShapeIndex}>
			<svelte:fragment slot="label">shape</svelte:fragment>
		</Select>
		<Select items={buttonVariants} bind:selectedIndex={buttonVariantIndex}>
			<svelte:fragment slot="label">variant</svelte:fragment>
		</Select>
	</div>
</Example>

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
