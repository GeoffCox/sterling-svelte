<input class="sterling-input" {...$$restProps}/>

<style>
	input {
		background-color: var(--Input__background-color, white);
		border-color: var(--Input__border-color, black);
		border-radius: var(--Input__border-radius, 0.15em);
		border-style: var(--Input__border-style, solid);
		border-width: var(--Input__border-width, 0.07em);
        color: var(--Input__color, black);
		padding: 0.5em 0.5em;
		transition: background 250ms, border 250ms, color 250ms;
	}

	input:hover {
		background-color: var(--Input__background-color--hover, white);
		border-color: var(--Input__border-color--hover, black);
		color: var(--Input__color--hover, black);
	}

	input:focus {
		background-color: var(--Input__background-color--focus, white);
		border-color: var(--Input__border-color--focus, black);
		color: var(--Input__color--focus, black);
		outline-color: var(--Input__outline-color--focus, black);
		outline-style: var(--Input__outline-style--focus, solid);
		outline-width: var(--Input__outline-width--focus, 0.1em);
	}

	input:disabled {
		background-color: var(--Input__background-color--disabled, whitesmoke	);
		border-color: var(---Input__border-color--disabled, darkgrey);
		color: var(--Input__color--disabled, darkgrey);
		cursor: not-allowed;
	}

	input::placeholder {
		color: var(--Input__placeholder__color, lightgrey);
	}

	input:disabled::placeholder {
		color: var(--Input__placeholder__color--disabled, lightgrey);
	}
</style>
