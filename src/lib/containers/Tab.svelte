<script lang="ts">
  import { getContext } from 'svelte';

  import type { TabListContext, TabData } from './Tabs.types';
  import { tabListContextKey } from './Tabs.constants';

  type T = $$Generic;

  export let data: TabData<T> | undefined = undefined;
  export let disabled = false;
  export let tabId: string | undefined = undefined;
  export let text: string | undefined = undefined;
  export let selected = false;

  let tabRef: HTMLButtonElement;

  const {
    disabled: tabListDisabled,
    selectedTabId,
    selectionFollowsFocus,
    vertical
  } = getContext<TabListContext<T>>(tabListContextKey);

  $: _tabId = tabId || data?.tabId;
  $: _text = text || data?.text || _tabId;
  $: _disabled = $tabListDisabled || disabled || data?.disabled === true;

  $: {
    if (!_tabId) {
      throw new Error('Both tabId and data.tabId are missing');
    }
  }

  $: {
    selected = $selectedTabId === _tabId;
  }

  $: {
    if (selected) {
      selectedTabId.set(_tabId);
      tabRef?.focus();
    }
  }

  const getFirstActiveTab = () => {
    let foundTab = tabRef.parentElement?.firstElementChild as HTMLButtonElement;
    while (foundTab) {
      if (!foundTab.disabled && foundTab.getAttribute('data-tab-id')) {
        break;
      }
      foundTab = foundTab.nextElementSibling as HTMLButtonElement;
    }
    return foundTab;
  };

  const getLastActiveTab = () => {
    let foundTab = tabRef.parentElement?.lastElementChild as HTMLButtonElement;
    while (foundTab) {
      if (!foundTab.disabled && foundTab.getAttribute('data-tab-id')) {
        break;
      }
      foundTab = foundTab.previousElementSibling as HTMLButtonElement;
    }
    return foundTab;
  };

  const getPreviousActiveTab = () => {
    let foundTab = tabRef?.previousElementSibling as HTMLButtonElement;
    while (foundTab) {
      if (!foundTab.disabled && foundTab.getAttribute('data-tab-id')) {
        break;
      }
      foundTab = foundTab.previousElementSibling as HTMLButtonElement;
    }
    return foundTab;
  };

  const getNextActiveTab = () => {
    let foundTab = tabRef?.nextElementSibling as HTMLButtonElement;
    while (foundTab) {
      if (!foundTab.disabled && foundTab.getAttribute('data-tab-id')) {
        break;
      }
      foundTab = foundTab.nextElementSibling as HTMLButtonElement;
    }
    return foundTab;
  };

  const focusFirstTab = (): boolean => {
    if (!_disabled) {
      let foundTab = getFirstActiveTab();
      if (foundTab) {
        foundTab.focus();
        return true;
      }
    }
    return false;
  };

  const focusLastTab = () => {
    if (!_disabled) {
      let foundTab = getLastActiveTab();
      if (foundTab) {
        foundTab.focus();
        return true;
      }
    }
    return false;
  };

  const focusPreviousTab = () => {
    if (!_disabled) {
      let foundTab = getPreviousActiveTab();
      if (foundTab) {
        foundTab.focus();
        return true;
      }
    }
    return false;
  };

  const focusNextTab = () => {
    if (!_disabled) {
      let foundTab = getNextActiveTab();
      if (foundTab) {
        foundTab.focus();
        return true;
      }
    }
    return false;
  };

  const onClick: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!_disabled) {
      selectedTabId.set(_tabId);
    }
  };

  const onFocus: svelte.JSX.FocusEventHandler<HTMLButtonElement> = (event) => {
    if (!_disabled && $selectionFollowsFocus) {
      selectedTabId.set(_tabId);
    }
  };

  const onKeydown: svelte.JSX.KeyboardEventHandler<HTMLButtonElement> = (event) => {
    // if using arrows, only move when there are no modifier keys
    if (!_disabled && !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      switch (event.key) {
        case 'Home':
          if (focusFirstTab()) {
            event.preventDefault();
            return false;
          }
          break;
        case 'End':
          if (focusLastTab()) {
            event.preventDefault();
            return false;
          }
          break;
        case 'ArrowLeft':
          if (!$vertical && focusPreviousTab()) {
            event.preventDefault();
            return false;
          }
          break;
        case 'ArrowRight':
          if (!$vertical && focusNextTab()) {
            event.preventDefault();
            return false;
          }
          break;
        case 'ArrowUp':
          if ($vertical && focusPreviousTab()) {
            event.preventDefault();
            return false;
          }
          break;
        case 'ArrowDown':
          if ($vertical && focusNextTab()) {
            event.preventDefault();
            return false;
          }
          break;
        default:
          break;
      }
    }
  };
</script>

<button
  bind:this={tabRef}
  class="sterling-tab"
  disabled={_disabled}
  class:selected
  class:vertical={$vertical}
  data-tab-id={_tabId}
  role="tab"
  tabindex={selected ? 0 : -1}
  type="button"
  on:blur
  on:click={onClick}
  on:click
  on:dblclick
  on:focus={onFocus}
  on:focus
  on:focusin
  on:focusout
  on:keydown={onKeydown}
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
    <slot {data} disabled={_disabled} {selected} tabId={_tabId} text={_text}>
      <div class="text">
        {_text || _tabId}
      </div>
    </slot>
  </div>
  <div class="indicator" />
</button>

<style>
  .sterling-tab {
    align-content: center;
    align-items: center;
    background-color: var(--Common__background-color);
    border-color: transparent;
    border-radius: var(--Button__border-radius);
    border-style: var(--Common__border-style);
    border-width: 0;
    box-sizing: border-box;
    color: var(--Common__color);
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
    background-color: var(--Common__background-color--hover);
    color: var(--Common__color--hover);
  }

  .sterling-tab:active {
    background-color: var(--Common__background-color--active);
    color: var(--Common__color--active);
  }

  .sterling-tab:focus-visible {
    outline-color: var(--Common__outline-color);
    outline-offset: var(--Common__outline-offset);
    outline-style: var(--Common__outline-style);
    outline-width: var(--Common__outline-width);
  }

  .sterling-tab:disabled {
    color: var(--Common__color--disabled);
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
    background-color: var(--Display__color--faint);
  }

  .sterling-tab:active .indicator {
    background-color: var(--Button__border-color--hover);
  }

  .sterling-tab:disabled .indicator,
  .sterling-tab:disabled:hover .indicator,
  .sterling-tab:disabled:active .indicator {
    background-color: transparent;
  }

  .sterling-tab.selected .indicator {
    background-color: var(--Input__color);
  }

  .sterling-tab.selected:disabled .indicator {
    background-color: var(--Input__color--disabled);
  }
</style>
