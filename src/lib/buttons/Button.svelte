<script lang="ts">
	import type { ButtonShape, ButtonVariant } from './types';

	export let variant: ButtonVariant = 'regular';
	export let shape: ButtonShape = 'rounded';
</script>

<!--
	@component
	provides a styled HTML button element.
-->
<button
	class="sterling-button"
	class:square={shape === 'square'}
	class:circular={shape === 'circular'}
	class:outline={variant === 'outline'}
	class:ghost={variant === 'ghost'}
	on:blur
	on:click
	on:dblclick
	on:focus
	on:focusin
	on:focusout
	on:keydown
	on:keypress
	on:keyup
	on:mousedown
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:mouseover
	on:mouseout
	on:mouseup
	on:pointercancel
	on:pointerdown
	on:pointerenter
	on:pointerleave
	on:pointermove
	on:pointerover
	on:pointerout
	on:pointerup
	on:wheel
	{...$$restProps}
>
	<slot />
</button>

<style>
	button {
		background-color: var(--Button__background-color);
		border-color: var(--Button__border-color);
		border-radius: var(--Button__border-radius);
		border-style: var(--Button__border-style);
		border-width: var(--Button__border-width);
		box-sizing: border-box;
		color: var(--Button__color);
		cursor: pointer;
		display: inline-flex;
		flex-direction: row;
		font: inherit;
		align-content: center;
		align-items: center;
		justify-content: center;
		justify-items: center;
		column-gap: 0.25em;
		overflow: hidden;
		padding: 0.5em 1em;
		text-decoration: none;
		text-overflow: ellipsis;
		transition: background-color 250ms, color 250ms, border-color 250ms;
		white-space: nowrap;
		user-select: none;
	}

	button.vertical {
		flex-direction: column;
		row-gap: 0.15em;
	}

	button.circular {
		border-radius: 10000px;
		padding: 0.5em;
	}

	button.square {
		border-radius: 0;
	}

	button:hover {
		background-color: var(--Button__background-color--hover);
		border-color: var(--Button__border-color--hover);
		color: var(--Button__color--hover);
	}

	button:active {
		background-color: var(--Button__background-color--active);
		border-color: var(--Button__border-color--active);
		color: var(--Button__color--active);
	}

	button:focus-visible {
		border-color: var(--Button__border-color--focus);
		outline-color: var(--Common__outline-color);
		outline-offset: var(--Common__outline-offset);
		outline-style: var(--Common__outline-style);
		outline-width: var(--Common__outline-width);
	}

	button:disabled {
		background-color: var(--Button__background-color--disabled);
		border-color: var(--Button__border-color--disabled);
		color: var(--Button__color--disabled);
		cursor: not-allowed;
	}

	button.outline {
		background-color: transparent;
	}

	button.outline:hover {
		background-color: var(--Button__background-color--hover);
	}

	button.outline:active {
		background-color: var(--Button__background-color--active);
	}

	button.outline:disabled {
		background-color: transparent;
	}

	button.outline:disabled:hover {
		border-color: var(--Button__border-color--disabled);
	}

	button.ghost {
		background-color: transparent;
		border-color: transparent;
	}

	button.ghost:hover {
		background-color: var(--Button__background-color--hover);
		border-color: transparent;
	}

	button.ghost:active {
		background-color: var(--Button__background-color--active);
		border-color: transparent;
	}

	button.ghost:focus-visible {
		border-color: var(--Button__border-color--focus);
	}

	button.ghost:disabled {
		border-color: transparent;
	}

	button.ghost:disabled:hover {
		background-color: var(--Button__background-color--disabled);
	}
</style>
