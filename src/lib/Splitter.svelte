<script lang="ts">
  import type { KeyboardEventHandler, PointerEventHandler } from 'svelte/elements';
  import type { SplitterProps } from './Splitter.types';

  const constrainPercent = (value: number) => {
    return Math.max(0.0, Math.min(value, 100.0));
  };

  let {
    horizontal,
    initialPrimarySize,
    minPrimarySize,
    minSecondarySize,
    resetOnDoubleClick,
    primary,
    split,
    secondary,
    change
  }: SplitterProps = $props();

  let clientWidth: number | undefined = $state();
  let clientHeight: number | undefined = $state();
  let primaryClientWidth: number | undefined = $state();
  let primaryClientHeight: number | undefined = $state();
  let splitterClientWidth: number | undefined = $state();
  let splitterClientHeight: number | undefined = $state();
  let secondaryClientWidth: number | undefined = $state();
  let secondaryClientHeight: number | undefined = $state();

  let clientSize = $derived(horizontal ? clientHeight : clientWidth);
  let primaryClientSize = $derived(horizontal ? primaryClientHeight : primaryClientWidth);
  let splitterClientSize = $derived(horizontal ? splitterClientHeight : splitterClientWidth);
  let secondaryClientSize = $derived(horizontal ? secondaryClientHeight : secondaryClientWidth);

  let percent: number | undefined = $state();

  let measuredPercent = $derived.by(() => {
    if (primaryClientSize && splitterClientSize && clientSize) {
      return constrainPercent(
        Math.ceil(
          ((primaryClientSize - splitterClientSize) / (clientSize - splitterClientSize)) * 100
        )
      );
    }
    return 0;
  });

  let startPosition: number | undefined = $state();
  let startPrimarySize: number | undefined = $state();
  let dragging: boolean = $state(false);

  let primarySize = $derived(percent !== undefined ? `${percent}%` : initialPrimarySize);

  let splitCssVars = $derived({
    '--primary-size': `${primarySize || '50%'}`,
    '--min-primary-size': `${minPrimarySize || 0}`,
    '--min-secondary-size': `${minSecondarySize || 0}`
  });

  let splitStyle = $derived(
    Object.entries(splitCssVars)
      .map(([key, value]) => `${key}:${value}`)
      .join(';')
  );

  $effect(() => {
    change?.({
      percent: measuredPercent,
      primarySize: primaryClientSize,
      secondarySize: secondaryClientSize,
      dragging
    });
  });

  $effect(() => {
    if (initialPrimarySize) {
      percent = undefined;
    }
  });

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    startPosition = horizontal ? event.clientY : event.clientX;
    startPrimarySize = primaryClientSize;
    dragging = true;
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (
      event.currentTarget.hasPointerCapture(event.pointerId) &&
      startPosition !== undefined &&
      startPrimarySize !== undefined &&
      clientSize !== undefined &&
      splitterClientSize !== undefined
    ) {
      const position = horizontal ? event.clientY : event.clientX;
      let newPrimarySize = startPrimarySize + (position - startPosition);
      newPrimarySize = Math.max(0, Math.min(newPrimarySize, clientSize - splitterClientSize));
      const newPercent = (newPrimarySize / clientSize) * 100;
      percent = newPercent;
    }
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    startPosition = undefined;
    startPrimarySize = undefined;
    dragging = false;
  };

  const onDoubleClick = () => {
    resetOnDoubleClick && (percent = undefined);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const origPercent = percent || measuredPercent;

    // only move for vanilla keys
    if (!event.ctrlKey && !event.shiftKey && !event.altKey) {
      switch (event.code) {
        case 'Space':
          percent = undefined;
          return;
      }

      if (horizontal) {
        switch (event.code) {
          case 'ArrowUp':
            percent = constrainPercent(origPercent - 1);
            return;
          case 'ArrowDown':
            percent = constrainPercent(origPercent + 1);
            return;
        }
      } else {
        switch (event.code) {
          case 'ArrowLeft':
            percent = constrainPercent(origPercent - 1);
            return;
          case 'ArrowRight':
            percent = constrainPercent(origPercent + 1);
            return;
        }
      }
    }
  };
</script>

<div
  class={['sterling-splitter', horizontal ? 'horizontal' : 'vertical']}
  bind:clientWidth
  bind:clientHeight
  style={splitStyle}
>
  <div
    class="primary"
    bind:clientWidth={primaryClientWidth}
    bind:clientHeight={primaryClientHeight}
  >
    {@render primary?.()}
  </div>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="split"
    bind:clientWidth={splitterClientWidth}
    bind:clientHeight={splitterClientHeight}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    ondblclick={onDoubleClick}
    onkeydown={onKeyDown}
  >
    {#if split}
      {@render split()}
    {:else}
      <div class="default-split-line"></div>
    {/if}
  </div>
  <div
    class="secondary"
    bind:clientWidth={secondaryClientWidth}
    bind:clientHeight={secondaryClientHeight}
  >
    {@render secondary?.()}
  </div>
</div>
