<script lang="ts">
  import { getContext } from 'svelte';

  import type { TabListContext } from './Tabs.types';
  import { tabListContextKey } from './Tabs.constants';

  // ----- Props ----- //
  export let disabled = false;
  export let selected = false;
  export let text: string | undefined = undefined;
  export let value: string;

  // ----- State ----- //
  let tabRef: HTMLButtonElement;

  const {
    disabled: tabListDisabled,
    selectedValue,
    usingKeyboard,
    vertical
  } = getContext<TabListContext>(tabListContextKey);

  $: _disabled = $tabListDisabled || disabled;

  $: {
    selected = $selectedValue === value;
  }

  $: {
    if (selected) {
      selectedValue.set(value);
    }
  }
</script>

<button
  bind:this={tabRef}
  aria-selected={selected}
  class="sterling-tab"
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
  on:wheel
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
    background-color: var(--stsv-Common__background-color);
    border-color: transparent;
    border-radius: var(--stsv-Button__border-radius);
    border-style: var(--stsv-Common__border-style);
    border-width: 0;
    box-sizing: border-box;
    color: var(--stsv-Common__color);
    cursor: pointer;
    display: grid;
    font: inherit;
    overflow: hidden;
    padding: 0.5em 1em 0.25em 1em;
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

  .sterling-tab:hover {
    background-color: var(--stsv-Common__background-color--hover);
    color: var(--stsv-Common__color--hover);
  }

  .sterling-tab:active {
    background-color: var(--stsv-Common__background-color--active);
    color: var(--stsv-Common__color--active);
  }

  .sterling-tab.using-keyboard:focus-visible {
    outline-color: var(--stsv-Common__outline-color);
    outline-offset: var(--stsv-Common__outline-offset);
    outline-style: var(--stsv-Common__outline-style);
    outline-width: var(--stsv-Common__outline-width);
  }

  .sterling-tab:disabled {
    color: var(--stsv-Common__color--disabled);
    cursor: not-allowed;
  }

  .content {
    padding: 0 0.2em;
  }

  .sterling-tab.vertical .content .text {
    padding-top: 0.25em;
  }

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

  .sterling-tab:hover .indicator {
    background-color: var(--stsv-Display__color--faint);
  }

  .sterling-tab:active .indicator {
    background-color: var(--stsv-Button__border-color--hover);
  }

  .sterling-tab:disabled .indicator,
  .sterling-tab:disabled:hover .indicator,
  .sterling-tab:disabled:active .indicator {
    background-color: transparent;
  }

  .sterling-tab.selected .indicator {
    background-color: var(--stsv-Input__color);
  }

  .sterling-tab.selected:disabled .indicator {
    background-color: var(--stsv-Common__color--disabled);
  }
</style>
