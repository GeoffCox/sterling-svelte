<script lang="ts">
	export let value: string = '';
	export let disabled: boolean = false;
</script>

<!--
	@component
	A styled HTML input element with optional label.
-->
<!-- svelte-ignore a11y-label-has-associated-control -->
{#if $$slots.label}
	<label class="sterling-input-label">
		<div class="label-content" class:disabled>
			<slot name="label" />
		</div>
		<input
			class="sterling-input labeled"
			bind:value
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
			{disabled}
		/>
	</label>
{:else}
	<input
		class="sterling-input"
		bind:value
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
		{disabled}
	/>
{/if}

<style>
	.sterling-input-label {
		display: flex;
		flex-direction: column;
	}

	.label-content {
		font-size: 0.7em;
		margin: 0.5em 0 0 0.7em;
		color: var(--Display__color--subtle);
		transition: background-color 250ms, color 250ms, border-color 250ms;
	}

	.label-content.disabled {
		color: var(--Display__color--disabled);
	}

	.sterling-input-label,
	.sterling-input {
		background-color: var(--Input__background-color);
		border-color: var(--Input__border-color);
		border-radius: var(--Input__border-radius);
		border-style: var(--Input__border-style);
		border-width: var(--Input__border-width);
		color: var(--Input__color);
		font: inherit;
		margin: 0;
		transition: background-color 250ms, color 250ms, border-color 250ms;
	}

	.sterling-input-label:hover,
	.sterling-input:hover {
		background-color: var(--Input__background-color--hover);
		border-color: var(--Input__border-color--hover);
		color: var(--Input__color--hover);
	}

	.sterling-input-label:focus-within,
	.sterling-input:focus-within {
		background-color: var(--Input__background-color--focus);
		border-color: var(--Input__border-color--focus);
		color: var(--Input__color--focus);
		outline-color: var(--Common__outline-color);
		outline-offset: var(--Common__outline-offset);
		outline-style: var(--Common__outline-style);
		outline-width: var(--Common__outline-width);
	}

	.sterling-input-label:disabled,
	.sterling-input:disabled {
		background-color: var(--Input__background-color--disabled);
		border-color: var(---Input__border-color--disabled);
		color: var(--Input__color--disabled);
		cursor: not-allowed;
	}

	.sterling-input {
		padding: 0.5em 0.5em;
		transition: background-color 250ms, color 250ms, border-color 250ms;
	}

	.sterling-input.labeled,
	.sterling-input.labeled:hover,
	.sterling-input.labeled:focus-within,
	.sterling-input.labeled:disabled {
		background-color: transparent;
		border: none;
		outline: none;
	}

	.sterling-input::placeholder {
		color: var(--Display__color--faint);
		transition: background-color 250ms, color 250ms, border-color 250ms;
	}

	.sterling-input:disabled::placeholder {
		color: var(--Display__color--disabled);
	}
</style>
