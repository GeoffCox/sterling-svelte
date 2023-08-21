<script lang="ts">
  import { getContext } from 'svelte';

  import type { TabListContext } from './TabList.types';
  import { TAB_LIST_CONTEXT_KEY } from './TabList.constants';
  import { usingKeyboard } from './mediaQueries/usingKeyboard';

  // ----- Props ----- //

  /**
   * When true, the tab is disabled.
   * The tab is also disabled if the tab list is disabled.
   */
  export let disabled = false;

  /** When true, the tab is selected. */
  export let selected = false;

  /** The text of the tab when the default slot is not replaced. */
  export let text: string | undefined = undefined;

  /** The value uniquely identifying this item within the tab list. */
  export let value: string;

  // ----- State ----- //
  let tabRef: HTMLButtonElement;

  const {
    disabled: tabListDisabled,
    selectedValue,
    vertical,
    variant
  } = getContext<TabListContext>(TAB_LIST_CONTEXT_KEY);

  $: _disabled = $tabListDisabled || disabled;

  $: {
    selected = $selectedValue === value;
  }

  $: {
    if (selected) {
      selectedValue.set(value);
    }
  }

  // ----- Methods ----- //

  export const click = () => {
    tabRef?.click();
  };

  export const blur = () => {
    tabRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    tabRef?.focus(options);
  };
</script>

<button
  bind:this={tabRef}
  aria-selected={selected}
  class={`sterling-tab ${$variant}`}
  disabled={_disabled}
  class:selected
  class:using-keyboard={$usingKeyboard}
  class:vertical={$vertical}
  data-value={value}
  role="tab"
  type="button"
  tabIndex={selected ? 0 : -1}
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
>
  <div class="content">
    <slot disabled={_disabled} {selected} {text} {value} {variant}>
      <div class="text">
        {text || value}
      </div>
    </slot>
  </div>
  <div class="indicator" />
</button>
