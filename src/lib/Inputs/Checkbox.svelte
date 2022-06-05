<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="sterling-checkbox">
	<slot name="before" />
	<div class="container">
		<input
			type="checkbox"
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
	</div>
	<slot name="after" />
</label>

<style>
	label {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
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
		font-size: inherit;
		position: relative;
	}

	/*
		The input is hidden since the built-in browser checkbox cannot be customized
	*/
	input {
		color: inherit;
		font: inherit;
		margin: 0;
		padding: 0;
		position: absolute;
		opacity: 0;
	}

	/*
	 	The indicator handles both the box and the checkmark.
	 	The box cannot be on the container since the adjacent sibling selector is needed
		and there is not a parent CSS selector.
	*/
	.indicator {
		background-color: var(--Input__background-color, white);
		border-color: var(--Input__border-color, black);
		border-style: var(--Input__border-style, solid);
		border-width: var(--Input__border-width, 0.07em);
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

	/*
		The checkmark is a rotated L centered in the box.
	*/
	input:checked + .indicator::after {
		border-color: var(--Input__color, black);
		border-style: solid;
		border-width: 0 0.2em 0.2em 0;
		box-sizing: content-box;
		content: '';
		height: 0.6em;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%) rotate(45deg);
		transform-origin: center;
		transition: border-color 250ms;
		width: 0.2em;
		visibility: visible;
	}

	input:disabled + .indicator::after {
		border-color: var(--Input__color--disabled, darkgrey);
	}
</style>
