<script lang="ts">
	import Checkbox from '$lib/inputs/Checkbox.svelte';
	import Progress from '$lib/display/Progress.svelte';
	import Slider from '$lib/inputs/Slider.svelte';

	import Example from '../_components/Example.svelte';
	import Input from '$lib/inputs/Input.svelte';

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
		<Progress {value} {max} bind:percent {vertical} />
		<div>{value} ({percent}%)</div>
	</div>
	<div class="options" slot="options">
		<div>max</div>
		<div><Input value={max.toString()} on:change={onMaxChange} /></div>
		<div />
		<div>
			<Checkbox bind:checked={disabled}>
				<svelte:fragment slot="after">disabled</svelte:fragment>
			</Checkbox>
		</div>
		<div />
		<div>
			<Checkbox bind:checked={vertical}>
				<svelte:fragment slot="after">vertical</svelte:fragment>
			</Checkbox>
		</div>
		<div>value</div>
		<div class="slider">
			<Slider bind:value min={0} {max} />
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
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		place-content: center;
		place-items: center;
		padding: 0;
	}

	.slider {
		width: 250px;
	}
</style>
