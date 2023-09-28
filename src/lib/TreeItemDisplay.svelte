<script lang="ts">
  import TreeChevron from './TreeChevron.svelte';

  // ----- Props ----- //

  /** The depth of the item in the tree. */
  export let depth = 0;

  /** When true, display the item as disabled. */
  export let disabled = false;

  /** When true, displays the item is expanded showing children. */
  export let expanded = false;

  /** When true, displays the item has children. */
  export let hasChildren = false;

  /** When true, display selected state. */
  export let selected = false;

  /** The value uniquely identifying the tree item within the tree. */
  export let value: string;

  /** Additional class names to apply. */
  export let variant: string = '';

  // ----- State ----- //

  let divRef: HTMLDivElement;

  // ----- Methods ----- //

  export const click = () => {
    divRef?.click();
  };

  export const blur = () => {
    divRef?.blur();
  };

  export const focus = (options?: FocusOptions) => {
    divRef?.focus(options);
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  bind:this={divRef}
  class={`sterling-tree-item-display ${variant}`}
  class:disabled
  class:expanded
  class:selected
  style={`--sterling-tree-item-depth: ${depth}`}
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
  <TreeChevron {expanded} {hasChildren} {variant} />
  <slot {depth} {disabled} {expanded} {hasChildren} {selected} {value} {variant} />
</div>
