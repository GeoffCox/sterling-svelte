<script lang="ts">
  import { getContext } from 'svelte';

  import type { TabListContext } from './TabList.types';
  import { TAB_LIST_CONTEXT_KEY } from './TabList.constants';
  import { usingKeyboard } from './stores/usingKeyboard';

  // ----- Props ----- //
  export let disabled = false;
  export let selected = false;
  export let text: string | undefined = undefined;
  export let value: string;

  // ----- State ----- //
  let tabRef: HTMLButtonElement;

  const {
    colorful,
    disabled: tabListDisabled,
    selectedValue,
    vertical
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
  class="sterling-tab"
  class:colorful={$colorful}
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
    <slot disabled={_disabled} {selected} {value} {text}>
      <div class="text">
        {text || value}
      </div>
    </slot>
  </div>
  <div class="indicator" />
</button>

<style>
  .sterling-tab {
    align-content: center;
    align-items: center;
    background-color: var(--stsv-common__background-color);
    border-color: transparent;
    border-radius: var(--stsv-button__border-radius);
    border-style: var(--stsv-common__border-style);
    border-width: 0;
    box-sizing: border-box;
    color: var(--stsv-common__color);
    cursor: pointer;
    display: grid;
    font: inherit;
    overflow: hidden;
    padding: 0.5em 1em 0.25em 1em;
    position: relative;
    text-decoration: none;
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-tab:not(.vertical) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1em;
    justify-content: center;
    justify-items: center;
    row-gap: 0.15em;
  }

  .sterling-tab.vertical {
    grid-template-columns: auto 1em;
    grid-template-rows: 1fr;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    justify-items: flex-end;
    column-gap: 0.15em;
  }

  .sterling-tab.using-keyboard:focus-visible {
    outline-color: var(--stsv-common__outline-color);
    outline-offset: var(--stsv-common__outline-offset);
    outline-style: var(--stsv-common__outline-style);
    outline-width: var(--stsv-common__outline-width);
  }

  /* ----- disabled -----*/

  .sterling-tab:disabled {
    cursor: not-allowed;
    outline: none;
  }

  .sterling-tab::after {
    background: repeating-linear-gradient(
      45deg,
      var(--stsv-common__background-color1--disabled),
      var(--stsv-common__background-color1--disabled) 3px,
      var(--stsv-common__background-color2--disabled) 3px,
      var(--stsv-common__background-color2--disabled) 6px
    );
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    pointer-events: none;
    transition: opacity 250ms;
  }

  .sterling-tab:disabled::after {
    opacity: 1;
  }

  /* ----- content -----*/

  .content {
    padding: 0 0.2em;
  }

  .sterling-tab.vertical .content .text {
    padding-top: 0.25em;
  }

  /* ----- indicator -----*/

  .indicator {
    background-color: transparent;
    border-radius: 10000px;
    transition: background-color 250ms;
  }

  .sterling-tab:not(.vertical) .indicator {
    justify-self: stretch;
    height: 0.4em;
  }

  .sterling-tab.vertical .indicator {
    align-self: stretch;
    width: 0.4em;
  }

  .sterling-tab:not(.selected):not(:active):hover .indicator {
    background-color: var(--stsv-input__border-color--hover);
    opacity: 0.3;
  }

  .sterling-tab:active .indicator {
    background-color: var(--stsv-input__border-color--selected);
  }

  .sterling-tab.selected .indicator {
    background-color: var(--stsv-input__border-color--selected);
  }

  /* ----- indicator colorful -----*/

  .sterling-tab.colorful:not(.selected):not(:active):hover .indicator {
    background-color: var(--stsv-input--colorful__border-color--hover);
  }

  .sterling-tab.colorful:active .indicator {
    background-color: var(--stsv-input--colorful__border-color--selected);
  }

  .sterling-tab.colorful.selected .indicator {
    background-color: var(--stsv-input--colorful__border-color--selected);
  }

  /* ----- indicator disabled -----*/

  .sterling-tab:disabled:not(.selected) .indicator,
  .sterling-tab:disabled:not(.selected):hover .indicator,
  .sterling-tab:disabled:not(.selected):active .indicator {
    background-color: transparent;
  }

  /* ----- reduced motion -----*/

  @media (prefers-reduced-motion) {
    .sterling-tab,
    .sterling-tab::after,
    .indicator {
      transition: none;
    }
  }
</style>
