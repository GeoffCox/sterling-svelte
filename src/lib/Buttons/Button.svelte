<script lang="ts">
	import type { ButtonType } from './Button.types';

	export let type: ButtonType = 'default';
	export let circular = false;
</script>

<button
	class="sterling-button"
	class:circular
	class:outline={type === 'outline'}
	class:ghost={type === 'ghost'}
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
	}

	button.vertical {
		flex-direction: column;
		row-gap: 0.15em;
	}

	button.circular {
		border-radius: 10000px;
		padding: 0.5em;
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
		background-color: transparent;
		border-color: transparent;
	}
</style>
