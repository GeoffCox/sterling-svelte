<script lang="ts">
	import type { ProgressColorful } from './Progress.types';

	export let value = 0;
	export let max = 100;

	export let percent = 0;

	export let vertical: boolean = false;

	export let colorful: ProgressColorful;

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
	$: indicatorColor = colorful === 'auto' ? (percent === 100 ? 'success' : 'progress') : colorful;
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
		<div
			class="indicator"
			class:progress={indicatorColor === 'progress'}
			class:success={indicatorColor === 'success'}
			class:warning={indicatorColor === 'warning'}
			class:error={indicatorColor === 'error'}
			style={indicatorStyle}
		/>
	</div>
</div>

<style>
	.sterling-progress {
		display: block;
		background: var(--Common__background-color);
		box-sizing: border-box;
		height: 16px;
		padding: 0.2em;
		border-width: var(--Common__border-width);
		border-style: var(--Common__border-style);
		border-color: var(--Common__border-color);
		border-radius: var(--Common__border-radius);
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
		background-color: var(--Display__color);
		box-sizing: border-box;
		height: 100%;
		min-height: 1px;
	}

	.indicator.progress {
		background-color: var(--Display__color--progress);
	}

	.indicator.success {
		background-color: var(--Display__color--success);
	}

	.indicator.warning {
		background-color: var(--Display__color--warning);
	}

	.indicator.error {
		background-color: var(--Display__color--error);
	}

	.sterling-progress.vertical .indicator {
		height: unset;
		min-height: unset;
		min-width: 1px;
		width: 100%;
	}
</style>
