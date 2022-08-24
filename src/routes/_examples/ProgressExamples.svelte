<script lang="ts">
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import Progress from '$lib/display/Progress.svelte';
	import Slider from '$lib/inputs/Slider.svelte';

	import Example from '../_components/Example.svelte';
	import Input from '$lib/inputs/Input.svelte';
	import Select from '$lib/inputs/Select.svelte';
	import type { ProgressColorful } from '$lib/display/Progress.types';

	const colorfulStates = ['none', 'auto', 'progress', 'success', 'warning', 'error'];

	let colorfulStateIndex = 0;
	$: colorful = colorfulStates[colorfulStateIndex] as ProgressColorful;
	let value = 35;
	let max = 100;
	let percent: number;
	let disabled = false;
	let vertical = false;

	// This helps fix the lost typing of forwarded events on Input
	type FormEvent<E extends Event = Event, T extends EventTarget = HTMLElement> = E & {
		currentTarget: EventTarget & T;
	};

	const _onMaxChange: svelteHTML.FormEventHandler<HTMLInputElement> = (e) => {
		const target = e.target as HTMLInputElement;
		const parsedValue = Number.parseFloat(target.value);
		max = isNaN(parsedValue) ? 0 : parsedValue;
	};

	const onMaxChange = (e: Event): any => {
		_onMaxChange(e as FormEvent<Event, HTMLInputElement>);
	};
</script>

<Example name="Progress">
	<div class="component" class:vertical slot="component">
		<Progress {colorful} {disabled} {value} {max} bind:percent {vertical} />
	</div>
	<div class="options" slot="options">
		<div class="slider">
			<Slider bind:value min={0} {max}><svelte:fragment slot="label">value</svelte:fragment></Slider
			>
		</div>
		<Input value={max.toString()} on:change={onMaxChange}>max</Input>
		<Select items={colorfulStates} bind:selectedIndex={colorfulStateIndex}>
			<svelte:fragment slot="label">colorful</svelte:fragment>
		</Select>
		<Checkbox bind:checked={disabled}>disabled</Checkbox>
		<Checkbox bind:checked={vertical}>vertical</Checkbox>
	</div>
	<div slot="status">
		<div>value: {value}</div>
		<div>percent: {percent}%</div>
	</div>
</Example>

<style>
	.component {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		place-content: center;
		place-items: center;
		padding: 0;
	}

	.options {
		align-items: start;
		display: flex;
		flex-direction: column;
		row-gap: 15px;
	}

	.slider {
		width: 250px;
	}
</style>
