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

	/*
	 * If the slider should be displayed vertically.
	 */
	export let vertical: boolean = false;

	/**
	 * If the slider is disabled.
	 */
	export let disabled: boolean = false;

	let sliderRef: HTMLDivElement;

	// ----- Value tracking ----- //

	// The current min and max ensuring min <= max
	$: currentMin = Math.min(min, max);
	$: currentMax = Math.max(min, max);
					return fraction.length;

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
		const positionRatio = Math.max(0, Math.min(1, offset / sliderSize));
		value = round(currentMin + positionRatio * (currentMax - currentMin), precision);
	};

	// ----- Size tracking ----- //

	let sliderWidth: number;
	let sliderHeight: number;

	$: sliderSize = vertical ? sliderHeight : sliderWidth;

	$: valueOffset = sliderSize * ratio;

	// ----- Event handlers ----- //

	const onPointerDown: svelteHTML.PointerEventHandler<HTMLDivElement> = (event) => {
		if (!disabled) {
			event.currentTarget.setPointerCapture(event.pointerId);
			if (vertical) {
				setValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
			} else {
				setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
			}
		}
	};

	const onPointerMove: svelteHTML.PointerEventHandler<HTMLDivElement> = (event) => {
		if (!disabled && event.currentTarget.hasPointerCapture(event.pointerId)) {
			if (vertical) {
				setValueByOffset(sliderRef.getBoundingClientRect().bottom - event.y);
			} else {
				setValueByOffset(event.x - sliderRef.getBoundingClientRect().left);
			}
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
	class:horizontal={!vertical}
	class:vertical
	tabindex={!disabled ? 0 : undefined}
	{...$$restProps}
	on:keydown={onKeyDown}
	on:pointerdown={onPointerDown}
	on:pointermove={onPointerMove}
	on:pointerup={onPointerUp}
>
	<div
		class="container"
		bind:this={sliderRef}
		bind:clientWidth={sliderWidth}
		bind:clientHeight={sliderHeight}
	>
		<div class="track" />
		<div class="fill" style={vertical ? `height: ${valueOffset}px` : `width: ${valueOffset}px`} />
		<div class="thumb" style={vertical ? `bottom: ${valueOffset}px` : `left: ${valueOffset}px`} />
	</div>
</div>

<style>
	.sterling-slider {
		box-sizing: border-box;
		outline: none;
		padding: 0;
		overflow: visible;
		display: grid;
	}

	.sterling-slider.horizontal {
		height: 2em;
	}

	.sterling-slider.vertical {
		width: 2em;
	}

	.sterling-slider:focus-visible {
		outline-color: var(--Common__outline-color);
		outline-offset: var(--Common__outline-offset);
		outline-style: var(--Common__outline-style);
		outline-width: var(--Common__outline-width);
	}

	.container {
		position: relative;
	}

	.sterling-slider.horizontal .container {
		margin: 0 0.75em;
	}

	.sterling-slider.vertical .container {
		margin: 0.75em 0;
	}

	.track {
		position: absolute;
		background: var(--Display__background-color);
	}

	.sterling-slider.horizontal .track {
		left: 0;
		right: 0;
		top: 50%;
		height: 3px;
		transform: translate(0, -50%);
	}

	.sterling-slider.vertical .track {
		bottom: 0;
		left: 50%;
		top: 0;
		transform: translate(-50%, 0);
		width: 3px;
	}

	.sterling-slider.disabled .track {
		background: var(--Common__background-color--disabled);
	}

	.fill {
		background: var(--Display__color);
		position: absolute;
	}

	.sterling-slider.horizontal .fill {
		height: 3px;
		top: 50%;
		transform: translate(0, -50%);
	}

	.sterling-slider.vertical .fill {
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
		width: 3px;
	}

	.sterling-slider.disabled .fill {
		background: var(--Common__color--disabled);
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
		font: inherit;
		height: 1.5em;
		overflow: hidden;
		padding: 0;
		text-decoration: none;
		transition: background-color 250ms, color 250ms, border-color 250ms;
		white-space: nowrap;
		position: absolute;
		width: 1.5em;
	}

	.sterling-slider.horizontal .thumb {
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.sterling-slider.vertical .thumb {
		left: 50%;
		transform: translate(-50%, 50%);
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
		background-color: var(--Common__background-color--disabled);
		border-color: var(--Common__border-color--disabled);
		color: var(--Common__color--disabled);
		cursor: not-allowed;
	}
</style>
