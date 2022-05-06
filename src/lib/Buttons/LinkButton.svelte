<button
	class="sterling-link-button"
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
		background-color: transparent;
		border-top: none;
		border-left: none;
		border-right: none;
		border-radius: 0;
		border-bottom-color: transparent;
		border-bottom-style: var(--Button__border-style, solid);
		border-bottom-width: var(--Button__border-width, 0.15em);
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
		outline-offset: 2px;
		padding: 0;
		text-decoration: none;
		text-overflow: ellipsis;
		transition: background-color 250ms, color 250ms, border-color 250ms;
		white-space: nowrap;
	}

	button:hover {
		border-bottom-color: var(--Button__border-color, #777);
	}

	button:active {
		border-bottom-color: var(--Button__color--active, #222);
	}

	button:focus-visible {
		border-bottom-color: var(--Button__border-color--focus, black);
		outline-color: var(--Button__outline-color--focus, var(--Button__border-color--focus, black));
		outline-style: var(--Button__outline-style--focus, var(--Button__border-style, solid));
		outline-width: calc(
			var(--Button__outline-width--focus, var(--Button__border-width, 0.07em)) * 2
		);
	}

	button:disabled {
		border-bottom-color: var(--Button__border-color--disabled, #aaa);
		color: var(--Button__color--disabled, #aaa);
	}
</style>
