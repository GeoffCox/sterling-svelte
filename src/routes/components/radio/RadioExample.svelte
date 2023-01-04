<script lang="ts">
	import Radio from '$lib/inputs/Radio.svelte';
	import Example from '../Example.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import Input from '$lib/inputs/Input.svelte';

	let exampleRef: any;

	const seed = [...Array(5).keys()];

	let disabled = false;
	let label = 'Sterling';
	let selectedValue = '';

	$: possibleValues = seed.map((x) => `${label}-${x}`);
</script>

<Example bind:this={exampleRef}>
	<div class="component" slot="component">
		{#each possibleValues as possibleValue}
			<Radio
				bind:group={selectedValue}
				{disabled}
				name="choices"
				value={possibleValue}
				on:change={() => exampleRef.recordEvent(`change value:${possibleValue}`)}
				><span slot="label">{possibleValue}</span></Radio
			>
		{/each}
	</div>
	<svelte:fragment slot="options">
		<div />
		<div>
			<Checkbox bind:checked={disabled}><span slot="label">disabled</span></Checkbox>
		</div>
		<div />
		<div>
			<Input bind:value={label}><span slot="label">LABEL (slot)</span></Input>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="status">
		<div>selectedValue: {selectedValue}</div>
	</svelte:fragment>
</Example>

<style>
	.component {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 0;
		row-gap: 5px;
	}
</style>
