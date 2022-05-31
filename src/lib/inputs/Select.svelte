<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { computePosition, flip, offset, shift, autoUpdate } from '@floating-ui/dom';
	import Button from '$lib/buttons/Button.svelte';
	import Input from '$lib/inputs/Input.svelte';
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

	let targetRef: HTMLDivElement;
	let buttonRef: HTMLDivElement;
	let popupRef: HTMLDivElement;
	let listRef: List;

	let popupPosition: { x?: number; y?: number } = {
		x: undefined,
		y: undefined
	};

	onMount(() => {
		const cleanup = autoUpdate(targetRef, popupRef, async () => {
			console.log('computing position');
			const { x, y } = await computePosition(targetRef, popupRef, {
				placement: 'bottom-end',
				middleware: [offset({ mainAxis: -1 }), flip(), shift({ padding: 0 })]
			});

			if (open) {
				popupPosition = { x, y };
			}
		});

		return cleanup;
	});

	$: {
		console.log(`x: ${popupPosition.x} y:${popupPosition.y}`);
	}

	const onButtonClick = () => {
		open = !open;
	};

	const onListKeydown: svelteHTML.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.key === 'Enter') {
			open = !open;
			targetRef?.focus();
		}
	};

	$: {
		if (open) {
			tick().then(() => listRef.focusSelectedItem());
			// setTimeout(() => {
			// }, 100);
		}
	}
</script>

<div class="sterling-select">
	<div bind:this={targetRef} class="input">
		<slot name="input">
			<Input value={items[selectedIndex]} />
		</slot>
	</div>
	<div bind:this={buttonRef} class="button">
		<slot name="button">
			<Button on:click={onButtonClick}>...</Button>
		</slot>
	</div>
	<div
		bind:this={popupRef}
		class="popup"
		class:open
		on:click={onButtonClick}
		style="left:{popupPosition.x}px; top:{popupPosition.y}px;"
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
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.popup {
		position: absolute;
		display: none;
		width: 'fit-content';
		height: 200px;
		overflow: hidden;
	}

	.popup.open {
		display: block;
	}
</style>
