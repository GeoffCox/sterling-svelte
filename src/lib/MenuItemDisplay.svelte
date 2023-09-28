<script lang="ts">
  import type { MenuItemRole } from './MenuItem.types';

  /** When true, displays the menu item as checked. */
  export let checked = false;

  /** When true, displays the menu item as disabled. */
  export let disabled = false;

  /** When true, displays the menu item as a parent of children. */
  export let hasChildren = false;

  /** When true, displays the menu as a top level menu bar item. */
  export let isMenuBarItem = false;

  /** The role of the menu item */
  export let menuItemRole: MenuItemRole = 'menuitem';

  /** Additional class names to apply. */
  export let variant: string = '';
</script>

<div class={`sterling-menu-item-display ${variant}`} class:disabled>
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
