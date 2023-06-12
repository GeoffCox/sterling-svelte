<!--
@component
A styled line to visually separate menu items in a menu.
  -->
<div
  class="sterling-menu-item-separator"
  role="separator"
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
  on:wheel
  {...$$restProps}
/>

<style>
  .sterling-menu-item-separator {
    height: var(--stsv-common__border-width);
    background-color: var(--stsv-common__border-color);
    margin: 0.1em 0;
  }
</style>
