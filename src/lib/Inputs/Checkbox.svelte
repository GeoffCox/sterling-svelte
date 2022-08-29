<script lang="ts">
	export let checked: boolean = false;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="sterling-checkbox">
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
			bind:checked
			{...$$restProps}
		/>
		<div class="indicator" />
	</div>
	<div class="label-content">
		<slot />
	</div>
</label>

<style>
	.sterling-checkbox {
		display: inline-flex;
		align-content: stretch;
		align-items: stretch;
		box-sizing: border-box;
		font: inherit;
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
		font: inherit;
		position: relative;
		display: grid;
		align-items: center;
	}

	/*
		The input is hidden since the built-in browser checkbox cannot be customized
	*/
	input {
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
		background-color: var(--Input__background-color);
		border-color: var(--Input__border-color);
		border-style: var(--Input__border-style);
		border-width: var(--Input__border-width);
		box-sizing: border-box;
		display: inline-block;
		height: 20px;
		position: relative;
		transition: background-color 250ms, color 250ms, border-color 250ms;
		width: 20px;
	}

	input:checked + .indicator {
		background-color: var(--Input__background-color);
		border-color: var(--Input__border-color);
	}

	input:focus-visible + .indicator {
		outline-color: var(--Common__outline-color);
		outline-offset: var(--Common__outline-offset);
		outline-style: var(--Common__outline-style);
		outline-width: var(--Common__outline-width);
	}

	input:disabled + .indicator {
		background-color: var(--Input__background-color--disabled);
		border-color: var(--Input__border-color--disabled);
	}

	/*
		The checkmark is a rotated L centered in the box.
	*/
	input:checked + .indicator::after {
		border-color: var(--Input__color);
		border-style: solid;
		border-width: 0 3px 3px 0;
		box-sizing: border-box;
		content: '';
		height: 14px;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%) rotate(45deg);
		transform-origin: center;
		transition: border-color 250ms;
		width: 7px;
		visibility: visible;
	}

	input:checked:disabled + .indicator::after {
		border-color: var(--Input__color--disabled);
	}

	.label-content {
		color: var(--Common__color);
		user-select: none;
		margin-top: 0.25em;
	}
</style>
