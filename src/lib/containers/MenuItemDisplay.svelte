<script lang="ts">
  export let checked = false;
  export let hasChildren = false;
  export let menuItemRole: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' = 'menuitem';
</script>

<div class="menu-item-display">
  <div
    class="check"
    class:checkmark={menuItemRole === 'menuitemcheckbox'}
    class:bullet={menuItemRole === 'menuitemradio'}
    class:checked
  />
  <div class="content">
    <slot />
  </div>
  {#if $$slots.shortcut}
    <div class="shortcut">
      <slot name="shortcut" />
    </div>
  {:else}
    <div class="chevron" class:has-children={hasChildren} />
  {/if}
</div>

<style>
  .menu-item-display {
    align-items: center;
    justify-items: flex-start;
    display: grid;
    grid-template-columns: 1em 1fr 1em;
    column-gap: 0.5em;
    padding: 0.5em;
  }

  .check {
    box-sizing: border-box;
    pointer-events: none;
    width: 20px;
    height: 20px;
    position: relative;
    transition: background-color 250ms, color 250ms, border-color 250ms;
  }

  .check.checkmark.checked::after {
    border-color: currentColor;
    border-style: solid;
    border-width: 0 0.2em 0.2em 0;
    box-sizing: border-box;
    content: '';
    height: 0.8em;
    left: 45%;
    position: absolute;
    top: 45%;
    transform: translate(-50%, -50%) rotate(45deg);
    transform-origin: center;
    transition: border-color 250ms;
    width: 0.4em;
  }

  .check.bullet.checked::after {
    background-color: currentColor;
    border-radius: 10000px;
    content: '';
    height: 0.5em;
    left: 45%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: background-color 250ms;
    width: 0.5em;
  }

  .content {
    padding-top: 0.25em;
  }

  .chevron {
    position: relative;
    border: none;
    background: none;
    height: 1em;
    width: 1em;
    transform-origin: 50% 50%;
  }

  .chevron.has-children::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    width: 7px;
    height: 7px;
    border-right: 3px solid currentColor;
    border-top: 3px solid currentColor;
    transform: translate(-50%, -50%) rotate(45deg);
  }
</style>
