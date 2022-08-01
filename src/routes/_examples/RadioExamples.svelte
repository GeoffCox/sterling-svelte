<script lang="ts">
	import { sendNotification } from '../../stores';

	import Radio from '$lib/inputs/Radio.svelte';
	import Example from '../_components/Example.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';

	const possibleValues = ['Sterling 1', 'Sterling 2', 'Sterling 3', 'Sterling 4', 'Sterling 5'];

	let selectedValue = '(none)';
	let disabled = false;

	$: {
		sendNotification(`Radio changed to ${selectedValue}`);
	}
</script>

<Example name="Radio">
	<div class="component" slot="component">
		{#each possibleValues as possibleValue}
			<Radio bind:group={selectedValue} {disabled} name="choices" value={possibleValue}
				>{possibleValue}</Radio
			>
		{/each}
		<div>selected value: {selectedValue}</div>
	</div>
	<div slot="options" class="options">
		<div />
		<div>
			<Checkbox bind:checked={disabled}>disabled</Checkbox>
		</div>
		<div />
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
