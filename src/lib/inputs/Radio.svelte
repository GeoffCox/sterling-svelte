<script lang="ts">
	import { onMount } from 'svelte';

	/*
	 * bind:group doesn't seem to work properly (yet) in a nested radio.
	 * The workaround is to export `checked` and `group` properties
	 * and implement the same behavior.
	 */
	export let checked: boolean = false;
	export let group: any | undefined | null = undefined;
	export let disabled: boolean = false;

	const onChange: svelte.JSX.ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.currentTarget.checked) {
			group = $$restProps.value;
		}
	};

	let mounted = false;
	onMount(() => {
		if (checked) {
			group = $$restProps.value;
		}
		mounted = true;
	});

	$: {
		if (mounted) {
			checked = group === $$restProps.value;
		}
	}
</script>

<!--
	@component
	A styled HTML input type=radio element with optional label.
-->
<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="sterling-radio">
	<div class="container">
		<input
			type="radio"
			on:blur
			on:click
			on:change
			on:change={onChange}
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
			checked={group === $$restProps.value}
			{...$$restProps}
			{disabled}
		/>
		<div class="indicator" />
	</div>
	<div class="label-content" class:disabled>
		<slot name="label" />
	</div>
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
		box-sizing: border-box;
		position: relative;
		font: inherit;
		display: flex;
		align-items: center;
	}

	/*
		The input is hidden since the built-in browser radio cannot be customized
	*/
	input {
		font: inherit;
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
		background-color: var(--Input__background-color);
		border-color: var(--Input__border-color);
		border-style: var(--Input__border-style);
		border-width: var(--Input__border-width);
		border-radius: 10000px;
		box-sizing: border-box;
		display: inline-block;
		height: 21px;
		position: relative;
		transition: background-color 250ms, color 250ms, border-color 250ms;
		width: 21px;
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

	.indicator::after {
		background-color: transparent;
		border-radius: 10000px;
		content: '';
		height: 9px;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		transition: background-color 250ms;
		width: 9px;
	}

	input:checked + .indicator::after {
		background-color: var(--Input__color);
	}

	input:checked:disabled + .indicator::after {
		background-color: var(--Input__color--disabled);
	}

	.label-content {
		color: var(--Input__color);
	}

	.label-content.disabled {
		color: var(--Input__color--disabled);
	}
</style>
