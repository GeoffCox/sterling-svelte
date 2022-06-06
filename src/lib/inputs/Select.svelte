<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { computePosition, flip, offset, shift, autoUpdate } from '@floating-ui/dom';
	import { clickOutside } from '$lib/actions/clickOutside';
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
	export let selectedIndex = 0;

	/**
	 * Opens the popup to select from the items
	 */
	export let open = false;

	// Tracks the pending selected index
	let pendingSelectedIndex = selectedIndex;

	$: selectedIndex,
		() => {
			pendingSelectedIndex = selectedIndex;
		};

	$: {
		console.log(`pending: ${pendingSelectedIndex} selected: ${selectedIndex}`);
	}

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

	const onSelectClick: svelteHTML.MouseEventHandler<HTMLDivElement> = (event) => {
		open = !open;
		event.preventDefault();
		event.stopPropagation();
	};

	const onSelectKeydown: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.key === ' ') {
			open = !open;
			event.preventDefault();
			event.stopPropagation();
		}
	};

	const onListBlur: svelteHTML.FocusEventHandler<any> = (event) => {
		// if (event.relatedTarget === undefined) {
		// 	open = false;
		// 	pendingSelectedIndex = selectedIndex;
		// }
	};

	const onListKeydown: svelteHTML.KeyboardEventHandler<any> = (event) => {
		if (event.key === 'Enter') {
			selectedIndex = pendingSelectedIndex;
			open = !open;
			event.preventDefault();
			event.stopPropagation();
		}
		if (event.key === 'Escape') {
			pendingSelectedIndex = selectedIndex;
			open = !open;
			event.preventDefault();
			event.stopPropagation();
		}
	};

	const onListClick: svelteHTML.MouseEventHandler<any> = (event) => {
		if (!event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
			selectedIndex = pendingSelectedIndex;
			open = false;
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
	on:click={onSelectClick}
	on:keydown={onSelectKeydown}
	tabindex="0"
	use:clickOutside
	on:click_outside={() => (open = false)}
>
	<div class="input">
		<slot name="input">
			{items[selectedIndex]}
		</slot>
	</div>
	<div class="button">
		<slot name="button">
			<button />
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
				bind:selectedIndex={pendingSelectedIndex}
				{items}
				{disabled}
				let:disabled
				let:index
				let:item
				let:selected
				on:blur={onListBlur}
				on:click={onListClick}
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
		/* 
			The chevron is a right triangle, rotated to face down.
			It should be moved up so it is centered vertically after rotation.
			The amount to move is the hypotenuse of the right triangle of the chevron.
		    For a right triangle with equal a and b where c=1
			a^2 + b^2 = c^2 	
		    a^2 + a^2 = c^2 
		    2a^2 = c^2
			2a^2 = 1
			a^2 = 0.5
			a = sqrt(0.5)
			a = 0.707
		*/
		transform: translate(-50%, calc(-50% / 0.707)) rotate(135deg);
		transform-origin: 50% 50%;
	}

	.popup {
		box-sizing: border-box;
		display: none;
		height: 200px;
		overflow: hidden;
		position: absolute;
		width: var(--Select__popup__width);
		min-width: fit-content;
	}

	.popup.open {
		display: block;
	}
</style>
