<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="sterling-radio">
	<slot name="before" />
	<span class="container">
		<input
			type="radio"
			on:blur
			on:click
			on:change
			on:dblclick
			on:focus
			on:focusin
			on:focusout
			on:keydown
			on:keypress
			on:keyup
			on:input
			on:mousedown
			on:mouseenter
			on:mouseleave
			on:mousemove
			on:mouseover
			on:mouseout
			on:mouseup
			on:toggle
			on:wheel
			{...$$restProps}
		/>
		<div class="indicator" />
	</span>
	<slot name="after" />
</label>

<style>
	label {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		font-size: inherit;
		outline: none;
		padding: 0;
		margin: 0;
	}

	/* 
		The container 
		- allows the input to be hidden
		- avoids input participating in layout
		- prevents collisions with surrounding slots
	 */
	.container {
		position: relative;
		font-size: inherit;
	}

	/*
		The input is hidden since the built-in browser radio cannot be customized
	*/
	input {
		margin: 0;
		padding: 0;
		position: absolute;
		opacity: 0;
	}

	/*
	 	The indicator handles both the radio box and circle mark.
	 	The box cannot be on the container since the adjacent sibling selector is needed
		and there is not a parent CSS selector.
	*/
	.indicator {
		background-color: var(--Input__background-color, white);
		border-color: var(--Input__border-color, black);
		border-style: var(--Input__border-style, solid);
		border-width: var(--Input__border-width, 0.07em);
		border-radius: 10000px;
		box-sizing: border-box;
		display: inline-block;
		height: 1em;
		position: relative;
		transition: background-color 250ms, color 250ms, border-color 250ms;
		width: 1em;
	}

	input:checked + .indicator {
		background-color: var(--Input__background-color, white);
		border-color: var(--Input__border-color, black);
	}

	input:focus-visible + .indicator {
		outline-color: var(--Input__outline-color--focus, black);
		outline-style: var(--Input__outline-style--focus, solid);
		outline-width: var(--Input__outline-width--focus, 0.1em);
	}

	input:disabled + .indicator {
		background-color: var(--Input__background-color--disabled, whitesmoke);
		border-color: var(--Input__border-color--disabled, darkgrey);
	}

	.indicator::after {
		background-color: transparent;
		border-color: transparent;
		border-style: solid;
		border-width: 0.2em;
		border-radius: 10000px;
		content: '';
		height: 0.2em;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		transition: background-color 200ms, border-color 250ms;
		width: 0.17em;
	}

	/*
		The circle mark is a solid dot centered with the radio circular border
	*/
	input:checked + .indicator::after {
		background-color: var(--Input__color, black);
		border-color: var(--Input__color, black);
	}

	input:disabled + .indicator::after {
		background-color: var(--Input__color--disabled, darkgrey);
		border-color: var(--Input__color--disabled, darkgrey);
	}
</style>
