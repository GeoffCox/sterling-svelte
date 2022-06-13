<script lang="ts">
	import { createEventDispatcher } from 'svelte';

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
	 * Lay out items horizontally
	 */
	export let horizontal = false;

	/**
	 * The index of the selected item
	 */
	export let selectedIndex = -1;

	/*--------------------
		State
	  --------------------*/

	let listRef: HTMLDivElement;
	let itemRefs: any = {};

	let focusVisible = false;

	/*--------------------
		Events
	  --------------------*/
	const dispatch = createEventDispatcher();

	const raiseItemSelected = (index: number) => {
		dispatch('itemSelected', { index, item: items[index] });
	};

	/*--------------------
		Methods
	  --------------------*/

	export const focusSelectedItem = () => {
		listRef.focus();
		const selectedRef = itemRefs[selectedIndex] as HTMLDivElement;
		selectedRef?.focus();
		selectedRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
	};

	$: canSelectPreviousItem = items.length > 0 && selectedIndex !== 0;
	$: canSelectNextItem = items.length > 0 && selectedIndex !== items.length - 1;

	export const selectPreviousItem = () => {
		if (canSelectPreviousItem) {
			selectedIndex = Math.max(0, selectedIndex - 1);
		}
	};

	export const selectNextItem = () => {
		if (canSelectNextItem) {
			selectedIndex = Math.min(items.length - 1, selectedIndex + 1);
		}
	};

	/*--------------------
		Reactions
	  --------------------*/

	$: {
		raiseItemSelected(selectedIndex);
	}

	// When the selectedIndex changes, scroll it into view
	$: {
		const selectedRef = itemRefs[selectedIndex] as HTMLDivElement;
		selectedRef?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
	}

	/*--------------------
		Event Handlers
	  --------------------*/

	const onItemClick = (item: any, index: number) => {
		if (!disabled) {
			selectedIndex = index;
		}
	};

	const onArrowSelectPrevious: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (!disabled) {
			event.preventDefault();
			event.stopPropagation();
			selectPreviousItem();
		}
	};

	const onArrowSelectNext: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (!disabled) {
			event.preventDefault();
			event.stopPropagation();
			selectNextItem();
		}
	};

	const onKeydown: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		// if using arrows, only move when there are no modifier keys
		if (!disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
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

<!--
@component
A list of items where a single item can be selected.
  -->
<div
	bind:this={listRef}
	class="sterling-list"
	class:disabled
	class:focus-visible={focusVisible}
	class:horizontal
	role="listbox"
	tabindex={!disabled ? 0 : undefined}
	on:blur
	on:click
	on:copy
	on:cut
	on:dblclick
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
	on:scroll
	on:wheel
	on:paste
	{...$$restProps}
>
	{#each items as item, index (item)}
		{@const selected = selectedIndex === index}
		<div
			bind:this={itemRefs[index]}
			aria-selected={disabled ? undefined : selected}
			class="list-item"
			class:selected
			class:disabled
			data-index={index + 1}
			role="option"
			on:click={() => onItemClick(item, index)}
		>
			<slot {disabled} {index} {item} {selected}>
				{item}
			</slot>
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
		flex-wrap: nowrap;
		height: 100%;
		margin: 0;
		overflow-x: hidden;
		overflow-y: scroll;
		padding: 0;
		position: relative;
		transition: background-color 250ms, color 250ms, border-color 250ms;
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
		background-color: var(--ListItem__background-color, white);
		box-sizing: border-box;
		color: var(--ListItem__color, black);
		margin: 0;
		padding: 0.5em;
		outline: none;
		text-overflow: ellipsis;
		transition: background-color 150ms, color 150ms, border-color 150ms;
		white-space: nowrap;
	}

	.list-item:hover {
		background-color: var(--ListItem__background-color--hover, whitesmoke);
		color: var(--ListItem__color--hover, black);
	}

	.list-item.selected {
		background-color: var(--ListItem__background-color--selected, lightgrey);
		color: var(--ListItem__color--selected, black);
	}

	.list-item.disabled {
		background-color: var(--ListItem__background-color--disabled, whitesmoke);
		color: var(--ListItem__color--disabled, darkgrey);
	}
</style>
