<!-- @component

-->
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
		background-color: var(--Button__background-color, #fafafa);
		border-color: var(--Button__border-color, #777);
		border-radius: var(--Button__border-radius, 0.5em);
		border-style: var(--Button__border-style, solid);
		border-width: var(--Button__border-width, 0.07em);
		box-sizing: border-box;
		color: var(--Button__color, #222);
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
		background-color: var(--Button__background-color--hover, #f5f5f5);
		border-color: var(--Button__border-color--hover, #555);
		color: var(--Button__color--hover, #222);
	}

	button:active {
		background-color: var(--Button__background-color--active, #ebebeb);
		border-color: var(--Button__border-color--active, #444);
		color: var(--Button__color--active, #222);
	}

	button:focus-visible {
		border-color: var(--Button__border-color--focus, black);
		outline-color: var(--Button__outline-color--focus, var(--Button__border-color--focus, black));
		outline-style: var(--Button__outline-style--focus, var(--Button__border-style, solid));
		outline-width: var(--Button__outline-width--focus, var(--Button__border-width, 0.07em));
	}

	button:disabled {
		background-color: var(--Button__background-color--disabled, #f5f5f5);
		border-color: var(--Button__border-color--disabled, #AAA);
		color: var(--Button__color--disabled, #CCC);
	}
</style>
