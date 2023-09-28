<script lang="ts">
  import type { ProgressStatus } from './Progress.types';

  //----- Props ----- //

  /** When true, the progress bar is disabled. */
  export let disabled = false;

  /** The maximum value. */
  export let max = 100;

  /** A read-only percentage between 0 and 100 calculated from value and max. */
  export let percent = 0;

  /** The current status of the progress. */
  export let status: ProgressStatus = 'none';

  /** The current value. */
  export let value = 0;

  /** Additional class names to apply. */
  export let variant: string = '';

  /** When true, the progress bar is displayed vertically. */
  export let vertical: boolean = false;

  //----- State ----- //

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
  $: indicatorColor = status === 'auto' ? (percent === 100 ? 'success' : 'info') : status;
</script>

<!--
	@component
	An indicator of a value between 0 and a maximum value.ß
	Does not use the HTML progress element.
-->
<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  class={`sterling-progress ${variant}`}
  class:disabled
  class:vertical
  class:info={indicatorColor === 'info'}
  class:success={indicatorColor === 'success'}
  class:warning={indicatorColor === 'warning'}
  class:error={indicatorColor === 'danger'}
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
    <div class="indicator" style={indicatorStyle} />
  </div>
</div>
