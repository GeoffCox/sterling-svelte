<button
	class="sterling-button"
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
		background-color: var(--PrimaryButton__background-color, hsl(206, 85%, 45%));
		border-color: var(--PrimaryButton__border-color, hsl(206, 85%, 35%));
		border-radius: var(--Button__border-radius, 0.5em);
		border-style: var(--Button__border-style, solid);
		border-width: var(--Button__border-width, 0.07em);
		box-sizing: border-box;
		color: var(--PrimaryButton__color, #fff);
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
		background-color: var(--PrimaryButton__background-color--hover, hsl(206, 85%, 42%));
		border-color: var(--PrimaryButton__border-color--hover, hsl(206, 85%, 32%));
		color: var(--Button__color--hover, #fff);
	}

	button:active {
		background-color: var(--PrimaryButton__background-color--active, hsl(206, 85%, 35%));
		border-color: var(--PrimaryButton__border-color--active, hsl(206, 85%, 25%));
		color: var(--PrimaryButton__color--active, #fff);
	}

	button:focus-visible {
		border-color: var(--PrimaryButton__border-color--focus, black);
		outline-color: var(--Button__outline-color--focus, var(--Button__border-color--focus, black));
		outline-style: var(--Button__outline-style--focus, var(--Button__border-style, solid));
		outline-width: var(--Button__outline-width--focus, var(--Button__border-width, 0.07em));
	}

	button:disabled {
		background-color: var(--Button__background-color--disabled, rgba(245, 245, 245, 0.7));
		border-color: var(--Button__border-color--disabled, rgba(85, 85, 85, 0.7));
		color: var(--Button__color--disabled, rgba(34, 34, 34, 0.7));
	}
</style>
