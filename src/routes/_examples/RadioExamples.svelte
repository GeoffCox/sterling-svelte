<script lang="ts">
	import Radio from '$lib/inputs/Radio.svelte';
	import Example from '../_components/Example.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import Input from '$lib/inputs/Input.svelte';

	let exampleRef: any;

	const seed = [...Array(5).keys()];

	let disabled = false;
	let label = 'Sterling';
	let selectedValue = '';

	$: possibleValues = seed.map((x) => `${label} ${x}`);
</script>

<Example name="Radio" bind:this={exampleRef}>
	<div class="component" slot="component">
		{#each possibleValues as possibleValue}
			<Radio
				bind:group={selectedValue}
				{disabled}
				name="choices"
				value={possibleValue}
				on:change={() => exampleRef.recordEvent(`change value:${possibleValue}`)}
				>{possibleValue}</Radio
			>
		{/each}
	</div>
	<div slot="options" class="options">
		<div />
		<div>
			<Checkbox bind:checked={disabled}>disabled</Checkbox>
		</div>
		<div />
		<div>
			<Input bind:value={label}>label (prefix)</Input>
		</div>
	</div>
	<svelte:fragment slot="status">
		<div>selectedValue: {selectedValue}</div>
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
		row-gap: 5px;
	}
</style>
