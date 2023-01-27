<script lang="ts">
  import { v4 as uuid } from 'uuid';

  import Label from '../display/Label.svelte';
  import type { ProgressColorful } from './Progress.types';

  export let value = 0;
  export let max = 100;

  export let percent = 0;

  export let vertical: boolean = false;

  export let colorful: ProgressColorful = 'none';

  export let disabled = false;

  const inputId = uuid();

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
  {#if $$slots.label}
    <Label {disabled} for={inputId}>
      <slot name="label" />
    </Label>
  {/if}
  <div class="progress-bar" id={inputId}>
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
</div>

<style>
  .sterling-progress {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
  }

  .sterling-progress > :global(label) {
    font-size: 0.7em;
    margin: 0.5em 0.7em;
  }

  .sterling-progress > :global(label):empty {
    margin: 0;
  }

  .progress-bar {
    display: block;
    background: var(--Common__background-color);
    box-sizing: border-box;
    height: 1em;
    padding: 0.2em;
    border-width: var(--Common__border-width);
    border-style: var(--Common__border-style);
    border-color: var(--Common__border-color);
    border-radius: var(--Common__border-radius);
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    min-width: 100px;
  }

  .indicator {
    background-color: var(--Display__color);
    box-sizing: border-box;
    height: 100%;
    min-height: 1px;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  /* ----- Vertical ----- */

  .sterling-progress.vertical {
    align-items: center;
    align-content: center;
  }

  .sterling-progress.vertical .progress-bar {
    height: unset;
    width: 1em;
  }

  .sterling-progress.vertical .container {
    flex-direction: column;
    justify-content: flex-end;
    min-width: unset;
    min-height: 100px;
  }

  .sterling-progress.vertical .indicator {
    height: unset;
    min-height: unset;
    min-width: 1px;
    width: 100%;
  }

  /* ----- Colorful ----- */

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

  /* ----- Disabled ----- */

  .sterling-progress.disabled .progress-bar {
    background: var(--Common__background-color--disabled);
    border-color: var(--Common__border-color--disabled);
  }

  .sterling-progress.disabled .indicator {
    background-color: var(--Display__color--disabled);
  }

  @media (prefers-reduced-motion) {
    .progress-bar,
    .indicator {
      transition: none;
    }
  }
</style>
