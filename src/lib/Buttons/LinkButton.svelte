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
		border-bottom-style: var(--Button__border-style);
		border-bottom-width: calc(var(--Button__border-width) * 2);
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
		outline-offset: 2px;
		padding: 0;
		text-decoration: none;
		text-overflow: ellipsis;
		transition: background-color 250ms, color 250ms, border-color 250ms;
		white-space: nowrap;
	}

	button:hover {
		border-bottom-color: var(--Button__border-color);
	}

	button:active {
		border-bottom-color: var(--Button__color--active);
	}

	button:focus-visible {
		border-bottom-color: var(--Button__border-color--focus);
		outline: none;
	}

	button:disabled {
		border-bottom-color: var(--Button__border-color--disabled);
		color: var(--Button__color--disabled);
		cursor: not-allowed;
	}
</style>
