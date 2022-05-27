<script lang="ts">
	import { tick } from 'svelte';

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

	$: selectedItem = items[selectedIndex];

	// When the selectedIndex changes, scroll it into view
	$: {
		const selectedRef = itemRefs[selectedIndex] as HTMLDivElement;
		selectedRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
	}

	// When using Tab for selecting items, the focus will be on the list item.
	// The focus-visible won't be active on the list itself,
	// so we track focusVisible and apply .focus-visible to simulate it.
	const updateFocusVisible = () => {
		focusVisible = listRef.querySelector('.list-item:focus-visible') !== null;
	};

	const onListFocus = () => {
		if (selectionKeys === 'tab') {
			const selectedRef = itemRefs[selectedIndex] as HTMLDivElement;
			selectedRef?.focus();
			selectedRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
			updateFocusVisible();
		}
	};

	const onItemClick = (item: any, index: number) => {
		selectedIndex = index;
	};

	const onItemBlur = (item: any, index: number) => {
		tick();
		updateFocusVisible();
	};

	const onItemFocus = (item: any, index: number) => {
		if (selectionKeys === 'tab') {
			selectedIndex = index;
			tick();
			updateFocusVisible();
		}
	};

	const onArrowSelectPrevious: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (items.length > 0 && selectedIndex !== 0) {
			event.preventDefault();
			event.stopPropagation();
			selectedIndex = Math.max(0, selectedIndex - 1);
		}
	};

	const onArrowSelectNext: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (items.length > 0 && selectedIndex !== items.length - 1) {
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
	};
</script>

<div
	bind:this={listRef}
	class="sterling-list"
	class:focus-visible={focusVisible}
	class:horizontal
	tabindex={0}
	on:focus={(event) => onListFocus()}
	on:keydown={onKeydown}
>
	{#each items as item, index (item)}
		<div
			bind:this={itemRefs[index]}
			data-index={index + 1}
			class="list-item"
			class:selected={index === selectedIndex}
			on:blur={() => onItemBlur(item, index)}
			on:click={() => onItemClick(item, index)}
			on:focus={(event) => onItemFocus(item, index)}
			tabindex={selectionKeys === 'tab' ? 0 : undefined}
		>
			<slot {item} {selectedIndex} {selectedItem}>{item}</slot>
		</div>
	{/each}
</div>

<style>
	.sterling-list {
		background-color: var(--Input__background-color, white);
		border-color: var(--Input__border-color, black);
		border-radius: var(--Input__border-radius, 0.15em);
		border-style: var(--Input__border-style, solid);
		border-width: var(--Input__border-width, 0.07em);
		box-sizing: border-box;
		color: var(--Input__color, black);
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
		background-color: var(--Input__background-color--hover, white);
		border-color: var(--Input__border-color--hover, black);
		color: var(--Input__color--hover, black);
	}

	.sterling-list:focus-visible,
	.sterling-list.focus-visible {
		background-color: var(--Input__background-color--focus, white);
		border-color: var(--Input__border-color--focus, black);
		color: var(--Input__color--focus, black);
		outline-color: var(--Input__outline-color--focus, black);
		outline-style: var(--Input__outline-style--focus, solid);
		outline-width: var(--Input__outline-width--focus, 0.1em);
	}

	.sterling-list:disabled {
		background-color: var(--Input__background-color--disabled, whitesmoke);
		border-color: var(---Input__border-color--disabled, darkgrey);
		color: var(--Input__color--disabled, darkgrey);
		cursor: not-allowed;
	}

	.list-item {
		outline: none;
		transition: background-color 250ms, color 250ms, border-color 250ms;
	}

	.list-item:hover {
		background-color: var(--Button__background-color--hover, whitesmoke);
		color: var(--Input__color--hover, black);
	}

	.list-item.selected {
		background-color: var(--Button__background-color--active, lightgrey);
		color: var(--Input__color--selected, black);
	}
</style>
