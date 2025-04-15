import { makeExtendsComment } from './commonDoc';
import type { ComponentDoc } from './types';
import MenuItemPlayground from '../../_playgrounds/menuitem/MenuItemPlayground.svelte';

export const menuItemDoc: ComponentDoc = {
  name: 'MenuItem',
  description: 'An item within a menu.',
  comments: [makeExtendsComment('HTMLButtonElement')],
  props: [
    {
      name: 'checked',
      type: 'boolean | null | undefined',
      default: 'false',
      comment:
        'When true, the menu item is checked. Displayed only when role is set to menuitemcheckbox or menuitemradio.'
    },
    {
      name: 'item',
      type: 'Snippet | undefined',
      default: 'undefined',
      comment:
        'When undefined, a default item is rendered with a chevron, checkmark, text, and shortcut.'
    },
    {
      name: 'menuClass',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'A class applied to any child menu.'
    },
    {
      name: 'onClose',
      type: '(value: string) => void',
      default: 'undefined',
      comment: 'Called when the menu item is closed.'
    },
    {
      name: 'onOpen',
      type: '(value: string) => void',
      default: 'undefined',
      comment: 'Called when the menu item is opened.'
    },
    {
      name: 'onSelect',
      type: '(value: string) => void',
      default: 'undefined',
      comment: 'Called when the menu item is selected.'
    },
    {
      name: 'role',
      type: 'MenuItemRole | undefined',
      default: "'menuitem'",
      comment: 'The role of the menu item. Allows regular, checkbox, or radio menu items.'
    },
    {
      name: 'shortcut',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The shortcut key sequence associated with the menu item. Not used if item is set.'
    },
    {
      name: 'text',
      type: 'string | undefined',
      default: 'undefined',
      comment: 'The text of the menu item. Not used if item is set.'
    },
    {
      name: 'value',
      type: 'string',
      comment: 'Uniquely identifies the menu item within the menu hierarchy.'
    }
  ],
  types: [
    {
      name: 'MenuItemRole',
      definition: "'menuitem' | 'menuitemcheckbox' | 'menuitemradio'"
    }
  ],
  anatomy: `<button class="sterling-menu-item">
  <div class="item">
    {#if item}
      {@render item()}
    {:else}
      <div class="sterling-menu-item-display">
        <div class="check"></div>
        <div class="content"></div>
        <div class="shortcut"></div>
        <div class="chevron"></div>
      </div>
    {/if}
  </div>
  <Popover>
    <Menu>
      {@render menu()}
    </Menu>
  </Popover>
</button>`,
  usage: MenuItemPlayground
};
