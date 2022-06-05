<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { computePosition, flip, offset, shift, autoUpdate } from '@floating-ui/dom';
	import List from '$lib/lists/List.svelte';

	/**
	 * Disables the list and all items
	 */
	export let disabled: boolean = false;

	/**
	 * The items to list.
	 */
	export let items: any[] = [];

	/**
	 * The index of the selected item
	 */
	export let selectedIndex = -1;

	/**
	 * Opens the popup to select from the items
	 */
	export let open = false;

	let selectRef: HTMLDivElement;
	let popupRef: HTMLDivElement;
	let listRef: List;

	let selectWidth: number = 0;

	let popupPosition: { x?: number; y?: number } = {
		x: undefined,
		y: undefined
	};

	onMount(() => {
		const cleanup = autoUpdate(selectRef, popupRef, async () => {
			const { x, y } = await computePosition(selectRef, popupRef, {
				placement: 'bottom-end',
				middleware: [offset({ mainAxis: 2 }), flip(), shift({ padding: 0 })]
			});

			if (open) {
				popupPosition = { x, y };
			}
		});

		return cleanup;
	});

	const onButtonClick: svelteHTML.MouseEventHandler<HTMLButtonElement> = (event) => {
		open = !open;
		event.preventDefault();
		event.stopPropagation();
	};

	const onSelectKeydown: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		console.log(event.key);
		if (event.key === ' ') {
			open = !open;
			event.preventDefault();
			event.stopPropagation();
		}
	};

	const onListKeydown: svelteHTML.KeyboardEventHandler<any> = (event) => {
		if (event.key === 'Enter' || event.key === 'Escape') {
			open = !open;
			event.preventDefault();
			event.stopPropagation();
		}
	};

	$: {
		if (open) {
			tick().then(() => listRef?.focusSelectedItem());
			// setTimeout(() => {
			// }, 100);
		} else {
			tick().then(() => selectRef?.focus());
		}
	}
</script>

<div
	bind:clientWidth={selectWidth}
	bind:this={selectRef}
	class="sterling-select"
	on:keydown={onSelectKeydown}
	tabindex="0"
>
	<div class="input">
		<slot name="input">
			<input value={items[selectedIndex]} />
		</slot>
	</div>
	<div class="button">
		<slot name="button">
			<button on:click={onButtonClick} />
		</slot>
	</div>
	<div
		bind:this={popupRef}
		class="popup"
		class:open
		style="left:{popupPosition.x}px; top:{popupPosition.y}px;--Select__popup__width:{selectWidth}px;}"
	>
		<slot name="list">
			<List
				bind:this={listRef}
				bind:selectedIndex
				{items}
				{disabled}
				let:disabled
				let:index
				let:item
				let:selected
				on:keydown={onListKeydown}
			>
				<slot {disabled} {index} {item} {selected} />
			</List>
		</slot>
	</div>
</div>

<style>
	.sterling-select {
		align-items: stretch;
		background-color: var(--Input__background-color, white);
		border-color: var(--Input__border-color, black);
		border-radius: var(--Input__border-radius, 0.15em);
		border-style: var(--Input__border-style, solid);
		border-width: var(--Input__border-width, 0.07em);
		color: var(--Input__color, black);
		display: flex;
		flex-direction: row;
		padding: 0;
		position: relative;
		transition: background-color 250ms, color 250ms, border-color 250ms;
	}

	.sterling-select:hover {
		background-color: var(--Input__background-color--hover, white);
		border-color: var(--Input__border-color--hover, black);
		color: var(--Input__color--hover, black);
	}

	.sterling-select:focus,
	.sterling-select:focus-within {
		background-color: var(--Input__background-color--focus, white);
		border-color: var(--Input__border-color--focus, black);
		color: var(--Input__color--focus, black);
		outline-color: var(--Input__outline-color--focus, black);
		outline-offset: var(--Input__outline-offset--focus, 0);
		outline-style: var(--Input__outline-style--focus, solid);
		outline-width: var(--Input__outline-width--focus, 0.1em);
	}

	.sterling-select:disabled {
		background-color: var(--Input__background-color--disabled, whitesmoke);
		border-color: var(---Input__border-color--disabled, darkgrey);
		color: var(--Input__color--disabled, darkgrey);
		cursor: not-allowed;
	}

	input {
		background-color: var(--Input__background-color, white);
		border: none;
		color: inherit;
		font: inherit;
		margin: 0;
		outline: none;
		padding: 0.5em 0.5em;
	}

	input::placeholder {
		color: var(--Input__placeholder__color, lightgrey);
	}

	input:disabled::placeholder {
		color: var(--Input__placeholder__color--disabled, #d3d3d3);
	}

	button {
		display: block;
		position: relative;
		border: none;
		background: none;
		color: inherit;
		margin: 0;
		height: 100%;
		width: 2em;
	}

	button::after {
		position: absolute;
		content: '';
		top: 50%;
		left: 50%;
		width: 0.4em;
		height: 0.4em;
		border-right: 0.2em solid black;
		border-top: 0.2em solid black;
		transform: translate(-50%, calc(-50% / 0.7)) rotate(135deg);
		transform-origin: 50% 50%;
	}

	.popup {
		box-sizing: border-box;
		display: none;
		height: 200px;
		overflow: hidden;
		position: absolute;
		width: var(--Select__popup__width);
	}

	.popup.open {
		display: block;
	}
</style>
