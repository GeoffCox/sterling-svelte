<script lang="ts">
	export let value = 0;
	export let max = 100;

	export let percent = 0;

	export let vertical: boolean = false;

	let clientHeight: number;
	let clientWidth: number;

	$: clampMax = Math.max(1, max);
	$: clampValue = Math.max(0, Math.min(value, clampMax));
	$: ratio = clampValue / clampMax;
	$: {
		percent = Math.round(ratio * 100);
	}

	$: percentHeight = clientHeight * ratio;
	$: percentWidth = clientWidth * ratio;

	$: indicatorStyle = vertical ? `height: ${percentHeight}px` : `width: ${percentWidth}px`;
</script>

<div
	class="sterling-progress"
	class:vertical
	on:click
	on:dblclick
	on:focus
	on:blur
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
	<div class="container" bind:clientWidth bind:clientHeight>
		<div class="indicator" style={indicatorStyle} />
	</div>
</div>

<style>
	.sterling-progress {
		display: block;
		background: var(--List__background-color);
		box-sizing: border-box;
		height: 16px;
		padding: 0.2em;
		border: var(--List__border-width) var(--List__border-style) var(--List__border-color);
		border-radius: var(--List__border-radius);
	}

	.sterling-progress.vertical {
		height: unset;
		width: 16px;
	}

	.container {
		display: flex;
		justify-content: flex-start;
		width: 100%;
		height: 100%;
		min-width: 100px;
	}

	.sterling-progress.vertical .container {
		flex-direction: column;
		justify-content: flex-end;
		min-width: unset;
		min-height: 100px;
	}

	.indicator {
		background-color: var(--ListItem__color);
		box-sizing: border-box;
		height: 100%;
		min-height: 1px;
	}

	.sterling-progress.vertical .indicator {
		height: unset;
		min-height: unset;
		min-width: 1px;
		width: 100%;
	}
</style>
