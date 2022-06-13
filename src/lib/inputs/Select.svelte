<script lang="ts">
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { v4 as uuidv4, v4 } from 'uuid';
	import { computePosition, flip, offset, shift, autoUpdate } from '@floating-ui/dom';
	import { clickOutside } from '$lib/actions/clickOutside';
	import List from '$lib/lists/List.svelte';

	/*--------------------
		Properties
	  --------------------*/

	/**
	 * Disables the list and all items
	 */
	export let disabled: boolean = false;

	/**
	 * The items to list.
	 */
	export let items: any[] = [];

	/**
	 * Opens the popup to select from the items
	 */
	export let open = false;

	/**
	 * The index of the selected item
	 */
	export let selectedIndex = 0;

	export let popupWidth: CSSStyleDeclaration['width'] = 'fit-content';
	export let popupHeight: CSSStyleDeclaration['height'] = '15em'; //7ish items with 0.5em padding top & bottom

	/*--------------------
		State
	  --------------------*/

	// Tracks the pending selected index
	let pendingSelectedIndex = selectedIndex;

	let selectRef: HTMLDivElement;
	let popupRef: HTMLDivElement;
	let listRef: List;

	const popupId = uuidv4();
	let popupPosition: { x?: number; y?: number } = {
		x: undefined,
		y: undefined
	};

	/*--------------------
		Events
	  --------------------*/
	const dispatch = createEventDispatcher();

	const raiseItemSelected = (index: number) => {
		dispatch('itemSelected', { index, item: items[index] });
	};

	const raisePendingItemSelected = (index: number) => {
		dispatch('pendingItemSelect', { index, item: items[index] });
	};

	/*--------------------
		Reactions
	  --------------------*/

	$: selectedIndex,
		() => {
			pendingSelectedIndex = selectedIndex;
		};

	$: {
		raiseItemSelected(selectedIndex);
	}

	$: {
		raisePendingItemSelected(pendingSelectedIndex);
	}

	$: {
		if (open) {
			tick().then(() => listRef?.focusSelectedItem());
		} else {
			tick().then(() => selectRef?.focus());
		}
	}

	/*--------------------
		Event Handlers
	  --------------------*/

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
		if (!disabled) {
			open = !open;
			event.preventDefault();
			event.stopPropagation();
		}
	};

	const onSelectKeydown: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
			switch (event.key) {
				case ' ':
					{
						open = !open;
						event.preventDefault();
						event.stopPropagation();
					}
					break;
				case 'ArrowUp':
					{
						listRef.selectPreviousItem();
						event.preventDefault();
						event.stopPropagation();
					}
					break;
				case 'ArrowDown':
					{
						listRef.selectNextItem();
						event.preventDefault();
						event.stopPropagation();
					}
					break;
			}
		}
	};

	const onListKeydown: svelteHTML.KeyboardEventHandler<any> = (event) => {
		if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
			switch (event.key) {
				case 'Enter':
					{
						selectedIndex = pendingSelectedIndex;
						open = !open;
						event.preventDefault();
						event.stopPropagation();
					}
					break;
				case 'Escape':
					{
						pendingSelectedIndex = selectedIndex;
						open = !open;
						event.preventDefault();
						event.stopPropagation();
					}
					break;
			}
		}
	};

	const onListClick: svelteHTML.MouseEventHandler<any> = (event) => {
		if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
			selectedIndex = pendingSelectedIndex;
			open = false;
			event.preventDefault();
			event.stopPropagation();
		}
	};

	const onPendingItemSelected = (event: CustomEvent<{ index: number; item: any }>) => {
		pendingSelectedIndex = event.detail.index;
		if (!open) {
			selectedIndex = pendingSelectedIndex;
		}
	};
</script>

<!--
@component
Pops up a list of items when clicked. 
A single item can be selected and is displayed as the value.
  -->
<div
	bind:this={selectRef}
	use:clickOutside
	aria-controls={popupId}
	aria-haspopup="listbox"
	aria-expanded={open}
	class="sterling-select"
	class:disabled
	role="combobox"
	tabindex="0"
	on:click_outside={() => (open = false)}
	on:click={onSelectClick}
	on:blur
	on:click
	on:copy
	on:cut
	on:dblclick
	on:focus
	on:focusin
	on:focusout
	on:keydown={onSelectKeydown}
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
	on:paste
	{...$$restProps}
>
	<div class="value">
		<slot name="value">
			{items[selectedIndex]}
		</slot>
	</div>
	<div class="icon">
		<slot name="button">
			<div class="chevron" />
		</slot>
	</div>
	<div
		bind:this={popupRef}
		class="popup"
		class:open
		id={popupId}
		style="left:{popupPosition.x}px; top:{popupPosition.y}px; width:{popupWidth}; height:{popupHeight};"
	>
		<slot name="list">
			{#if $$slots.default === true}
				<List
					bind:this={listRef}
					selectedIndex={pendingSelectedIndex}
					{items}
					{disabled}
					let:disabled
					let:index
					let:item
					let:selected
					on:click={onListClick}
					on:keydown={onListKeydown}
					on:itemSelected={onPendingItemSelected}
				>
					<slot {disabled} {index} {item} {selected} />
				</List>
			{:else}
				<List
					bind:this={listRef}
					selectedIndex={pendingSelectedIndex}
					{items}
					{disabled}
					let:disabled
					let:index
					let:item
					let:selected
					on:click={onListClick}
					on:keydown={onListKeydown}
					on:itemSelected={onPendingItemSelected}
				/>
			{/if}
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

	.sterling-select.disabled {
		background-color: var(--Input__background-color--disabled, whitesmoke);
		border-color: var(---Input__border-color--disabled, darkgrey);
		color: var(--Input__color--disabled, darkgrey);
		cursor: not-allowed;
		outline: none;
	}

	.value {
		padding: 0.5em;
	}

	.chevron {
		display: block;
		position: relative;
		border: none;
		background: none;
		margin: 0;
		height: 100%;
		width: 2em;
	}

	.chevron::after {
		position: absolute;
		content: '';
		top: 50%;
		left: 50%;
		width: 0.4em;
		height: 0.4em;
		border-right: 0.2em solid currentColor;
		border-top: 0.2em solid currentColor;
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
		overflow: hidden;
		position: absolute;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
			rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
		z-index: 1;
	}

	.popup.open {
		display: block;
	}
</style>
