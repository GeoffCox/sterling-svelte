import { makeExtendsComment, commonProps } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuItemDisplayPlayground from '../../_playgrounds/menuitemdisplay/MenuItemDisplayPlayground.svelte';

export const menuItemDisplayDoc: ComponentDoc = {
  name: 'MenuItemDisplay',
  description: 'The default content for a <MenuItem>',
  comments: [makeExtendsComment('HTMLDivElement')],
  props: [
    {
      name: 'checked',
      type: 'boolean',
      default: 'false',
      comment: 'When true, displays the menu item as checked.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      comment: 'When true, displays the menu item as disabled.'
    },
    {
      name: 'hasChildren',
      type: 'boolean',
      default: 'false',
      comment: 'When true, displays the menu item as a parent of children.'
    },
    {
      name: 'isMenuBarItem',
      type: 'boolean',
      default: 'false',
      comment: 'When true, displays the menu as a top level menu bar item.'
    },
    {
      name: 'menuItemRole',
      type: 'MenuItemRole',
      default: "'menuitem'",
      comment: 'The role of the menu item.'
    },
    commonProps.variant
  ],
  anatomy: `<div class="sterling-menu-item-display">
  <div class="check" />
  <div class="content">
    <slot {checked} {disabled} {hasChildren} {isMenuBarItem} {menuItemRole} {variant} />
  </div>
  <div class="shortcut">
    <slot name="shortcut" {checked} {disabled} {isMenuBarItem} {menuItemRole} {variant} />
  </div>
  <div class="chevron" />
</div>`,
  usage: MenuItemDisplayPlayground
};
