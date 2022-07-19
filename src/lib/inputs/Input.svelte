<input
	class="sterling-input"
	on:blur
	on:click
	on:change
	on:copy
	on:cut
	on:paste
	on:dblclick
	on:focus
	on:focusin
	on:focusout
	on:input
	on:invalid
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
	on:select
	on:submit
	on:reset
	on:wheel
	{...$$restProps}
/>

<style>
	input {
		background-color: var(--Input__background-color);
		border-color: var(--Input__border-color);
		border-radius: var(--Input__border-radius);
		border-style: var(--Input__border-style);
		border-width: var(--Input__border-width);
		color: var(--Input__color);
		font: inherit;
		margin: 0;
		padding: 0.5em 0.5em;
		transition: background-color 250ms, color 250ms, border-color 250ms;
	}

	input:hover {
		background-color: var(--Input__background-color--hover);
		border-color: var(--Input__border-color--hover);
		color: var(--Input__color--hover);
	}

	input:focus {
		background-color: var(--Input__background-color--focus);
		border-color: var(--Input__border-color--focus);
		color: var(--Input__color--focus);
		outline-color: var(--Common__outline-color);
		outline-offset: var(--Common__outline-offset);
		outline-style: var(--Common__outline-style);
		outline-width: var(--Common__outline-width);
	}

	input:disabled {
		background-color: var(--Input__background-color--disabled);
		border-color: var(---Input__border-color--disabled);
		color: var(--Input__color--disabled);
		cursor: not-allowed;
	}

	input::placeholder {
		color: var(--Input__placeholder__color);
	}

	input:disabled::placeholder {
		color: var(--Input__placeholder__color--disabled);
	}
</style>
