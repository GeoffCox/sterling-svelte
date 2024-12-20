<svelte:options runes={true} />

<script lang="ts">
  import type { AriaAttributes, HTMLAttributes } from 'svelte/elements';
  import type { ProgressOrientation } from './Progress.types';

  type Props = HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean | null;
    max?: number;
    percent?: number;
    value?: number;
    orientation?: ProgressOrientation | null;
  };

  let {
    class: _class,
    disabled = false,
    max = 100,
    orientation = 'horizontal',
    percent = $bindable(0), //readonly
    value = $bindable(0),
    ...rest
  }: Props = $props();

  //----- State ----- //

  let clientHeight: number = $state(0);
  let clientWidth: number = $state(0);

  let clampMax = $derived(Math.max(1, max));
  let clampValue = $derived(Math.max(0, Math.min(value, clampMax)));
  let ratio = $derived(clampValue / clampMax);

  $effect(() => {
    percent = Math.round(ratio * 100);
  });

  let percentHeight = $derived(clientHeight * ratio);
  let percentWidth = $derived(clientWidth * ratio);

  let indicatorStyle = $derived(
    orientation === 'vertical' ? `height: ${percentHeight}px` : `width: ${percentWidth}px`
  );
</script>

<!-- svelte-ignore a11y_role_supports_aria_props -->
<div
  aria-orientation={orientation as AriaAttributes['aria-orientation']}
  class={['sterling-progress', _class].filter(Boolean).join(' ')}
  class:disabled
  class:horizontal={orientation === 'horizontal'}
  class:vertical={orientation === 'vertical'}
  data-progress-percent={percent}
  data-progress-max={max}
  data-progress-value={value}
  role="progressbar"
  {...rest}
>
  <div class="container" bind:clientWidth bind:clientHeight>
    <div class="indicator" style={indicatorStyle}></div>
  </div>
</div>
