<script lang="ts">
  import { createEventDispatcher, setContext } from 'svelte';

  import type { TabData } from './Tabs.types';
  import Tab from './Tab.svelte';
  import { writable } from 'svelte/store';
  import { tabListContextKey } from './Tabs.constants';

  // ----- Props ----- //

  type T = $$Generic;

  export let disabled: boolean = false;
  export let tabs: TabData<T>[] = [];
  export let vertical = false;
  export let selectedTabId: string | undefined = undefined;
  export let selectionFollowsFocus: boolean = false;

  export let selectedTab: TabData<T> | undefined = undefined;

  // ----- Context ----- //

  const selectedTabIdStore = writable<string | undefined>(selectedTabId);
  const selectionFollowsFocusStore = writable<boolean>(selectionFollowsFocus);
  const verticalStore = writable<boolean>(vertical);
  const disabledStore = writable<boolean>(disabled);

  setContext(tabListContextKey, {
    disabled: disabledStore,
    selectedTabId: selectedTabIdStore,
    selectionFollowsFocus: selectionFollowsFocusStore,
    vertical: verticalStore
  });

  // ----- Events ----- //

  const dispatch = createEventDispatcher();

  const raiseSelected = (tabId?: string, tab?: TabData<T>) => {
    dispatch('select', { tabId, tab });
  };

  // ----- Reactions ----- //
  $: disabledStore.set(disabled);

  $: selectedTabIdStore.set(selectedTabId);

  $: {
    selectedTabId = $selectedTabIdStore;
    selectedTab = tabs.find((tab) => tab.tabId === selectedTabId);
    raiseSelected(selectedTabId, selectedTab);
  }

  $: selectionFollowsFocusStore.set(selectionFollowsFocus);
  $: verticalStore.set(vertical);
</script>

<!--
  @component
  A list of items where a single item can be selected.
    -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="sterling-tab-list"
  role="tablist"
  class:vertical
  class:disabled
  on:blur
  on:click
  on:copy
  on:cut
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
  on:scroll
  on:wheel
  on:paste
  {...$$restProps}
>
  {#each tabs as tab (tab.tabId)}
    <Tab data={tab}>
      <svelte:fragment let:data let:disabled let:selected let:tabId let:text>
        <slot name="tabContent" {data} {disabled} {selected} {tabId} {text}>
          <div class="text">
            {text}
          </div>
        </slot>
      </svelte:fragment>
    </Tab>
  {/each}
  <slot />
</div>

<style>
  .sterling-tab-list {
    box-sizing: border-box;
    display: grid;
    margin: 0;
    padding: calc(2 * var(--Common__outline-width));
  }

  .sterling-tab-list:not(.vertical) {
    column-gap: 0.5em;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, auto);
    grid-template-rows: 1fr;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .sterling-tab-list.vertical {
    grid-auto-flow: row;
    grid-template-rows: auto;
    grid-template-columns: 1fr;
    overflow-x: hidden;
    overflow-y: scroll;
    row-gap: 0.5em;
  }

  .sterling-tab-list:hover {
    color: var(--Common__color--hover);
  }

  .sterling-tab-list.vertical .text {
    padding-top: 0.25em;
  }

  @media (prefers-reduced-motion) {
    .sterling-tab-list {
      transition: none;
    }
  }
</style>
