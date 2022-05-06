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
		background-color: var(--PrimaryButton__background-color, grey);
		border-color: var(--PrimaryButton__border-color, black);
		border-radius: var(--Button__border-radius, 0.5em);
		border-style: var(--Button__border-style, solid);
		border-width: var(--Button__border-width, 0.07em);
		box-sizing: border-box;
		color: var(--PrimaryButton__color, white);
		cursor: pointer;
		display: inline-flex;
		flex-direction: row;
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
		background-color: var(--PrimaryButton__background-color--hover, darkgrey);
		border-color: var(--PrimaryButton__border-color--hover, black);
		color: var(--PrimaryButton__color--hover, white);
	}

	button:active {
		background-color: var(--PrimaryButton__background-color--active, lightgrey);
		border-color: var(--PrimaryButton__border-color--active, black);
		color: var(--PrimaryButton__color--active, white);
	}

	button:focus-visible {
		border-color: var(--PrimaryButton__border-color--focus, black);
		outline-color: var(--PrimaryButton__outline-color--focus, var(--Button__border-color--focus, black));
		outline-style: var(--PrimaryButton__outline-style--focus, var(--Button__border-style, solid));
		outline-width: var(--PrimaryButton__outline-width--focus, var(--Button__border-width, 0.07em));
	}

	button:disabled {
		background-color: var(--PrimaryButton__background-color--disabled, lightgrey);
		border-color: var(--PrimaryButton__border-color--disabled, whitesmoke);
		color: var(--PrimaryButton__color--disabled, whitesmoke);
		cursor: not-allowed;
	}
</style>
