<script lang="ts">
    export let tabindex : number | string | undefined | null = undefined;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="sterling-checkbox" tabindex={typeof tabindex === 'string' ? parseInt(tabindex) : tabindex}>
	<slot name="before" />
	<span class="container">
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
	</span>
	<slot name="after" />
</label>

<style>
	.sterling-checkbox {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		font-size: inherit;
		padding: 0;
		margin: 0;
	}

	.container {
		position: relative;
		font-size: inherit;
		padding: 0.07em;
		margin: 0;
		display: block;
		width: 1em;
		height: 1em;
	}

	.sterling-checkbox input {
		position: absolute;
		font-size: inherit;
		margin: 0;
		padding: 0;
		left: 0;
		top: 0;
		visibility: hidden;
	}

	.sterling-checkbox input::before {
		background-color: var(--CheckboxInput__background-color, whitesmoke);
		border-color: var(--CheckboxInput__border-color, black);
		border-style: solid;
		border-width: 0.07em;
		content: '';
		height: 1em;
		left: 0;
		position: absolute;
		top: 0;
		width: 1em;
		visibility: visible;
	}

	.sterling-checkbox input:checked::before {
		background-color: var(--CheckboxInput__background-color, whitesmoke);
		border-color: var(--CheckboxInput__border-color, black);
		border-style: solid;
		border-width: 0.07em;
		content: '';
		height: 1em;
		left: 0;
		position: absolute;
		top: 0;
		width: 1em;
		visibility: visible;
	}

	.sterling-checkbox input:checked::after {
		border: 0.07em solid var(--CheckboxInput__check__color, black);
		border-width: 0 0.2em 0.2em 0;
		content: '';
		height: 0.7em;
		left: 0.35em;
		position: absolute;
		top: 0.05em;
		transform: rotate(45deg);
		width: 0.25em;
		visibility: visible;
	}
</style>
