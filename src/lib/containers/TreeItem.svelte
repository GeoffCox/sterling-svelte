<script lang="ts">
  export let disabled = false;
  export let expanded = false;
  export let selected = false;
</script>

<div
  class="sterling-tree-item"
  class:disabled
  class:expanded
  class:selected
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
  {...$$restProps}
>
  <div class="chevron" />
  <slot />
</div>

<style>
  .sterling-tree-item {
    align-content: center;
    align-items: center;
    background-color: transparent;
    box-sizing: border-box;
    color: var(--Input__color);
    display: grid;
    grid-template-columns: auto 1fr;
    margin: 0;
    outline: none;
    padding: 0.5em;
    text-overflow: ellipsis;
    transition: background-color 250ms, color 250ms, border-color 250ms;
    white-space: nowrap;
  }

  .sterling-tree-item:hover {
    background-color: var(--Button__background-color--hover);
    color: var(--Button__color--hover);
  }

  .sterling-tree-item.selected {
    background-color: var(--Input__background-color--selected);
    color: var(--Input__color--selected);
  }

  .sterling-tree-item.disabled {
    color: var(--Input__color--disabled);
  }

  .chevron {
    display: block;
    position: relative;
    border: none;
    background: none;
    margin: 0 0.5em 0 0;
    height: 100%;
    width: 1em;
    transform-origin: 50% 50%;
  }

  @keyframes rotate-expand {
    from {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    to {
      transform: translate(-50%, -60%) rotate(135deg);
    }
  }

  @keyframes rotate-collapse {
    from {
      transform: translate(-50%, -60%) rotate(135deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  .chevron::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    width: 7px;
    height: 7px;
    border-right: 3px solid currentColor;
    border-top: 3px solid currentColor;
    /* 
			The chevron is a right triangle, rotated to face down.
			It should be moved up so it is centered vertically after rotation.
			The amount to move is the hypotenuse of the right triangle of the chevron.
		    For a right triangle with equal a and b where c=1
			a^2 + b^2 = c^2 	
		    a^2 + a^2 = c^2 
		    2a^2 = c^2
			2a^2 = 1
			a^2 = 0.5
			a = sqrt(0.5)
			a = 0.707
		*/
    transform: translate(-50%, -50%) rotate(45deg);
    animation-name: rotate-collapse;
    animation-duration: 100ms;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .sterling-tree-item.expanded .chevron::after {
    animation-name: rotate-expand;
    animation-duration: 100ms;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  @media (prefers-reduced-motion) {
    .sterling-tree-item {
      transition: none;
    }

    .chevron::after {
      animation: none;
    }

    .sterling-tree-item.expanded .chevron::after {
      transform: translate(-50%, calc(-50% / 0.707)) rotate(135deg);
      animation: none;
    }
  }
</style>
