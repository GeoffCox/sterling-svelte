<button
	class="sterling-primary-button"
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
	on:wheel
	{...$$restProps}
>
	<slot />
</button>

<style>
	button {
		background-color: var(--PrimaryButton__background-color);
		border-color: var(--PrimaryButton__border-color);
		border-radius: var(--Button__border-radius);
		border-style: var(--Button__border-style);
		border-width: var(--Button__border-width);
		box-sizing: border-box;
		color: var(--PrimaryButton__color);
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

	button:hover {
		background-color: var(--PrimaryButton__background-color--hover);
		border-color: var(--PrimaryButton__border-color--hover);
		color: var(--PrimaryButton__color--hover);
	}

	button:active {
		background-color: var(--PrimaryButton__background-color--active);
		border-color: var(--PrimaryButton__border-color--active);
		color: var(--PrimaryButton__color--active);
	}

	button:focus-visible {
		border-color: var(--PrimaryButton__border-color--focus);
		outline-color: var(--PrimaryButton__outline-color--focus, var(--Button__border-color--focus));
		outline-style: var(--PrimaryButton__outline-style--focus, var(--Button__border-style));
		outline-width: var(--PrimaryButton__outline-width--focus, var(--Button__border-width));
	}

	button:disabled {
		background-color: var(--PrimaryButton__background-color--disabled);
		border-color: var(--PrimaryButton__border-color--disabled);
		color: var(--PrimaryButton__color--disabled);
		cursor: not-allowed;
	}
</style>
