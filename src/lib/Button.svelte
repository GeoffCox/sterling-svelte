<script lang="ts">
	export let vertical: boolean = false;
    export let look : 'default' | 'outline' | 'ghost' | 'link' = 'default';
</script>

<button
	class="sterling-button"
	class:ghost={look === 'ghost'}
	class:link={look === 'link'}
	class:outline={look === 'outline'}
	class:vertical
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
		background-color: var(--button__background-color, #efefef);
		border-color: var(--button__border-color, #777);
		border-radius: var(--button__border-radius, 0.5em);
		border-style: var(--button__border-style, solid);
		border-width: var(--button__border-width, 0.07em);
		box-sizing: border-box;
		color: var(--button__color, #222);
		cursor: pointer;
		display: inline-flex;
		flex-direction: row;
		align-content: center;
		align-items: center;
		justify-content: center;
		justify-items: center;
		column-gap: 0.25em;
		overflow: hidden;
		padding: 0.5em 1em;
		text-decoration: none;
		text-overflow: ellipsis;
		transition: background-color 250ms, color 250ms, border-color 250ms;
		white-space: nowrap;
	}

	button.vertical {
		flex-direction: column;
        row-gap: 0.15em;
	}

	button.ghost {
		background-color: transparent;
		border-color: transparent;
	}

	button.link {
		background: none;
		border-top: none;
		border-left: none;
		border-right: none;
		border-radius: 0;
		border-bottom-color: transparent;
		border-bottom-style: var(--button__border-style, solid);
		border-bottom-width: var(--button__border-width, 0.15em);
		padding: 0;
		outline-offset: 2px;
	}

	button.outline {
		background-color: transparent;
	}

	button:hover {
		background-color: var(--button__background-color--hover, #eaeaea);
		border-color: var(--button__border-color--hover, #555);
		color: var(--button__color--hover, #222);
	}

	button.ghost:hover {
		border-color: var(--button__background-color--hover, #eaeaea);
	}

	button.link:hover {
		background: none;
		border-bottom-color: var(--button__border-color, #777);
	}

	button:active {
		background-color: var(--button__background-color--active, #dcdcdc);
		border-color: var(--button__border-color--active, #444);
		color: var(--button__color--active, #222);
	}

	button.ghost:active {
		border-color: var(--button__background-color--hover, #eaeaea);
	}

	button.link:active {
		background: none;
		border-bottom-color: var(--button__color--active, #222);
	}

	button:focus-visible {
		border-color: var(--button__border-color--focus, black);
		outline-color: var(--button__outline-color--focus, var(--button__border-color--focus, black));
		outline-style: var(--button__outline-style--focus, var(--button__border-style, solid));
		outline-width: var(--button__outline-width--focus, var(--button__border-width, 0.07em));
	}

	button.ghost:focus-visible {
		border-radius: var(--button__border-radius, 0.5em);
		border-style: var(--button__border-style, solid);
		border-width: var(--button__border-width, 0.07em);
	}

	button.link:focus-visible {
		outline-width: calc(
			var(--button__outline-width--focus, var(--button__border-width, 0.07em)) * 2
		);
	}

	button:disabled {
		background-color: var(--button__background-color--disabled, rgba(0, 0, 0, 0.1));
		border-color: var(--button__border-color--disabled, rgba(0, 0, 0, 0.25));
		color: var(--button__color--disabled, rgba(0, 0, 0, 0.25));
	}

	button.ghost:disabled {
		border: none;
	}

	button.outline:disabled {
		background-color: transparent;
	}

	button.link:disabled {
		background-color: transparent;
	}
</style>
