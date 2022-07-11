<script lang="ts">
	import { round } from 'lodash-es';

	// ----- Props ----- //

	/**
	 * The value of the slider.
	 */
	export let value: number = 0;

	/**
	 * The minimum value of the slider.
	 */
	export let min: number = 0;

	/**
	 * The maximum value of the slider.
	 */
	export let max: number = 100;

	/**
	 * The value the slider can step by
	 */
	export let step: number | undefined = undefined;

	/**
	 * The number of decimal places to round the value to.
	 */
	export let precision: number = 0;

	// export let ticks: number[] = [];
	// export let snapToTicks = false;

	/**
	 * If the slider is disabled.
	 */
	export let disabled: boolean = false;

	let sliderRef: HTMLDivElement;

	// ----- Value tracking ----- //

	// The current min and max ensuring min <= max
	$: currentMin = Math.min(min, max);
	$: currentMax = Math.max(min, max);

	// The current value ensuring that currentMin <= value <= currentMax
	// and rounded to the precision.
	$: currentValue = round(Math.max(currentMin, Math.min(currentMax, value)), precision);

	// Enforce the value snaps to the step
	$: {
		if (step) {
			let stepValue = Math.max(currentMin, Math.min(value, currentMax));
			stepValue = Math.round(stepValue / step) * step + currentMin;
			if (stepValue !== value) {
				value = stepValue;
			}
		}
	}

	// Compute the ratio of the value to the range
	$: ratio = (currentValue - currentMin) / (currentMax - currentMin);

	$: changeBy = step ? step : precision > 0 ? 1 / Math.pow(10, precision) : 1;

	const setValue = (newValue: number) => {
		value = round(Math.max(currentMin, Math.min(currentMax, newValue)), precision);
	};

	const setValueByOffset = (offset: number) => {
		const positionRatio = Math.max(0, Math.min(1, offset / clientWidth));
		value = round(currentMin + positionRatio * (currentMax - currentMin), precision);
	};

	// ----- Size tracking ----- //

	let clientWidth: number;

	$: valueOffset = clientWidth * ratio;

	// ----- Event handlers ----- //

	const onPointerDown: svelteHTML.PointerEventHandler<HTMLDivElement> = (event) => {
		if (!disabled) {
			event.currentTarget.setPointerCapture(event.pointerId);
			setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
		}
	};

	const onPointerMove: svelteHTML.PointerEventHandler<HTMLDivElement> = (event) => {
		if (!disabled && event.currentTarget.hasPointerCapture(event.pointerId)) {
			setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
		}
	};

	const onPointerUp: svelteHTML.PointerEventHandler<HTMLDivElement> = (event) => {
		if (!disabled) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
	};

	const onKeyDown: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey) {
			switch (event.code) {
				case 'ArrowDown':
				case 'ArrowLeft':
					setValue(value - changeBy);
					event.preventDefault();
					event.stopPropagation();
					return;
				case 'ArrowRight':
				case 'ArrowUp':
					setValue(value + changeBy);
					event.preventDefault();
					event.stopPropagation();
					return;
			}
		}
	};
</script>

<div
	class="sterling-slider"
	class:disabled
	tabindex={!disabled ? 0 : undefined}
	{...$$restProps}
	on:keydown={onKeyDown}
	on:pointerdown={onPointerDown}
	on:pointermove={onPointerMove}
	on:pointerup={onPointerUp}
>
	<div class="container" bind:this={sliderRef} bind:clientWidth>
		<div class="track" />
		<div class="fill" style="width: {valueOffset}px" />
		<div class="thumb" style="left: {valueOffset}px" />
	</div>
</div>

<style>
	.sterling-slider {
		box-sizing: border-box;
		outline: none;
		padding: 0;
		overflow: visible;
		display: grid;
		height: 2em;
		position: relative;
	}

	.sterling-slider:focus-visible {
		border-color: var(--Button__border-color--focus);
		outline-color: var(--Button__outline-color--focus, var(--Button__border-color--focus));
		outline-style: var(--Button__outline-style--focus, var(--Button__border-style));
		outline-width: var(--Button__outline-width--focus, var(--Button__border-width));
	}

	.container {
		margin: 0 0.75em;
	}

	.track {
		position: absolute;
		left: 0;
		top: 50%;
		bottom: 0;
		right: 0;
		background: var(--Input__background-color--selected);
		height: 3px;
		transform: translate(0, -50%);
	}

	.sterling-slider.disabled .track {
		background: var(--Input__background-color--disabled);
	}

	.fill {
		position: absolute;
		left: 0;
		top: 50%;
		bottom: 0;
		right: 0;
		background: var(--Input__color--selected);
		height: 3px;
		transform: translate(0, -50%);
	}

	.sterling-slider.disabled .fill {
		background: var(--Input__color--disabled);
	}

	.thumb {
		background-color: var(--Button__background-color);
		border-color: var(--Button__border-color);
		border-radius: 10000px;
		border-style: var(--Button__border-style);
		border-width: var(--Button__border-width);
		box-sizing: border-box;
		color: var(--Button__color);
		cursor: pointer;
		display: block;
		flex-direction: row;
		font: inherit;
		align-content: center;
		align-items: center;
		height: 1.5em;
		justify-content: center;
		justify-items: center;
		overflow: hidden;
		padding: 0;
		top: 50%;
		text-decoration: none;
		transform: translate(-50%, -50%);
		transition: background-color 250ms, color 250ms, border-color 250ms;
		white-space: nowrap;
		position: absolute;
		width: 1.5em;
	}

	.thumb:hover {
		background-color: var(--Button__background-color--hover);
		border-color: var(--Button__border-color--hover);
		color: var(--Button__color--hover);
	}

	.thumb:active {
		background-color: var(--Button__background-color--active);
		border-color: var(--Button__border-color--active);
		color: var(--Button__color--active);
	}

	.sterling-slider.disabled .thumb {
		background-color: var(--Button__background-color--disabled);
		border-color: var(--Button__border-color--disabled);
		color: var(--Button__color--disabled);
		cursor: not-allowed;
	}
</style>
