<script lang="ts">
  import type { ProgressColorful } from './Progress.types';

  export let value = 0;
  export let max = 100;

  export let percent = 0;

  export let vertical: boolean = false;

  export let colorful: ProgressColorful = 'none';

  export let disabled = false;

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
  $: indicatorColor = colorful === 'auto' ? (percent === 100 ? 'success' : 'info') : colorful;
</script>

<!--
	@component
	An indicator of a value between 0 and a maximum value.ß
	Does not use the HTML progress element.
-->
<!-- svelte-ignore a11y-label-has-associated-control -->

<div
  class="sterling-progress"
  class:disabled
  class:vertical
  role="progressbar"
  on:blur
  on:click
  on:dblclick
  on:dragend
  on:dragenter
  on:dragleave
  on:dragover
  on:dragstart
  on:drop
  on:focus
  on:focusin
  on:focusout
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
  on:pointercancel
  on:pointerdown
  on:pointerenter
  on:pointerleave
  on:pointermove
  on:pointerover
  on:pointerout
  on:pointerup
  on:wheel|passive
  {...$$restProps}
>
  <div class="container" bind:clientWidth bind:clientHeight>
    <div
      class="indicator"
      class:info={indicatorColor === 'info'}
      class:success={indicatorColor === 'success'}
      class:warning={indicatorColor === 'warning'}
      class:error={indicatorColor === 'error'}
      style={indicatorStyle}
    />
  </div>
</div>

<style>
  .sterling-progress {
    align-content: flex-start;
    align-items: flex-start;
    background: var(--stsv-common__background-color);
    border-width: var(--stsv-common__border-width);
    border-style: var(--stsv-common__border-style);
    border-color: var(--stsv-common__border-color);
    border-radius: var(--stsv-common__border-radius);
    box-sizing: border-box;
    display: block;
    height: 1em;
    padding: 0.25em;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .sterling-progress.disabled::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      var(--stsv-common--disabled__stripe-angle),
      var(--stsv-common--disabled__stripe-color),
      var(--stsv-common--disabled__stripe-color) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt) var(--stsv-common--disabled__stripe-width),
      var(--stsv-common--disabled__stripe-color--alt)
        calc(2 * var(--stsv-common--disabled__stripe-width))
    );
    pointer-events: none;
  }

  .container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
  }

  .indicator {
    background-color: var(--stsv-common__border-color);
    box-sizing: border-box;
    height: 100%;
    min-height: 1px;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  /* ----- Vertical ----- */

  .sterling-progress.vertical {
    align-items: center;
    align-content: center;
    height: unset;
    width: 1em;
  }

  .sterling-progress.vertical .container {
    flex-direction: column;
    justify-content: flex-end;
    min-width: unset;
  }

  .sterling-progress.vertical .indicator {
    height: unset;
    min-height: unset;
    min-width: 1px;
    width: 100%;
  }

  /* ----- Colorful ----- */

  .indicator.info {
    background-color: var(--stsv-status--info__border-color);
  }

  .indicator.success {
    background-color: var(--stsv-status--success__border-color);
  }

  .indicator.warning {
    background-color: var(--stsv-status--warning__border-color);
  }

  .indicator.error {
    background-color: var(--stsv-status--error__border-color);
  }

  @media (prefers-reduced-motion) {
    .sterling-progress,
    .indicator {
      transition: none;
    }
  }
</style>
