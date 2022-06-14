<script lang="ts">
	export let percent = 0;

	export let vertical: boolean = false;

	let clientHeight: number;
	let clientWidth: number;

	$: clampedPercent = Math.max(0, Math.min(percent, 100));
	$: percentHeight = (clientHeight * clampedPercent) / 100;
	$: percentWidth = (clientWidth * clampedPercent) / 100;

	$: indicatorStyle = vertical ? `height: ${percentHeight}px` : `width: ${percentWidth}px`;
</script>

<div class="sterling-progress" class:vertical {...$$restProps}>
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
		transition: height 500ms, width 500ms;
	}

	.sterling-progress.vertical .indicator {
		height: unset;
		min-height: 1px;
		min-width: unset;
		width: 100%;
	}
</style>
