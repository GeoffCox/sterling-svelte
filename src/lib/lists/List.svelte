<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	/**
	 * Disables the list and all items
	 */
	export let disabled: boolean = false;

	/**
	 * The items to list.
	 */
	export let items: any[] = [];

	/**
	 * Lay out items horizontally
	 */
	export let horizontal = false;

	/**
	 * The index of the selected item
	 */
	export let selectedIndex = -1;

	/**
	 * If the selection of items should use tabs or arrows.
	 * @default 'arrows'
	 */
	export let selectionKeys: 'tab' | 'arrows' = 'arrows';

	let listRef: HTMLDivElement;
	let itemRefs: any = {};

	let focusVisible = false;

	const dispatch = createEventDispatcher();

	const raiseItemSelected = (index: number, item: any) => {
		dispatch('itemSelected', { index, item });
	};

	$: selectedItem = items[selectedIndex];

	$: {
		raiseItemSelected(selectedIndex, items[selectedIndex]);
	}

	// When using the Tab key for selecting items, the focus will be on the list item.
	// :focus-visible won't be active on the list itself, so focusVisible is calculated to apply .focus-visible.
	const updateFocusVisible = () => {
		focusVisible = !disabled && listRef.querySelector('.list-item:focus-visible') !== null;
	};

	export const focusSelectedItem = () => {
		listRef.focus();
		const selectedRef = itemRefs[selectedIndex] as HTMLDivElement;
		selectedRef?.focus();
		selectedRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
		updateFocusVisible();
	};

	$: disabled,
		() => {
			updateFocusVisible();
		};

	// When the selectedIndex changes, scroll it into view
	$: {
		const selectedRef = itemRefs[selectedIndex] as HTMLDivElement;
		selectedRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
	}

	const onListFocus: svelte.JSX.FocusEventHandler<HTMLDivElement> = (event) => {
		if (!disabled && selectionKeys === 'tab') {
			focusSelectedItem();
		}
	};

	const onItemClick = (item: any, index: number) => {
		if (!disabled) {
			selectedIndex = index;
		}
	};

	const onItemBlur = (item: any, index: number) => {
		if (!disabled) {
			updateFocusVisible();
		}
	};

	const onItemFocus = (item: any, index: number) => {
		if (!disabled && selectionKeys === 'tab') {
			selectedIndex = index;
			updateFocusVisible();
		}
	};

	const onArrowSelectPrevious: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (!disabled && items.length > 0 && selectedIndex !== 0) {
			event.preventDefault();
			event.stopPropagation();
			selectedIndex = Math.max(0, selectedIndex - 1);
		}
	};

	const onArrowSelectNext: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (!disabled && items.length > 0 && selectedIndex !== items.length - 1) {
			event.preventDefault();
			event.stopPropagation();
			selectedIndex = Math.min(items.length - 1, selectedIndex + 1);
		}
	};

	const onKeydown: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		// if using arrows, only move when there are no modifier keys
		if (
			selectionKeys === 'arrows' &&
			!event.ctrlKey &&
			!event.shiftKey &&
			!event.altKey &&
			!event.metaKey
		) {
			switch (event.key) {
				case 'ArrowLeft':
					if (horizontal) {
						onArrowSelectPrevious(event);
					}
					break;
				case 'ArrowRight':
					if (horizontal) {
						onArrowSelectNext(event);
					}
					break;
				case 'ArrowUp':
					if (!horizontal) {
						onArrowSelectPrevious(event);
					}
					break;
				case 'ArrowDown':
					if (!horizontal) {
						onArrowSelectNext(event);
					}
					break;
				default:
					break;
			}
		}

		dispatch('keydown', event);
	};
</script>

<div
	bind:this={listRef}
	class="sterling-list"
	class:disabled
	class:focus-visible={focusVisible}
	class:horizontal
	tabindex={0}
	on:blur
	on:click
	on:copy
	on:cut
	on:dblclick
	on:focus={onListFocus}
	on:focus
	on:focusin
	on:focusout
	on:keydown={onKeydown}
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
	{#each items as item, index (item)}
		<div
			bind:this={itemRefs[index]}
			data-index={index + 1}
			class="list-item"
			class:disabled
			class:selected={index === selectedIndex}
			on:blur={() => onItemBlur(item, index)}
			on:click={() => onItemClick(item, index)}
			on:focus={(event) => onItemFocus(item, index)}
			tabindex={selectionKeys === 'tab' ? 0 : undefined}
		>
			<slot {disabled} {index} {item} selected={selectedIndex === index}>{item}</slot>
		</div>
	{/each}
</div>

<style>
	.sterling-list {
		background-color: var(--List__background-color, white);
		border-color: var(--List__border-color, black);
		border-radius: var(--List__border-radius, 0.15em);
		border-style: var(--List__border-style, solid);
		border-width: var(--List__border-width, 0.07em);
		box-sizing: border-box;
		color: var(--List__color, black);
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		position: relative;
		transition: background-color 250ms, color 250ms, border-color 250ms;
		width: 100%;
	}

	.sterling-list.horizontal {
		flex-direction: row;
		overflow-x: auto;
		overflow-y: hidden;
	}

	.sterling-list:hover {
		background-color: var(--List__background-color--hover, white);
		border-color: var(--List__border-color--hover, black);
		color: var(--List__color--hover, black);
	}

	.sterling-list:focus-visible,
	.sterling-list.focus-visible {
		background-color: var(--List__background-color--focus, white);
		border-color: var(--List__border-color--focus, black);
		color: var(--List__color--focus, black);
		outline-color: var(--List__outline-color--focus, black);
		outline-style: var(--List__outline-style--focus, solid);
		outline-width: var(--List__outline-width--focus, 0.1em);
	}

	.sterling-list.disabled {
		background-color: var(--List__background-color--disabled, whitesmoke);
		border-color: var(---List__border-color--disabled, darkgrey);
		color: var(--List__color--disabled, darkgrey);
		cursor: not-allowed;
	}

	.list-item {
		outline: none;
		transition: background-color 150ms, color 150ms, border-color 150ms;
	}

	.list-item:hover {
		background-color: var(--ListItem__background-color--hover, whitesmoke);
		color: var(--ListItem__color--hover, black);
	}

	.list-item.selected {
		background-color: var(--ListItem__background-color--active, lightgrey);
		color: var(--ListItem__color--selected, black);
	}

	.list-item.disabled {
		background-color: var(--ListItem__background-color--disabled, whitesmoke);
		color: var(--ListItem__color--disabled, darkgrey);
	}
</style>
