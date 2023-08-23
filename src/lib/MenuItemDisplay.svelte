<script lang="ts">
  import type { MenuItemRole } from './MenuItem.types';

  export let checked = false;
  export let disabled = false;
  export let hasChildren = false;
  export let isMenuBarItem = false;
  export let menuItemRole: MenuItemRole = 'menuitem';
</script>

<div class="sterling-menu-item-display" class:disabled>
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
    <div class="chevron" class:has-children={!isMenuBarItem && hasChildren} />
  {/if}
</div>

<style>
</style>
