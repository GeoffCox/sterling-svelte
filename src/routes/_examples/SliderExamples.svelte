<script lang="ts">
	import ExampleCard from '../_components/ExampleCard.svelte';
	import ExampleSection from '../_components/ExampleSection.svelte';

	import Slider from '$lib/inputs/Slider.svelte';
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import Input from '$lib/inputs/Input.svelte';
	import BaseLayer from '$lib/BaseLayer.svelte';
	import Example from '../_components/Example.svelte';

	let value = 0;
	let disabled = false;
	let min = 0;
	let max = 100;
	let step: number | undefined = undefined;
	let precision: number = 0;
	let vertical = false;

	// This helps fix the lost typing of forwarded events on Input
	type FormEvent<E extends Event = Event, T extends EventTarget = HTMLElement> = E & {
		currentTarget: EventTarget & T;
	};

	const _onMinChange: svelteHTML.FormEventHandler<HTMLInputElement> = (e) => {
		const target = e.target as HTMLInputElement;
		const parsedValue = Number.parseFloat(target.value);
		min = isNaN(parsedValue) ? 0 : parsedValue;
	};

	const onMinChange = (e: Event): any => {
		_onMinChange(e as FormEvent<Event, HTMLInputElement>);
	};

	const _onMaxChange: svelteHTML.FormEventHandler<HTMLInputElement> = (e) => {
		const target = e.target as HTMLInputElement;
		const parsedValue = Number.parseFloat(target.value);
		max = isNaN(parsedValue) ? 0 : parsedValue;
	};

	const onMaxChange = (e: Event): any => {
		_onMaxChange(e as FormEvent<Event, HTMLInputElement>);
	};

	const _onStepChange: svelteHTML.FormEventHandler<HTMLInputElement> = (e) => {
		const target = e.target as HTMLInputElement;
		if (target.value) {
			const parsedValue = Number.parseFloat(target.value);
			step = isNaN(parsedValue) ? 0 : parsedValue;
		} else {
			step = undefined;
		}
	};

	const onStepChange = (e: Event): any => {
		_onStepChange(e as FormEvent<Event, HTMLInputElement>);
	};

	const _onPrecisionChange: svelteHTML.FormEventHandler<HTMLInputElement> = (e) => {
		const target = e.target as HTMLInputElement;
		const parsedValue = Number.parseFloat(target.value);
		precision = isNaN(parsedValue) ? 0 : parsedValue;
	};

	const onPrecisionChange = (e: Event): any => {
		_onPrecisionChange(e as FormEvent<Event, HTMLInputElement>);
	};
</script>

<Example name="Slider">
	<svelte:fragment slot="component">
		<div class="container" class:vertical>
			<Slider bind:value bind:min bind:max bind:precision bind:step bind:vertical {disabled} />
			<div>value: {value}</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="options">
		<div class="property-grid">
			<div>min</div>
			<div><Input value={min.toString()} on:change={onMinChange} /></div>
			<div>max</div>
			<div><Input value={max.toString()} on:change={onMaxChange} /></div>
			<div>step</div>
			<div><Input value={step?.toString()} on:change={onStepChange} /></div>
			<div>precision</div>
			<div><Input value={precision.toString()} on:change={onPrecisionChange} /></div>
			<div />
			<div>
				<Checkbox bind:checked={vertical}>
					<svelte:fragment slot="after">vertical</svelte:fragment>
				</Checkbox>
			</div>
			<div />
			<div>
				<Checkbox bind:checked={disabled}>
					<svelte:fragment slot="after">disabled</svelte:fragment>
				</Checkbox>
			</div>
		</div>
	</svelte:fragment>
</Example>

<style>
	.example {
		padding: 20px;
	}
	.property-grid {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 1rem;
		margin-bottom: 1rem;
		width: max-content;
		padding: 50px;
	}

	.container {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		width: 450px;
		height: 100px;
		padding: 0;
	}

	.container.vertical {
		height: 450px;
		width: 10px;
		padding: 0;
	}
</style>
