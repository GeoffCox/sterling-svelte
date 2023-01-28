<script lang="ts">
  type T = $$Generic;

  export let disabled = false;
  export let selected = false;
  export let index = -1;
  export let item: T | undefined = undefined;
</script>

<div
  aria-selected={disabled ? undefined : selected}
  class="sterling-list-item"
  class:disabled
  class:selected
>
  <slot {disabled} {selected} {index} {item} />
</div>

<style>
  .sterling-list-item {
    background-color: transparent;
    box-sizing: border-box;
    color: var(--Input__color);
    margin: 0;
    padding: 0.5em;
    outline: none;
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-list-item:hover {
    background-color: var(--Button__background-color--hover);
    color: var(--Button__color--hover);
  }

  .sterling-list-item.selected {
    background-color: var(--Input__background-color--selected);
    color: var(--Input__color--selected);
  }

  .sterling-list-item.disabled {
    color: var(--Input__color--disabled);
  }

  @media (prefers-reduced-motion) {
    .sterling-list-item {
      transition: none;
    }
  }
</style>
